from flask import Flask, render_template, request, send_file, redirect,jsonify, url_for,session
import os
import base64
import replicate
import deepl
import requests 
import json
from gradio_client import Client
import re
import torch
from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer


with open('./apiKey.json') as f:
    secrets = json.loads(f.read())

os.environ["REPLICATE_API_TOKEN"]=secrets["REPLICATE_API_TOKEN"]
auth_key=secrets["DEEPL_API_TOKEN"]
# hugging_key=secrets['HUGGING_API_TOKEN']

app = Flask(__name__)
app.secret_key = 'dvsdsfsdfvvdseg'  # 세션 암호화를 위한 키 



@app.route('/', methods=['GET', 'POST'])
def login(): 
    return render_template('login.html')



@app.route('/phase1', methods=['POST', 'GET'])
def shape():
    if request.method == "POST":
        username = request.form.get('username')
        print('유저 이름', username)  # Debug print
        return render_template('shape.html', username=username)
    return render_template('shape.html')



@app.route('/phase2', methods=['POST', 'GET'])
def shapetwo():
    if request.method == "POST":
        username = request.form.get('username')
        print('유저 이름', username)  # Debug print

        return render_template('shape_two.html', username=username)



@app.route('/generate', methods=['POST', 'GET'])
def generate():
    if request.method == "POST":
        instrument = request.form.get('instrument')
        genre = request.form.get('genre')
        tonality = request.form.get('tonality')
        tempo = request.form.get('tempo')
        duration = int(request.form.get('duration'))
        title = request.form.get('title')
        music_description = request.form.get('music_description')
        # print('음악 설명', music_description)  # Debug print
        
        # #image to caption
        # file = request.files['image']
    
        # if file.filename == '':
        #     return 'No selected file'
        

        # upload_folder = './static/src/input/'   # 업로드 폴더 경로 설정
        # file.save(os.path.join(upload_folder, file.filename))

        # img=upload_folder+file.filename

        # kosmos2_client = Client("https://ydshieh-kosmos-2.hf.space/")
        # kosmos2_result = kosmos2_client.predict(
        #     img,	
        #     "Detailed",
        #     fn_index=4
        # )

        # with open(kosmos2_result[1], 'r') as f:
        #     data = json.load(f)
        
        # reconstructed_sentence = []
        # for sublist in data:
        #     reconstructed_sentence.append(sublist[0])

        # full_sentence = ' '.join(reconstructed_sentence)
        # #print(full_sentence)

        # pattern = r'^Describe this image in detail:\s*(.*)$'
        # match = re.search(pattern, full_sentence)
        # if match:
        #     description = match.group(1)
        #     print(description)
        # else:
        #     print("Unable to locate valid description.")

        #caption to LLM

        
        #번역
        translator = deepl.Translator(auth_key)
        trans=translator.translate_text(music_description, target_lang="EN-US")
        if trans.detected_source_lang == 'KO':
            music_description = trans.text

        if tonality=='major':
            tonality='major key music piece with a bright and positive feel'
        elif tonality=='minor':
            tonality='minor key music piece with a somber and melancholic atmosphere'
        
        if tempo=='Allegro': 
            tempo='Allegro speed at about 120-168BPM'
        elif tempo=='Andante':
            tempo='Andante speed at about 80-108BPM'
        elif tempo=='Adagio':
            tempo='Adagio speed at about 44-55BPM'


        
        #print("prompt",music_description+', solo '+instrument+' recording, '+genre+', '+tonality+', '+tempo)
        print("prompt", 'music description:'+ music_description+', instrument: solo '+instrument+', music genre: '+genre
              +', music atmosphere: '+tonality+', music tempo: '+tempo)

        # ~api에서 받아오기~
        output = replicate.run("meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38",
        input={
            "model_version": "melody-large",
            #"prompt":music_description+', solo '+instrument+' recording'+', genre is '+genre+', '+tonality+', '+tempo,
            "prompt": 'music description:'+ music_description+', instrument: solo '+instrument+', music genre: '+genre+', music atmosphere: '+tonality+', music tempo: '+tempo,
            "output_format": "mp3",
            # #input_audio는 웹uri형식만
            # "input_audio":'https://file.notion.so/f/f/e0a10e20-9745-4b98-87b5-ae4991a9b690/02d9d877-595c-4835-b557-fdd2c1fe9bc5/fast.wav?id=7dc740e1-5d09-4d21-8374-71188d1ce802&table=block&spaceId=e0a10e20-9745-4b98-87b5-ae4991a9b690&expirationTimestamp=1709272800000&signature=Y8_BR9y8a25-u3ZaWWT_TVMEt7K8DI1Bdt99odlqeoc&downloadName=fast.wav',
            # #true 사용 불가
            # "continuation":False,
            "duration":duration,
            


            }
        )
        print(output)

        #mp3 file save
        mp3_url = output
        filename = title+'.mp3'

        response = requests.get(mp3_url, stream=True)
        
        if response.status_code == 200:
            temp_filepath = './static/src/input/' + filename
            with open(temp_filepath, 'wb') as file:
                for chunk in response.iter_content(chunk_size=1024):
                    file.write(chunk)

            mimetype = 'audio/mpeg'

            send_file(
                temp_filepath,
                as_attachment=True,
                download_name=filename,
                mimetype=mimetype
            )

            print(temp_filepath,' 저장 완료')
            session['mp3_file'] = temp_filepath
        return render_template('generate.html', instrument=instrument, genre=genre, tonality=tonality, tempo=tempo, duration=duration, title=title, music_description=music_description, temp_filepath=temp_filepath)

    return render_template('generate.html')

