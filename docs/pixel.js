/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pixel/PixelGame.ts":
/*!********************************!*\
  !*** ./src/pixel/PixelGame.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PixelGame)
/* harmony export */ });
/* harmony import */ var _share_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../share/constant */ "./src/share/constant.ts");
/* harmony import */ var _share_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../share/field */ "./src/share/field.ts");


class PixelGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.currentColor = '#000000';
        this.field = new _share_field__WEBPACK_IMPORTED_MODULE_1__["default"](canvas.getContext('2d', { willReadFrequently: true }), _share_constant__WEBPACK_IMPORTED_MODULE_0__.CANVAS_PARAMS);
    }
    clickToCell(event) {
        const clickCoordinates = [event.offsetX, event.offsetY];
        const cell = this.field.getCellFromPixels(clickCoordinates);
        return cell;
    }
    handleClick(event) {
        const color = event.shiftKey ? _share_constant__WEBPACK_IMPORTED_MODULE_0__.CANVAS_PARAMS.bgColor : this.currentColor;
        const cell = this.clickToCell(event);
        this.field.drawFigure({ body: [cell], color });
    }
    chooseColor(event) {
        this.currentColor = event.target.dataset.color;
        const color = document.querySelector('.current-color');
        color.style.backgroundColor = this.currentColor;
    }
    handleDraw(event) {
        console.log(event);
    }
    saveImage() {
        const imageURL = this.canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.download = 'pixel.png';
        a.href = imageURL;
        a.click();
    }
}


/***/ }),

/***/ "./src/pixel/constant.ts":
/*!*******************************!*\
  !*** ./src/pixel/constant.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PICKER_COLORS": () => (/* binding */ PICKER_COLORS)
/* harmony export */ });
// todo: rgba colors
const PICKER_COLORS = [
    'red',
    'orange',
    'yellow',
    'green',
    'lightblue',
    'blue',
    'violet',
    'pink',
    'gray',
    'brown',
    'black',
];


/***/ }),

/***/ "./src/share/constant.ts":
/*!*******************************!*\
  !*** ./src/share/constant.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CANVAS_PARAMS": () => (/* binding */ CANVAS_PARAMS)
/* harmony export */ });
const width = 441;
const height = 441;
const CANVAS_PARAMS = {
    id: 'canvas',
    size: [width, height],
    cellSize: 40,
    gridColor: '#000000',
    // todo: choose bg color
    bgColor: '#ffffff',
};


/***/ }),

/***/ "./src/share/field.ts":
/*!****************************!*\
  !*** ./src/share/field.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Field)
/* harmony export */ });
class Field {
    constructor(context, params) {
        const [width, height] = params.size;
        this.width = width;
        this.height = height;
        this.context = context;
        this.cellSize = params.cellSize;
        this.gridColor = params.gridColor;
        this.initBoundaries();
        this.fillBackground(params.bgColor);
        this.drawGrid();
    }
    pickColor([x, y]) {
        const image = this.context.getImageData(x, y, 1, 1);
        console.log('image', image);
        return image.data;
    }
    fillBackground(color) {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.height, this.width);
    }
    isOutOfCanvas([x, y]) {
        const xIsOut = x < 0 || x > this.maxXCell;
        const yIsOut = y < 0 || y > this.maxYCell;
        return xIsOut || yIsOut;
    }
    initBoundaries() {
        this.maxXCell = Math.floor((this.width - this.cellSize) / this.cellSize);
        this.maxYCell = Math.floor((this.height - this.cellSize) / this.cellSize);
    }
    getCellFromPixels([clickX, clickY]) {
        const cellX = Math.floor(clickX / this.cellSize);
        const cellY = Math.floor(clickY / this.cellSize);
        return [cellX, cellY];
    }
    getCoordinates(cell) {
        const [x, y] = cell;
        return [x * this.cellSize, y * this.cellSize];
    }
    clean(cell) {
        const coordinates = this.getCoordinates(cell);
        this.context.clearRect(...coordinates, this.cellSize, this.cellSize);
    }
    drawCell(cell, color) {
        const coordinates = this.getCoordinates(cell);
        const size = [this.cellSize, this.cellSize];
        const params = [...coordinates, ...size];
        this.context.fillStyle = color;
        this.context.fillRect(...params);
    }
    drawFigure(figure) {
        figure.body.forEach((cell) => this.drawCell(cell, figure.color));
        this.drawGrid();
        this.context.save();
    }
    drawLine(startPoint, endPoint) {
        this.context.moveTo(...startPoint);
        this.context.lineTo(...endPoint);
    }
    drawGrid() {
        const canvasEnd = Math.max(this.width, this.height);
        for (let i = 0.5; i <= canvasEnd; i += this.cellSize) {
            this.drawLine([i, 1], [i, this.height]);
            this.drawLine([1, i], [this.width, i]);
        }
        this.context.stroke();
    }
}


/***/ }),

/***/ "./src/share/utils.ts":
/*!****************************!*\
  !*** ./src/share/utils.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrayToRGB": () => (/* binding */ arrayToRGB),
/* harmony export */   "getSnakeBody": () => (/* binding */ getSnakeBody),
/* harmony export */   "setupCanvas": () => (/* binding */ setupCanvas),
/* harmony export */   "setupPicker": () => (/* binding */ setupPicker)
/* harmony export */ });
/* harmony import */ var _pixel_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pixel/constant */ "./src/pixel/constant.ts");

const setupCanvas = (canvasElement, size) => {
    const [width, height] = size;
    canvasElement.setAttribute('width', width.toString());
    canvasElement.setAttribute('height', height.toString());
};
const getSnakeBody = () => {
    //todo: generate snake's body at the field's center
    return [
        [10, 12],
        [10, 13],
    ];
};
const arrayToRGB = (arr) => {
    // const [red, green, blue, alpha] = arr
    return `rgba(${arr.join(',')}`;
};
const setupPicker = (colorsContainer) => {
    for (const color of _pixel_constant__WEBPACK_IMPORTED_MODULE_0__.PICKER_COLORS) {
        const li = document.createElement('li');
        li.dataset['color'] = color;
        li.style.backgroundColor = color;
        colorsContainer.insertAdjacentElement('beforeend', li);
    }
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/pixel/index.ts ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _share_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../share/constant */ "./src/share/constant.ts");
/* harmony import */ var _share_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../share/utils */ "./src/share/utils.ts");
/* harmony import */ var _PixelGame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PixelGame */ "./src/pixel/PixelGame.ts");
/* eslint-disable @typescript-eslint/no-non-null-assertion */



const canvas = document.querySelector('#canvas');
(0,_share_utils__WEBPACK_IMPORTED_MODULE_1__.setupCanvas)(canvas, _share_constant__WEBPACK_IMPORTED_MODULE_0__.CANVAS_PARAMS.size);
const pickerColors = document.querySelector('.picker-colors');
(0,_share_utils__WEBPACK_IMPORTED_MODULE_1__.setupPicker)(pickerColors);
const game = new _PixelGame__WEBPACK_IMPORTED_MODULE_2__["default"](canvas);
canvas.addEventListener('click', (event) => game.handleClick(event));
const imagesContainer = document.querySelector('.images');
document.querySelector('.btn.save').addEventListener('click', () => game.saveImage());
const chooseColor = document.querySelector('.picker-colors');
chooseColor.addEventListener('click', (event) => game.chooseColor(event));

})();

/******/ })()
;