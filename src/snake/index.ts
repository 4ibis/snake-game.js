import { CONTROLS_SELECTORS, DASHBOARD_SELECTORS } from './constant'
import Game from './SnakeGame'
import { Controls, DashboardView } from './types'
import { getSnakeBody, select, setupCanvas } from '../share/utils'
import { CANVAS_PARAMS } from '../share/constant'
import { getEmitter } from '../share/event'
import Snake from './snake'
import Field from '../share/field'
import GameNavigator from './navigator'
import GameState from './state'
import Dashboard from './dashboard'

const canvas = select<HTMLCanvasElement>(CANVAS_PARAMS.selector)
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
const dashboard = new Dashboard(dashboardView)

const navigator = new GameNavigator(
    new Snake(getSnakeBody()),
    new Field(canvas.getContext('2d'), CANVAS_PARAMS),
    emitter
)

const game = new Game(emitter, state, navigator, dashboard)

initControls(controls, state)

document.addEventListener('keydown', (event) => game.handleKeyInput(event))

function initControls(controls: Controls, state: GameState) {
    controls.speedUp.addEventListener('click', () => state.speedUp())
    controls.speedDown.addEventListener('click', () => state.speedDown())
}
