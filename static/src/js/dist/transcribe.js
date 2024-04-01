/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/transcribe.js":
/*!******************************!*\
  !*** ./src/js/transcribe.js ***!
  \******************************/
/***/ (() => {

eval("let visualizer;\r\nlet recorder;\r\nlet isRecording = false;\r\nlet recordingBroken = false;\r\nconst PLAYERS = {};\r\n\r\nconst model = initModel();\r\nlet player = initPlayers();\r\n\r\n// mp3파일 불러오기\r\ndocument.getElementById(\"mp3_input\").addEventListener(\"click\", function () {\r\n  fetch(\"/get_mp3_data\")\r\n    .then((response) => {\r\n      if (!response.ok) {\r\n        throw new Error(`HTTP error! Status: ${response.status}`);\r\n      }\r\n      return response.blob();\r\n    })\r\n    .then((data) => {\r\n      if (data.error) {\r\n        console.error(\"Error:\", data.error);\r\n      } else {\r\n        console.log(data);\r\n        transcribeFromFile(data);\r\n      }\r\n    })\r\n    .catch((error) => {\r\n      console.error(\"Fetch error:\", error);\r\n    });\r\n});\r\n\r\n// mp3 to midi\r\nasync function transcribeFromFile(blob) {\r\n  try {\r\n    const ns = await model.transcribeFromAudioFile(blob);\r\n    await PLAYERS.soundfont.loadSamples(ns);\r\n    visualizer = new mm.Visualizer(ns, canvas, {\r\n      noteRGB: \"255, 255, 255\",\r\n      activeNoteRGB: \"232, 69, 164\",\r\n      pixelsPerTimeStep: window.innerWidth < 500 ? null : 80,\r\n    });\r\n    saveMidi(new Event(\"click\"));\r\n  } catch (error) {\r\n    console.error(\"Error transcribing from file:\", error);\r\n  }\r\n}\r\n\r\n// midi file 저장\r\nfunction saveMidi(event) {\r\n  event.stopImmediatePropagation();\r\n  k = new File(\r\n    [mm.sequenceProtoToMidi(visualizer.noteSequence)],\r\n    \"generate.mid\"\r\n  );\r\n  console.log(k);\r\n  const formData = new FormData();\r\n  formData.append(\"midiFile\", k);\r\n\r\n  fetch(\"/upload\", {\r\n    method: \"POST\",\r\n    body: formData,\r\n  })\r\n    .then((response) => {\r\n      if (!response.ok) {\r\n        throw new Error(\"Network response was not ok\");\r\n      }\r\n      window.location.href = \"/phase1\";\r\n    })\r\n    .catch((error) => {\r\n      console.error(\"Fetch error:\", error);\r\n    });\r\n}\r\n\r\n// 초기화\r\nfunction initPlayers() {\r\n  PLAYERS.synth = new mm.Player(false, {});\r\n\r\n  PLAYERS.soundfont = new mm.SoundFontPlayer(\r\n    \"https://storage.googleapis.com/magentadata/js/soundfonts/salamander\"\r\n  );\r\n\r\n  return PLAYERS.soundfont;\r\n}\r\n\r\nfunction initModel() {\r\n  const model = new mm.OnsetsAndFrames(\r\n    \"https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni\"\r\n  );\r\n\r\n  model.initialize().then(() => {\r\n    modelLoading.hidden = true;\r\n    modelReady.hidden = false;\r\n  });\r\n\r\n  // Things are slow on Safari.\r\n  if (window.webkitOfflineAudioContext) {\r\n    safariWarning.hidden = false;\r\n  }\r\n\r\n  // Things are very broken on ios12.\r\n  if (navigator.userAgent.indexOf(\"iPhone OS 12_0\") >= 0) {\r\n    iosError.hidden = false;\r\n    buttons.hidden = true;\r\n  }\r\n  return model;\r\n}\r\n\r\nfunction loadFile(input) {\r\n  let file = input.files[0]; // 선택파일 가져오기\r\n\r\n  let newImage = document.createElement(\"img\"); //새 이미지 태그 생성\r\n\r\n  //이미지 source 가져오기\r\n  newImage.src = URL.createObjectURL(file);\r\n  newImage.style.width = \"100%\"; //div에 꽉차게 넣으려고\r\n  newImage.style.height = \"100%\";\r\n  newImage.style.objectFit = \"cover\"; // div에 넘치지 않고 들어가게\r\n\r\n  //이미지를 image-show div에 추가\r\n  let container = document.getElementById(\"image-show\");\r\n  container.innerHTML = \"\"; // 기존 내용 삭제\r\n  container.appendChild(newImage);\r\n}\r\n\n\n//# sourceURL=webpack://Synthesizer/./src/js/transcribe.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/transcribe.js"]();
/******/ 	
/******/ })()
;