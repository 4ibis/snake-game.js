/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
    getCellCoordsFromPixels([clickX, clickY]) {
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
    drawCell(cell) {
        const coordinates = this.getCoordinates(cell.coords);
        const size = [this.cellSize, this.cellSize];
        this.context.fillStyle = cell.color;
        this.context.fillRect(...coordinates, ...size);
    }
    drawFigure(figure) {
        const b = figure.body;
        const lastIndex = b.length - 1;
        // draw from end to start
        for (let i = lastIndex; i >= 0; i--) {
            console.log(i);
            this.drawCell(b[i]);
        }
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
/* harmony import */ var _snake_constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../snake/constant */ "./src/snake/constant.ts");


const setupCanvas = (canvasElement, size) => {
    const [width, height] = size;
    canvasElement.setAttribute('width', width.toString());
    canvasElement.setAttribute('height', height.toString());
};
const getSnakeBody = () => {
    //todo: generate snake's body at the field's center
    return [
        { coords: [6, 5], color: _snake_constant__WEBPACK_IMPORTED_MODULE_1__.SNAKE_COLORS.head },
        { coords: [6, 6], color: _snake_constant__WEBPACK_IMPORTED_MODULE_1__.SNAKE_COLORS.body },
        { coords: [6, 7], color: _snake_constant__WEBPACK_IMPORTED_MODULE_1__.SNAKE_COLORS.body },
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


/***/ }),

/***/ "./src/snake/SnakeGame.ts":
/*!********************************!*\
  !*** ./src/snake/SnakeGame.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./src/snake/constant.ts");
/* harmony import */ var _share_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../share/field */ "./src/share/field.ts");
/* harmony import */ var _snake__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./snake */ "./src/snake/snake.ts");
/* harmony import */ var _navigator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./navigator */ "./src/snake/navigator.ts");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./state */ "./src/snake/state.ts");
/* harmony import */ var _dashboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dashboard */ "./src/snake/dashboard.ts");
/* harmony import */ var _share_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../share/utils */ "./src/share/utils.ts");
/* harmony import */ var _share_constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../share/constant */ "./src/share/constant.ts");








class Game {
    constructor(canvas) {
        this.isRunning = false;
        this.state = new _state__WEBPACK_IMPORTED_MODULE_4__["default"]();
        const snake = new _snake__WEBPACK_IMPORTED_MODULE_2__["default"]((0,_share_utils__WEBPACK_IMPORTED_MODULE_6__.getSnakeBody)());
        const field = new _share_field__WEBPACK_IMPORTED_MODULE_1__["default"](canvas.getContext('2d'), _share_constant__WEBPACK_IMPORTED_MODULE_7__.CANVAS_PARAMS);
        this.navigator = new _navigator__WEBPACK_IMPORTED_MODULE_3__["default"](snake, field, this.state.foodEaten.bind(this.state));
        this.navigator.drawSnake();
        this.navigator.putNewFoodOnField();
    }
    init(controls, dashboard) {
        this.dashboard = new _dashboard__WEBPACK_IMPORTED_MODULE_5__["default"](dashboard, this.state.getState.bind(this.state));
        this.state.updateDashboard = this.dashboard.update.bind(this.dashboard);
        this.dashboard.update();
        controls.speedUp.addEventListener('click', () => this.state.speedUp());
        controls.speedDown.addEventListener('click', () => this.state.speedDown());
    }
    handleKeyInput(event) {
        const keyCode = event.code;
        // console.log('keyCode', keyCode)
        const ALL_CONTROL_KEYS = [].concat(_constant__WEBPACK_IMPORTED_MODULE_0__.ARROW_KEYS, _constant__WEBPACK_IMPORTED_MODULE_0__.INCREASE_KEYS, _constant__WEBPACK_IMPORTED_MODULE_0__.DECREASE_KEYS);
        if (ALL_CONTROL_KEYS.includes(keyCode))
            event.preventDefault();
        if (_constant__WEBPACK_IMPORTED_MODULE_0__.ARROW_KEYS.includes(keyCode)) {
            const direction = keyCode.replace('Arrow', '');
            this.navigator.turn(direction);
            return;
        }
        if (_constant__WEBPACK_IMPORTED_MODULE_0__.PLAY_PAUSE_KEYS.includes(keyCode)) {
            this.toggleStartStop();
            return;
        }
        // for development
        const SPEED_KYES = [].concat(_constant__WEBPACK_IMPORTED_MODULE_0__.INCREASE_KEYS, _constant__WEBPACK_IMPORTED_MODULE_0__.DECREASE_KEYS);
        if (SPEED_KYES.includes(keyCode))
            this.tuneSpeed(keyCode);
    }
    tuneSpeed(keyCode) {
        if (_constant__WEBPACK_IMPORTED_MODULE_0__.INCREASE_KEYS.includes(keyCode)) {
            this.state.speedUp();
            this.start();
        }
        if (_constant__WEBPACK_IMPORTED_MODULE_0__.DECREASE_KEYS.includes(keyCode)) {
            this.state.speedDown();
            this.start();
        }
    }
    toggleStartStop() {
        this.isRunning ? this.stop() : this.start();
    }
    loop() {
        this.navigator.move();
        this.navigator.reDraw();
        this.state.stepsUp();
        // this.dashboard.update()
    }
    start(gameSpeed = this.state.speed) {
        this.stop();
        this.intervalID = window.setInterval(() => this.loop(), gameSpeed);
        this.isRunning = true;
    }
    stop() {
        if (this.intervalID) {
            clearInterval(this.intervalID);
            this.isRunning = false;
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);


/***/ }),

