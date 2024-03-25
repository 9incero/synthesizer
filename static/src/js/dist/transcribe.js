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

eval("let visualizer;\r\nlet recorder;\r\nlet isRecording = false;\r\nlet recordingBroken = false;\r\nconst PLAYERS = {};\r\n\r\nconst model = initModel();\r\nlet player = initPlayers();\r\n\r\n// // 오디오 녹음\r\n// btnRecord.addEventListener('click', () => {\r\n//   // Things are broken on old ios\r\n//   if (!navigator.mediaDevices) {\r\n//     recordingBroken = true;\r\n//     recordingError.hidden = false;\r\n//     btnRecord.disabled = true;\r\n//     return;\r\n//   }\r\n  \r\n//   if (isRecording) {\r\n//     isRecording = false;\r\n//     updateRecordBtn(true);\r\n//     recorder.stop();\r\n//   } else {\r\n//     // Request permissions to record audio. Also this sometimes fails on Linux. I don't know.\r\n//     navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {\r\n//       isRecording = true;\r\n//       updateRecordBtn(false);\r\n//       hideVisualizer();\r\n\r\n//       recorder = new window.MediaRecorder(stream);\r\n//        recorder.addEventListener('dataavailable', (e) => {\r\n//          updateWorkingState(btnRecord, btnUpload);\r\n//          requestAnimationFrame(() => requestAnimationFrame(() => transcribeFromFile(e.data)));\r\n//       });\r\n//       recorder.start();\r\n//     }, () => {\r\n//       recordingBroken = true;\r\n//       recordingError.hidden = false;\r\n//       btnRecord.disabled = true;\r\n//     });\r\n//   }\r\n// });\r\n\r\n// // 여기서부터!!!!!!!!\r\n// document.addEventListener('DOMContentLoaded', (event) => {\r\n//   fetch('/get_wav_data')\r\n//       .then(response => {\r\n//           if (!response.ok) {\r\n//               throw new Error(`HTTP error! Status: ${response.status}`);\r\n//           }\r\n//           return response.blob(); // WAV 데이터를 Blob으로 받음\r\n//         })\r\n//       .then(data => {\r\n//           // 여기서 data를 MIDI로 변환하는 작업을 수행할 수 있음\r\n//           // 예를 들어, data를 MIDI로 변환하는 라이브러리를 사용하거나,\r\n//           // 직접 WAV 데이터를 MIDI로 변환하는 코드를 작성할 수 있음\r\n//           console.log('WAV 파일 데이터:', data);\r\n//           // 여기에 MIDI로 변환하는 코드를 작성\r\n\r\n//             transcribeFromFile(data);\r\n\r\n          \r\n//       })\r\n//       .catch(error => {\r\n//           console.error('Error:', error);\r\n//       });\r\n// });\r\n\r\n// document.addEventListener('DOMContentLoaded', async (event) => {\r\n//   try {\r\n//     // initModel 함수가 완료될 때까지 기다림\r\n//     const model = await initModel();\r\n    \r\n//     // WAV 데이터를 가져오기 위한 fetch 요청\r\n//     const response = await fetch('/get_wav_data');\r\n//     if (!response.ok) {\r\n//       throw new Error(`HTTP error! Status: ${response.status}`);\r\n//     }\r\n\r\n//     // WAV 데이터를 Blob으로 받음\r\n//     const data = await response.blob();\r\n//     console.log('WAV 파일 데이터:', data);\r\n\r\n//     // WAV 데이터를 MIDI로 변환하는 작업 수행\r\n//     transcribeFromFile(data);\r\n//   } catch (error) {\r\n//     console.error('Error:', error);\r\n//   }\r\n// });\r\n\r\n// 파일업로드 변화\r\nfileInput.addEventListener('change', (e) => {\r\n//   recordingError.hidden = true;\r\n//   updateWorkingState(btnUpload, btnRecord);\r\n  requestAnimationFrame(() => requestAnimationFrame(() => {\r\n    transcribeFromFile(e.target.files[0]);\r\n    fileInput.value = null;\r\n  }));\r\n  \r\n  return false;\r\n});\r\n\r\n// 시작 정지\r\n// container.addEventListener('click', () => {\r\n//   if (player.isPlaying()) {\r\n//     stopPlayer();\r\n//   } else {\r\n//     startPlayer();\r\n//   }\r\n// });\r\n\r\n\r\nasync function transcribeFromFile(blob) {\r\n  hideVisualizer();\r\n//   audio to midi\r\n  model.transcribeFromAudioFile(blob).then((ns) => {\r\n    PLAYERS.soundfont.loadSamples(ns).then(() => {\r\n    // 시각화\r\n      visualizer = new mm.Visualizer(ns, canvas, {\r\n          noteRGB: '255, 255, 255', \r\n          activeNoteRGB: '232, 69, 164', \r\n          pixelsPerTimeStep: window.innerWidth < 500 ? null: 80,\r\n      });\r\n      resetUIState();\r\n      showVisualizer();\r\n    });\r\n  });\r\n}\r\n\r\n// 음악플레이어 제어\r\nfunction setActivePlayer(event, isSynthPlayer) {\r\n  document.querySelector('button.player.active').classList.remove('active');\r\n  event.target.classList.add('active');\r\n  stopPlayer();\r\n  player = isSynthPlayer ? PLAYERS.synth : PLAYERS.soundfont;\r\n  startPlayer();\r\n}\r\n\r\nfunction stopPlayer() {\r\n  player.stop();\r\n  container.classList.remove('playing');\r\n}\r\n\r\nfunction startPlayer() {\r\n  container.scrollLeft = 0;\r\n  container.classList.add('playing');\r\n  mm.Player.tone.context.resume();\r\n  player.start(visualizer.noteSequence);\r\n}\r\n\r\n// // 작업상태 변경 -> help를 통해서\r\n// function updateWorkingState(active, inactive) {\r\n// //   help.hidden = true;\r\n//   transcribingMessage.hidden = false;\r\n//   active.classList.add('working');\r\n//   inactive.setAttribute('disabled', true);\r\n// }\r\n\r\n// 녹음부분 업데이트\r\n// function updateRecordBtn(defaultState) {\r\n//   const el = btnRecord.firstElementChild;\r\n//   el.textContent = defaultState ? 'Record audio' : 'Stop'; \r\n// }\r\n\r\n// ui상태 초기화\r\nfunction resetUIState() {\r\n  btnUpload.classList.remove('working');\r\n  btnUpload.removeAttribute('disabled');\r\n//   btnRecord.classList.remove('working');\r\n//   if (!recordingBroken) {\r\n//     btnRecord.removeAttribute('disabled');\r\n//   }\r\n}\r\n\r\nfunction hideVisualizer() {\r\n  players.hidden = true;\r\n  saveBtn.hidden = true;\r\n  container.hidden = true;\r\n}\r\n\r\nfunction showVisualizer() {\r\n  container.hidden = false;\r\n  saveBtn.hidden = false;\r\n  players.hidden = false;\r\n//   transcribingMessage.hidden = true;\r\n//   help.hidden = true;\r\n}\r\n\r\n// 시퀀스데이터 -> midi data\r\nfunction saveMidi(event) {\r\n  event.stopImmediatePropagation();\r\n  k=new File([mm.sequenceProtoToMidi(visualizer.noteSequence)], 'generate.mid')\r\n  console.log(k)\r\n  const formData = new FormData();\r\n  formData.append('midiFile', k);\r\n  \r\n  fetch('/upload', {\r\n    method: 'POST',\r\n    body: formData\r\n  })\r\n  .then(response => {\r\n    // 여기에서 응답 처리\r\n    if (!response.ok) {\r\n      throw new Error('Network response was not ok');\r\n    }\r\n    // 정상적인 응답인 경우 다음 작업 수행\r\n    window.location.href = \"/phase1\";\r\n  })\r\n  .catch(error => {\r\n    // 오류 처리\r\n    console.error('Fetch error:', error);\r\n  });\r\n  \r\n\r\n  // saveAs(new File([mm.sequenceProtoToMidi(visualizer.noteSequence)], 'generate.mid'));\r\n}\r\n\r\nfunction initPlayers() {\r\n  PLAYERS.synth = new mm.Player(false, {\r\n    run: (note) => {\r\n      // 음표 시각화\r\n      const currentNotePosition = visualizer.redraw(note); \r\n\r\n      // See if we need to scroll the container.\r\n      const containerWidth = container.getBoundingClientRect().width;\r\n      if (currentNotePosition > (container.scrollLeft + containerWidth)) {\r\n        container.scrollLeft = currentNotePosition - 20;\r\n      }\r\n    },\r\n    stop: () => {container.classList.remove('playing')}\r\n  });\r\n\r\n  PLAYERS.soundfont = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/salamander');\r\n  // TODO: fix this after magenta 1.1.15\r\n  PLAYERS.soundfont.callbackObject = {\r\n    run: (note) => {\r\n      const currentNotePosition = visualizer.redraw(note);\r\n\r\n      // See if we need to scroll the container.\r\n      const containerWidth = container.getBoundingClientRect().width;\r\n      if (currentNotePosition > (container.scrollLeft + containerWidth)) {\r\n        container.scrollLeft = currentNotePosition - 20;\r\n      }\r\n    },\r\n    stop: () => {container.classList.remove('playing')}\r\n  };\r\n  return PLAYERS.soundfont;\r\n}\r\n\r\n// 모델초기화\r\nfunction initModel() {\r\n  const model = new mm.OnsetsAndFrames('https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni');\r\n  \r\n  model.initialize().then(() => {\r\n    resetUIState();\r\n    modelLoading.hidden = true;\r\n    modelReady.hidden = false;\r\n  });\r\n  \r\n  // Things are slow on Safari.\r\n  if (window.webkitOfflineAudioContext) {\r\n    safariWarning.hidden = false;\r\n  }\r\n  \r\n  // Things are very broken on ios12.\r\n  if (navigator.userAgent.indexOf('iPhone OS 12_0') >= 0) {\r\n    iosError.hidden = false;\r\n    buttons.hidden = true;\r\n  }\r\n  return model;\r\n}\n\n//# sourceURL=webpack://Synthesizer/./src/js/transcribe.js?");

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