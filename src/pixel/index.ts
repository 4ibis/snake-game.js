/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CANVAS_PARAMS } from '../share/constant'
import { setupCanvas, setupPicker } from '../share/utils'
import PixelGame from './PixelGame'

const canvas: HTMLCanvasElement = document.querySelector('#canvas')!
setupCanvas(canvas, CANVAS_PARAMS.size)

const pickerColors: HTMLElement = document.querySelector('.picker-colors')!
setupPicker(pickerColors)

const game = new PixelGame(canvas)

canvas.addEventListener('click', (event) => game.handleClick(event))

document.querySelector('.btn.save').addEventListener('click', () => game.saveImage())

const chooseColor: HTMLElement = document.querySelector('.picker-colors')!
chooseColor.addEventListener('click', (event) => game.chooseColor(event))
