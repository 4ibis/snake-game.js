/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CANVAS_PARAMS, CONTROLS_SELECTORS, DASHBOARD_SELECTORS } from './src/constant'
import Game from './src/game'
import { Controls, DashboardView } from './src/types'
import { setupCanvas } from './src/utils'

const select = (s: string): HTMLElement => document.querySelector(s)!

const canvas = document.getElementById(CANVAS_PARAMS.id)! as HTMLCanvasElement
setupCanvas(canvas, CANVAS_PARAMS.size)

const game = new Game(canvas)

const controls: Controls = {
    speedUp: select(CONTROLS_SELECTORS.speedUp),
    speedDown: select(CONTROLS_SELECTORS.speedDown),
}
const dashboard: DashboardView = {
    speed: select(DASHBOARD_SELECTORS.speed),
    level: select(DASHBOARD_SELECTORS.level),
    steps: select(DASHBOARD_SELECTORS.steps),
    food: select(DASHBOARD_SELECTORS.food),
}

game.init(controls, dashboard)

document.addEventListener('keydown', (event) => game.handleKeyInput(event))
