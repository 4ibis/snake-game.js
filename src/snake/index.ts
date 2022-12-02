/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CONTROLS_SELECTORS, DASHBOARD_SELECTORS } from './constant'
import Game from './SnakeGame'
import { Controls, DashboardView } from './types'
import { setupCanvas } from '../share/utils'
import { CANVAS_PARAMS } from '../share/constant'

const select = (s: string): HTMLElement => document.querySelector(s)!

const canvas = document.getElementById(CANVAS_PARAMS.id)! as HTMLCanvasElement
setupCanvas(canvas, CANVAS_PARAMS.size)

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

const game = new Game(canvas, dashboard, controls)

document.addEventListener('keydown', (event) => game.handleKeyInput(event))
