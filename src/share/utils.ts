import { PICKER_COLORS } from '../pixel/constant'
import { FigureBody, Size } from '../snake/types'

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
export const arrayToRGB = (arr: Uint8ClampedArray): string => {
    // const [red, green, blue, alpha] = arr
    return `rgba(${arr.join(',')}`
}

export const setupPicker = (colorsContainer: HTMLElement): void => {
    for (const color of PICKER_COLORS) {
        const li = document.createElement('li')
        li.dataset['color'] = color
        li.style.backgroundColor = color
        colorsContainer.insertAdjacentElement('beforeend', li)
    }
}
