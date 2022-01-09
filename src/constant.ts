import { CanvasParams } from './canvas'

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

const width = 401
const height = 401

export const CANVAS_PARAMS: CanvasParams = {
    size: [width, height],
    cellSize: 20,
    canvas: document.getElementById('canvas') as HTMLCanvasElement,
    gridColor: '#000000',
    bgColor: '#ffffff', // '#dadada',
}