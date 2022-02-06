import { canvasID } from './src/constant'
import Game from './src/game'

const canvas = document.getElementById(canvasID)
const speedView = document.querySelector('.current-speed')
const game = new Game(canvas, speedView)

document.addEventListener('keydown', (event) => game.handleKeyInput(event))