/***/ "./src/snake/constant.ts":
/*!*******************************!*\
  !*** ./src/snake/constant.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ARROW_KEYS": () => (/* binding */ ARROW_KEYS),
/* harmony export */   "CONTROLS_SELECTORS": () => (/* binding */ CONTROLS_SELECTORS),
/* harmony export */   "DASHBOARD_SELECTORS": () => (/* binding */ DASHBOARD_SELECTORS),
/* harmony export */   "DECREASE_KEYS": () => (/* binding */ DECREASE_KEYS),
/* harmony export */   "DIRECTIONS": () => (/* binding */ DIRECTIONS),
/* harmony export */   "FOOD_COLOR": () => (/* binding */ FOOD_COLOR),
/* harmony export */   "INCREASE_KEYS": () => (/* binding */ INCREASE_KEYS),
/* harmony export */   "PLAY_PAUSE_KEYS": () => (/* binding */ PLAY_PAUSE_KEYS),
/* harmony export */   "SNAKE_COLORS": () => (/* binding */ SNAKE_COLORS),
/* harmony export */   "SPEED_MAP": () => (/* binding */ SPEED_MAP)
/* harmony export */ });
const DIRECTIONS = {
    up: 'up',
    right: 'right',
    down: 'down',
    left: 'left',
};
const SNAKE_COLORS = {
    head: 'black',
    body: 'green',
};
const FOOD_COLOR = 'red';
const ARROW_KEYS = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'];
const INCREASE_KEYS = ['NumpadAdd', 'Equal', 'BracketRight'];
const DECREASE_KEYS = ['NumpadSubtract', 'Minus', 'BracketLeft'];
const PLAY_PAUSE_KEYS = ['Space', 'KeyP'];
const SPEED_MAP = {
    '1': 1000,
    '2': 750,
    '3': 500,
    '4': 250,
    '5': 100,
};
const DASHBOARD_SELECTORS = {
    speed: '.current-speed',
    level: '.level-view',
    steps: '.steps-view',
    food: '.debug .food-view',
};
const CONTROLS_SELECTORS = {
    speedUp: '.speed-up',
    speedDown: '.speed-down',
};


/***/ }),

/***/ "./src/snake/dashboard.ts":
/*!********************************!*\
  !*** ./src/snake/dashboard.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dashboard)
/* harmony export */ });
class Dashboard {
    constructor(dashboard, stateGetter) {
        this.dashboard = dashboard;
        this.stateGetter = stateGetter;
    }
    update(state = this.stateGetter()) {
        for (const [key, value] of Object.entries(state)) {
            this.dashboard[key].innerText = value.toString();
        }
    }
    updateSpeedView() {
        const state = this.stateGetter();
        const speedValue = 1000 / state.speed;
        this.dashboard.speed.innerText = speedValue.toFixed(1);
    }
    updateSteps() {
        this.dashboard.steps.innerText = this.stateGetter().steps.toString();
    }
}


/***/ }),

/***/ "./src/snake/food.ts":
/*!***************************!*\
  !*** ./src/snake/food.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Food {
    constructor(foodCell) {
        this.colorBody = 'red';
        this.body = [foodCell];
    }
    get position() {
        return this.body[0].coords;
    }
    set position(coords) {
        const cell = { coords, color: this.colorBody };
        this.body = [cell];
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Food);


/***/ }),

