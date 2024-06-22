import gradio as gr


# 챗봇에 채팅이 입력되면 이 함수를 호출합니다. 
# message는 유저의 채팅 메시지, history는 채팅 기록, additional_input_info는 additional_inputs안 블록의 정보를 받습니다.
def response(message, history):
    # additional_input_info의 텍스트를 챗봇의 대답 뒤에 추가합니다.
    return "챗봇을 미완성하였습니다 "
custom_css = """
.container {
    width: 10%;
    max-width: 1000px;
    margin: auto;
}
"""
gr.ChatInterface(
        fn=response,
        textbox=gr.Textbox(placeholder="원하는 음악을 설명해주세요", container=False, scale=7),
        title="chat-music",
        description="챗봇을 통해 원하는 음악을 만들어보세요.",
        theme="soft",
        examples=[["재즈풍의 노래를 만들어줘"], ["빠른 비트의 신나는 케이팝 음악을 만들어줘"],['ss']],
        retry_btn="retry",
        undo_btn="undo",
        clear_btn="clear",
additional_inputs=[
            
        ],
        css=custom_css,
).launch(height=1000, width=8)
