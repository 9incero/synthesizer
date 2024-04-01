let visualizer;
let recorder;
let isRecording = false;
let recordingBroken = false;
const PLAYERS = {};

const model = initModel();
let player = initPlayers();

// mp3파일 불러오기
document.getElementById("mp3_input").addEventListener("click", function () {
  fetch("/get_mp3_data")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.blob();
    })
    .then((data) => {
      if (data.error) {
        console.error("Error:", data.error);
      } else {
        console.log(data);
        transcribeFromFile(data);
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
});

// mp3 to midi
async function transcribeFromFile(blob) {
  try {
    const ns = await model.transcribeFromAudioFile(blob);
    await PLAYERS.soundfont.loadSamples(ns);
    visualizer = new mm.Visualizer(ns, canvas, {
      noteRGB: "255, 255, 255",
      activeNoteRGB: "232, 69, 164",
      pixelsPerTimeStep: window.innerWidth < 500 ? null : 80,
    });
    saveMidi(new Event("click"));
  } catch (error) {
    console.error("Error transcribing from file:", error);
  }
}

// midi file 저장
function saveMidi(event) {
  event.stopImmediatePropagation();
  k = new File(
    [mm.sequenceProtoToMidi(visualizer.noteSequence)],
    "generate.mid"
  );
  console.log(k);
  const formData = new FormData();
  formData.append("midiFile", k);

  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      window.location.href = "/phase1";
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

// 초기화
function initPlayers() {
  PLAYERS.synth = new mm.Player(false, {});

  PLAYERS.soundfont = new mm.SoundFontPlayer(
    "https://storage.googleapis.com/magentadata/js/soundfonts/salamander"
  );

  return PLAYERS.soundfont;
}

function initModel() {
  const model = new mm.OnsetsAndFrames(
    "https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni"
  );

  model.initialize().then(() => {
    modelLoading.hidden = true;
    modelReady.hidden = false;
  });

  // Things are slow on Safari.
  if (window.webkitOfflineAudioContext) {
    safariWarning.hidden = false;
  }

  // Things are very broken on ios12.
  if (navigator.userAgent.indexOf("iPhone OS 12_0") >= 0) {
    iosError.hidden = false;
    buttons.hidden = true;
  }
  return model;
}

function loadFile(input) {
  let file = input.files[0]; // 선택파일 가져오기

  let newImage = document.createElement("img"); //새 이미지 태그 생성

  //이미지 source 가져오기
  newImage.src = URL.createObjectURL(file);
  newImage.style.width = "100%"; //div에 꽉차게 넣으려고
  newImage.style.height = "100%";
  newImage.style.objectFit = "cover"; // div에 넘치지 않고 들어가게

  //이미지를 image-show div에 추가
  let container = document.getElementById("image-show");
  container.innerHTML = ""; // 기존 내용 삭제
  container.appendChild(newImage);
}