/***/ "./src/snake/navigator.ts":
/*!********************************!*\
  !*** ./src/snake/navigator.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _food__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./food */ "./src/snake/food.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constant */ "./src/snake/constant.ts");


class GameNavigator {
    constructor(snake, field, onFoodInside) {
        this.onFoodInside = onFoodInside;
        this.snake = snake;
        this.field = field;
    }
    reDraw() {
        this.drawSnake();
    }
    drawSnake() {
        this.field.drawFigure(this.snake);
        this.field.drawGrid();
    }
    getNewFood() {
        let coords;
        do {
            coords = this.createRandomCell();
        } while (this.isCellUnderSnake(coords));
        return new _food__WEBPACK_IMPORTED_MODULE_0__["default"]({ coords, color: _constant__WEBPACK_IMPORTED_MODULE_1__.FOOD_COLOR });
    }
    isCellUnderSnake(cell) {
        const check = (cellOfSnake) => this.isOnSamePosition(cell, cellOfSnake.coords);
        return this.snake.body.some(check);
    }
    getRandomNumber(min, max) {
        const randomFloat = Math.random() * (min - max) + max;
        return Math.floor(randomFloat);
    }
    createRandomCell() {
        const x = this.getRandomNumber(0, this.field.maxXCell);
        const y = this.getRandomNumber(0, this.field.maxYCell);
        return [x, y];
    }
    putNewFoodOnField() {
        this.food = this.getNewFood();
        this.field.drawFigure(this.food);
    }
    move() {
        this.moveHeadForward();
        this.moveTail();
    }
    moveHeadForward() {
        const newHeadCoords = this.getNextCellCoords(this.snake.getHead().coords, this.snake.direction);
        if (this.field.isOutOfCanvas(newHeadCoords)) {
            this.correctPosition(newHeadCoords);
        }
        if (this.isOnSamePosition(this.food.position, newHeadCoords)) {
            this.snake.isGrowing = true;
            this.snake.foodInside++;
            this.onFoodInside(this.snake.foodInside);
            this.putNewFoodOnField();
        }
        this.snake.setHead(newHeadCoords);
    }
    moveTail() {
        if (!this.snake.isGrowing) {
            this.field.clean(this.snake.popTail().coords);
        }
        this.snake.isGrowing = false;
    }
    /**
     *  moves cell to opposite side if it is out of canvas
     */
    correctPosition(cell) {
        const [x, y] = cell;
        if (x < 0) {
            cell[0] = this.field.maxXCell;
        }
        else if (x > this.field.maxXCell) {
            cell[0] = 0;
        }
        else if (y < 0) {
            cell[1] = this.field.maxYCell;
        }
        else if (y > this.field.maxYCell) {
            cell[1] = 0;
        }
    }
    isOnSamePosition(cellA, cellB) {
        const [a_x, a_y] = cellA;
        const [b_x, b_y] = cellB;
        return a_x === b_x && a_y === b_y;
    }
    getNextCellCoords(cell, direction) {
        let [x, y] = cell;
        let newHead = null;
        switch (direction) {
            case 'up':
                newHead = [x, --y];
                break;
            case 'right':
                newHead = [++x, y];
                break;
            case 'down':
                newHead = [x, ++y];
                break;
            case 'left':
                newHead = [--x, y];
                break;
            default:
                throw new Error('wrong direction!');
        }
        return newHead;
    }
    turn(direction) {
        this.snake.turn(direction);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameNavigator);


/***/ }),

