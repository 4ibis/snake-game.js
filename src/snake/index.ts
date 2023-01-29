import { CONTROLS_SELECTORS, DASHBOARD_SELECTORS } from './constant'
import Game from './SnakeGame'
import { Controls, DashboardView } from './types'
import { getSnakeBody, setupCanvas } from '../share/utils'
import { CANVAS_PARAMS } from '../share/constant'
import { getEmitter } from '../share/event'
import Snake from './snake'
import Field from '../share/field'
import GameNavigator from './navigator'
import GameState from './state'
import Dashboard from './dashboard'

const select = (s: string): HTMLElement => document.querySelector(s)!

const canvas = document.getElementById(CANVAS_PARAMS.id)! as HTMLCanvasElement
setupCanvas(canvas, CANVAS_PARAMS.size)

const controls: Controls = {
    speedUp: select(CONTROLS_SELECTORS.speedUp),
    speedDown: select(CONTROLS_SELECTORS.speedDown),
}

const dashboardView: DashboardView = {
    speed: select(DASHBOARD_SELECTORS.speed),
    level: select(DASHBOARD_SELECTORS.level),
    steps: select(DASHBOARD_SELECTORS.steps),
    food: select(DASHBOARD_SELECTORS.food),
}

const emitter = getEmitter()
const state = new GameState(emitter)
const snake = new Snake(getSnakeBody())
const field = new Field(canvas.getContext('2d'), CANVAS_PARAMS)
const navigator = new GameNavigator(snake, field, emitter)
const dashboard = new Dashboard(dashboardView, emitter)

const game = new Game(emitter, state, navigator, dashboard, controls)

document.addEventListener('keydown', (event) => game.handleKeyInput(event))
