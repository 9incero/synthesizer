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

/***/ "./src/js/ui.js":
/*!**********************!*\
  !*** ./src/js/ui.js ***!
  \**********************/
/***/ (() => {

eval("// 보여지는 메뉴\r\nconst themaGroup = document.getElementsByClassName('themaButton')\r\n\r\n\r\n\r\nlet blurButton = document.getElementById('thema_blur')\r\nlet fogButton = document.getElementById('thema_fog')\r\n\r\nlet haloButton = document.getElementById('thema_halo')\r\n\r\nlet cloudButton = document.getElementById('thema_clouds')\r\nlet cellsButton = document.getElementById('thema_cells')\r\nlet noneButton = document.getElementById('thema_none')\r\n\r\nlet clickList = []\r\n\r\n\r\n// 색상 저장 버튼\r\nconst bgColorSaveButton = document.getElementById('backgroundColorSaveButton');\r\nconst objColor1SaveButton = document.getElementById('objectColor1SaveButton');\r\n\r\n\r\n// assisitve menu (save)\r\nlet speedDIV = document.getElementById('speedDIV')\r\nlet zoomDIV = document.getElementById('zoomDIV')\r\nlet sizeDIV = document.getElementById('sizeDIV')\r\nlet velocityDIV = document.getElementById('velocityDIV')\r\nlet objColor1DIV = document.getElementById('objColor1DIV')\r\n\r\n\r\n\r\n// functions start!\r\n\r\nblurButton.addEventListener('click', function(){\r\n    speedDIV.style.display = 'block'\r\n    zoomDIV.style.display = 'block'\r\n    sizeDIV.style.display = 'none'\r\n    velocityDIV.style.display = 'none'\r\n    objColor1DIV.style.display = 'block'\r\n});\r\n\r\n\r\n\r\nfogButton.addEventListener('click', function(){\r\n    speedDIV.style.display = 'block'\r\n    zoomDIV.style.display = 'block'\r\n    sizeDIV.style.display = 'none'\r\n    velocityDIV.style.display = 'none'\r\n    objColor1DIV.style.display = 'block'\r\n});\r\n\r\n\r\nhaloButton.addEventListener('click', function(){\r\n    speedDIV.style.display = 'none'\r\n    zoomDIV.style.display = 'none'\r\n    sizeDIV.style.display = 'block'\r\n    velocityDIV.style.display = 'none'\r\n    objColor1DIV.style.display = 'block'\r\n})\r\n\r\n\r\ncellsButton.addEventListener('click', function(){\r\n    speedDIV.style.display = 'none'\r\n    zoomDIV.style.display = 'none'\r\n    sizeDIV.style.display = 'none'\r\n    velocityDIV.style.display = 'block'\r\n    objColor1DIV.style.display = 'block'\r\n})\r\n\r\n\r\ncloudButton.addEventListener('click', function(){\r\n    speedDIV.style.display = 'none'\r\n    zoomDIV.style.display = 'none'\r\n    sizeDIV.style.display = 'none'\r\n    velocityDIV.style.display = 'block'\r\n    objColor1DIV.style.display = 'block'\r\n})\r\n\r\n\r\nnoneButton.addEventListener('click', function(){\r\n    speedDIV.style.display = 'none'\r\n    zoomDIV.style.display = 'none'\r\n    sizeDIV.style.display = 'none'\r\n    velocityDIV.style.display = 'none'\r\n    objColor1DIV.style.display = 'none'\r\n})\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n// function changeDisplay(identifier){\r\n//     for (let i=0; i < themaGroup.length; i++ ){\r\n//         if (themaGroup[i].id.slice(6, ) == identifier){\r\n\r\n//             // themaGroup[i].style.display = 'block'\r\n//         } else {\r\n\r\n//             // themaGroup[i].style.display = 'none'\r\n//         }\r\n//     }\r\n// }\r\n\r\n\r\n// function changeBorder(identifier){\r\n//     for (let i=0; i < effectButtonGroup.length; i++ ){\r\n//         if (effectButtonGroup[i].id.slice(6, ) == identifier){\r\n//             effectButtonGroup[i].style.border = '3px solid black';\r\n//         } else {\r\n//             effectButtonGroup[i].style.border = 'none';\r\n//         }\r\n//     }\r\n// }\r\n\r\n\r\n// for (let i = 0; i < bloom2D.length; i++) {\r\n//     bloom2D[i].addEventListener('click', hideColorMenuBG, false);\r\n// }\r\n\r\n\r\n// for (let i = 0; i < bloom3D.length; i++) {\r\n//     bloom3D[i].addEventListener('click', hideColorMenuOBJ1, false);\r\n// }\n\n//# sourceURL=webpack://Synthesizer/./src/js/ui.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/ui.js"]();
/******/ 	
/******/ })()
;