/***/ "./src/snake/snake.ts":
/*!****************************!*\
  !*** ./src/snake/snake.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./src/snake/constant.ts");

class Snake {
    constructor(body) {
        this.isGrowing = false;
        this.direction = _constant__WEBPACK_IMPORTED_MODULE_0__.DIRECTIONS.up;
        this.colorBody = _constant__WEBPACK_IMPORTED_MODULE_0__.SNAKE_COLORS.body;
        this.colorHead = _constant__WEBPACK_IMPORTED_MODULE_0__.SNAKE_COLORS.head;
        this.foodInside = 0;
        this.body = body;
    }
    getHead() {
        return this.body[0];
    }
    setHead(coords) {
        const head = { coords, color: this.colorHead };
        this.body.unshift(head);
        this.body[1].color = this.colorBody;
    }
    popTail() {
        return this.body.pop();
    }
    get size() {
        return this.body.length;
    }
    turn(direction) {
        switch (direction) {
            case 'Up':
                this.turnUp();
                break;
            case 'Right':
                this.turnRight();
                break;
            case 'Down':
                this.turnDown();
                break;
            case 'Left':
                this.turnLeft();
                break;
            default:
                throw new Error('Wrong direction');
        }
    }
    turnUp() {
        if (this.direction !== _constant__WEBPACK_IMPORTED_MODULE_0__.DIRECTIONS.down) {
            this.direction = _constant__WEBPACK_IMPORTED_MODULE_0__.DIRECTIONS.up;
        }
    }
    turnRight() {
        if (this.direction !== _constant__WEBPACK_IMPORTED_MODULE_0__.DIRECTIONS.left) {
            this.direction = _constant__WEBPACK_IMPORTED_MODULE_0__.DIRECTIONS.right;
        }
    }
    turnDown() {
        if (this.direction !== _constant__WEBPACK_IMPORTED_MODULE_0__.DIRECTIONS.up) {
            this.direction = _constant__WEBPACK_IMPORTED_MODULE_0__.DIRECTIONS.down;
        }
    }
    turnLeft() {
        if (this.direction !== _constant__WEBPACK_IMPORTED_MODULE_0__.DIRECTIONS.right) {
            this.direction = _constant__WEBPACK_IMPORTED_MODULE_0__.DIRECTIONS.left;
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Snake);


/***/ }),

/***/ "./src/snake/state.ts":
/*!****************************!*\
  !*** ./src/snake/state.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameState)
/* harmony export */ });
class GameState {
    constructor() {
        this._level = 1;
        this._steps = 0;
        this._speed = 500;
        this.speedStep = 25;
        this.foodCount = 0;
    }
    getState() {
        return {
            level: this._level,
            steps: this._steps,
            speed: this._speed,
            food: this.foodCount,
        };
    }
    foodEaten(foodCount) {
        this.foodCount = foodCount;
        this.updateDashboard(this.getState());
    }
    levelUp() {
        this._level++;
        this.updateDashboard(this.getState());
    }
    stepsUp() {
        this._steps++;
        this.updateDashboard(this.getState());
    }
    get speed() {
        return this._speed;
    }
    speedUp() {
        const newSpeed = this._speed - this.speedStep;
        this._speed = newSpeed < 0 ? 0 : newSpeed;
        this.updateDashboard(this.getState());
    }
    speedDown() {
        this._speed = this._speed + this.speedStep;
        this.updateDashboard(this.getState());
    }
}


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
  !*** ./src/snake/index.ts ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./src/snake/constant.ts");
/* harmony import */ var _SnakeGame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SnakeGame */ "./src/snake/SnakeGame.ts");
/* harmony import */ var _share_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../share/utils */ "./src/share/utils.ts");
/* harmony import */ var _share_constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../share/constant */ "./src/share/constant.ts");
/* eslint-disable @typescript-eslint/no-non-null-assertion */




const select = (s) => document.querySelector(s);
const canvas = document.getElementById(_share_constant__WEBPACK_IMPORTED_MODULE_3__.CANVAS_PARAMS.id);
(0,_share_utils__WEBPACK_IMPORTED_MODULE_2__.setupCanvas)(canvas, _share_constant__WEBPACK_IMPORTED_MODULE_3__.CANVAS_PARAMS.size);
const game = new _SnakeGame__WEBPACK_IMPORTED_MODULE_1__["default"](canvas);
const controls = {
    speedUp: select(_constant__WEBPACK_IMPORTED_MODULE_0__.CONTROLS_SELECTORS.speedUp),
    speedDown: select(_constant__WEBPACK_IMPORTED_MODULE_0__.CONTROLS_SELECTORS.speedDown),
};
const dashboard = {
    speed: select(_constant__WEBPACK_IMPORTED_MODULE_0__.DASHBOARD_SELECTORS.speed),
    level: select(_constant__WEBPACK_IMPORTED_MODULE_0__.DASHBOARD_SELECTORS.level),
    steps: select(_constant__WEBPACK_IMPORTED_MODULE_0__.DASHBOARD_SELECTORS.steps),
    food: select(_constant__WEBPACK_IMPORTED_MODULE_0__.DASHBOARD_SELECTORS.food),
};
game.init(controls, dashboard);
document.addEventListener('keydown', (event) => game.handleKeyInput(event));

})();

/******/ })()
;