import {
    ARROW_KEYS,
    CANVAS_PARAMS,
    DECREASE_KEYS,
    INCREASE_KEYS,
    PLAY_PAUSE_KEYS,
} from './constant'
import { Controls, DashboardView } from './types'
import Field from './field'
import Snake from './snake'
import GameNavigator from './navigator'
import GameState from './state'
import Dashboard from './dashboard'
import { getSnakeBody } from './utils'

class Game {
    private intervalID: number
    public navigator: GameNavigator
    private isRunning: boolean = false
    private dashboard: Dashboard
    private state: GameState = new GameState()

    constructor(canvas: HTMLCanvasElement) {
        const snake = new Snake(getSnakeBody())
        const field = new Field(canvas.getContext('2d'), CANVAS_PARAMS)
        this.navigator = new GameNavigator(snake, field, this.state.foodEaten.bind(this.state))
        this.navigator.drawSnake()
        this.navigator.putNewFoodOnField()
    }

    init(controls: Controls, dashboard: DashboardView) {
        this.dashboard = new Dashboard(dashboard, this.state.getState.bind(this.state))
        this.state.updateDashboard = this.dashboard.update.bind(this.dashboard)
        this.dashboard.update()
        controls.speedUp.addEventListener('click', () => this.state.speedUp())
        controls.speedDown.addEventListener('click', () => this.state.speedDown())
    }

    handleKeyInput(event: KeyboardEvent) {
        const keyCode = event.code
        // console.log('keyCode', keyCode)
        const ALL_CONTROL_KEYS = [].concat(ARROW_KEYS, INCREASE_KEYS, DECREASE_KEYS)
        if (ALL_CONTROL_KEYS.includes(keyCode)) event.preventDefault()

        if (ARROW_KEYS.includes(keyCode)) {
            const direction = keyCode.replace('Arrow', '')
            this.navigator.turn(direction)
            return
        }

        if (PLAY_PAUSE_KEYS.includes(keyCode)) {
            this.toggleStartStop()
            return
        }

        // for development
        const SPEED_KYES = [].concat(INCREASE_KEYS, DECREASE_KEYS)
        if (SPEED_KYES.includes(keyCode)) this.tuneSpeed(keyCode)
    }

    tuneSpeed(keyCode: string) {
        if (INCREASE_KEYS.includes(keyCode)) {
            this.state.speedUp()
            this.start()
        }
        if (DECREASE_KEYS.includes(keyCode)) {
            this.state.speedDown()
            this.start()
        }
    }

    toggleStartStop(): void {
        this.isRunning ? this.stop() : this.start()
    }

    loop(): void {
        this.navigator.move()
        this.navigator.reDraw()
        this.state.stepsUp()
        // this.dashboard.update()
    }

    start(gameSpeed: number = this.state.speed): void {
        this.stop()
        this.intervalID = window.setInterval(() => this.loop(), gameSpeed)
        this.isRunning = true
    }

    stop(): void {
        if (this.intervalID) {
            clearInterval(this.intervalID)
            this.isRunning = false
        }
    }
}

export default Game
