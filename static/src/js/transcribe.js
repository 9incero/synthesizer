let visualizer;
let recorder;
let isRecording = false;
let recordingBroken = false;
const PLAYERS = {};

const model = initModel();
let player = initPlayers();

// wav파일 불러오기
document.getElementById("wav_input").addEventListener("click", function () {
  console.log("wav");
  fetch("/get_wav_data")
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

// wav to midi
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
