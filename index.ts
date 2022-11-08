/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { canvasID } from './src/constant'
import Game from './src/game'
import { Controls } from './src/types'

const canvas = document.getElementById(canvasID)! as HTMLCanvasElement
const speedView = document.querySelector('.current-speed')! as HTMLElement

const game = new Game(canvas!, speedView)
const controls: Controls = {
    speedUp: document.querySelector('.speed-up')!,
    speedDown: document.querySelector('.speed-down')!,
}
game.initControls(controls)

document.addEventListener('keydown', (event) => game.handleKeyInput(event))
