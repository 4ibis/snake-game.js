import { CanvasParams } from './field'

export const DIRECTIONS = {
    up: 'up',
    right: 'right',
    down: 'down',
    left: 'left',
}

export const arrowsKeys = [
    'ArrowDown',
    'ArrowRight',
    'ArrowUp',
    'ArrowLeft'
]

export const increaseDecreaseKeys = [
    'NumpadSubtract',
    'NumpadAdd',
]

export const numberKeys = [
    'Numpad1',
    'Numpad2',
    'Numpad3',
    'Numpad4',
    'Numpad5',
    'Digit1',
    'Digit2',
    'Digit3',
    'Digit4',
    'Digit5',
]

export const speedMap = {
    '1': 1000,
    '2': 750,
    '3': 500,
    '4': 250,
    '5': 100,
}

const width = 401
const height = 401
export const canvasID: string = 'canvas'
export const CANVAS_PARAMS: CanvasParams = {
    size: [width, height],
    cellSize: 20,
    gridColor: '#000000',
    bgColor: '#ffffff', // '#dadada',
}