import { ARROW_KEYS, DECREASE_KEYS, INCREASE_KEYS, PLAY_PAUSE_KEYS } from './constant'
import { Controls } from './types'
import GameNavigator from './navigator'
import GameState from './state'
import Dashboard from './dashboard'
import { EVENT, IEventEmitter } from '../share/event'

class Game {
    private intervalID: number
    private isRunning: boolean = false
    private gameOver: boolean = false

    constructor(
        private events: IEventEmitter,
        private state: GameState,
        public navigator: GameNavigator,
        private dashboard: Dashboard,
        controls: Controls
    ) {
        this.registerEvents()
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

    public handleKeyInput(event: KeyboardEvent) {
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
        this.loop() // todo: better change speed algorithm
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