@app.route('/get_mp3_data', methods=['GET'])
def get_mp3_data():
    mp3_file_path = session.get('mp3_file', None)
    print(mp3_file_path)
    return send_file(mp3_file_path, as_attachment=True)


@app.route('/upload', methods=['POST'])
def upload():
    if 'midiFile' not in request.files:
        return 'No MIDI file provided!', 400

    midi_file = request.files['midiFile']

    if midi_file.filename == '':
        return 'No selected file!', 400

    if midi_file:
        # 파일을 저장하거나 처리하는 작업 수행
        midi_file.save('./static/src/input/generate.mid')
        
        # 세션에 파일 정보 저장
        session['midi_file'] = './static/src/input/generate.mid'
        print(session['midi_file'],'dd')
        midi_file_path = session.get('midi_file', '')
        print(midi_file_path)
        # shape 엔드포인트로 리다이렉션
        return midi_file_path

@app.route('/get_midi_data')
# def get_midi_data():
#     # 세션에서 파일 정보 가져오기
#     midi_file_path = session.get('midi_file', None)
#     print(midi_file_path)
#     if midi_file_path:
#         try:
#             with open(midi_file_path, 'rb') as midi_file:
#                 # MIDI 파일 내용 읽기
#                 midi_content = midi_file.read()

#                 # 바이너리 데이터를 base64로 인코딩하여 전달
#                 midi_content_base64 = base64.b64encode(midi_content).decode('utf-8')
#                 return jsonify({'midi_content': midi_content_base64})
#         except Exception as e:
#             print('Error opening MIDI file:', e)
#             return jsonify({'error': 'Error opening MIDI file'})
#     else:
#         return jsonify({'error': 'MIDI file not found'}), 404
@app.route('/get_midi_data')
def get_midi_data():
    # 세션에서 파일 정보 가져오기
    midi_file_path = session.get('midi_file', None)
    print(midi_file_path)
    if midi_file_path:
        try:
            return send_file(midi_file_path, as_attachment=True)
        except Exception as e:
            print('Error opening MIDI file:', e)
            return jsonify({'error': 'Error opening MIDI file'})
    else:
        return jsonify({'error': 'MIDI file not found'}), 404


if __name__ == '__main__':
  app.run(host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('PORT', 2000)), debug=True, use_reloader=False)