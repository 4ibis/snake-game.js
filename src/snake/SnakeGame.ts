import { ARROW_KEYS, DECREASE_KEYS, INCREASE_KEYS, PLAY_PAUSE_KEYS } from './constant'
import { Controls, DashboardView } from './types'
import Field from '../share/field'
import Snake from './snake'
import GameNavigator from './navigator'
import GameState from './state'
import Dashboard from './dashboard'
import { getSnakeBody } from '../share/utils'
import { CANVAS_PARAMS } from '../share/constant'
import { EVENT, EventEmitter } from '../share/event'

class Game {
    private events: EventEmitter
    private intervalID: number
    public navigator: GameNavigator
    private isRunning: boolean = false
    private dashboard: Dashboard
    private state: GameState
    private gameOver: boolean = false

    constructor(canvas: HTMLCanvasElement, dashboardView: DashboardView, controls: Controls) {
        this.events = new EventEmitter()
        const snake = new Snake(getSnakeBody())
        const field = new Field(canvas.getContext('2d'), CANVAS_PARAMS)
        this.navigator = new GameNavigator(snake, field, this.events)
        this.registerEvents()
        this.dashboard = new Dashboard(dashboardView, this.events)
        this.state = new GameState(this.events)
        this.state.updateDashboard = this.dashboard.update.bind(this.dashboard)
        this.initControls(controls)
    }

    private registerEvents() {
        this.events.on(EVENT.onDie, () => this.finish())
    }

    initControls(controls: Controls) {
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
        if (!this.gameOver) {
            this.navigator.reDraw()
        }
        this.events.emit(EVENT.onStateUpdate, this.state.state)
    }

    start(gameSpeed: number = this.state.speed): void {
        if (this.gameOver) {
            return
        }
        this.stop()
        this.loop() // todo: better chane speed algorithm
        this.intervalID = window.setInterval(() => this.loop(), gameSpeed)
        this.isRunning = true
    }

    finish(): void {
        console.info('Game is Over')
        this.stop()
        this.gameOver = true
        // todo: show game over popup
        alert('GAME OVER')
        location.reload()
    }

    stop(): void {
        if (this.intervalID) {
            clearInterval(this.intervalID)
            this.isRunning = false
        }
    }
}

export default Game
