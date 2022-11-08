import { canvasID } from './src/constant'
import Game from './src/game'

const canvas = document.getElementById(canvasID)
const speedView = document.querySelector('.current-speed')

const game = new Game(canvas, speedView)
const controls = {
    speedUp: document.querySelector('.speed-up'),
    speedDown: document.querySelector('.speed-down'),
}
game.initControls(controls)

document.addEventListener('keydown', (event) => game.handleKeyInput(event))
