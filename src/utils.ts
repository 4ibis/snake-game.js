import { FigureBody, Size } from './types'

export const setupCanvas = (canvasElement: HTMLCanvasElement, size: Size): void => {
    const [width, height] = size
    canvasElement.setAttribute('width', width.toString())
    canvasElement.setAttribute('height', height.toString())
}

export const getSnakeBody = (): FigureBody => {
    //todo: generate snake's body at the field's center
    return [
        [10, 12],
        [10, 13],
    ]
}
