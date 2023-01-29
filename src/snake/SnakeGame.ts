import { ARROW_KEYS, DECREASE_KEYS, INCREASE_KEYS, PLAY_PAUSE_KEYS } from './constant'
import { EVENT, IEventEmitter } from '../share/event'
import GameNavigator from './navigator'
import GameState from './state'
import Dashboard from './dashboard'

class Game {
    private intervalID: number
    private isRunning: boolean = false
    private gameOver: boolean = false

    constructor(
        private events: IEventEmitter,
        private state: GameState,
        private navigator: GameNavigator,
        private dashboard: Dashboard
    ) {
        this.registerEvents()
    }

    private registerEvents() {
        this.events.on(EVENT.onSpeedChange, () => {
            this.state.checkUpdateLevel()
            this.start()
        })
        this.events.on(EVENT.onStateUpdate, () => this.dashboard.update(this.state.state))
        this.events.on(EVENT.onDie, () => this.finish())
    }

    public handleKeyInput(event: KeyboardEvent) {
        const keyCode = event.code
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

    private tuneSpeed(keyCode: string) {
        if (INCREASE_KEYS.includes(keyCode)) {
            this.state.speedUp()
        } else if (DECREASE_KEYS.includes(keyCode)) {
            this.state.speedDown()
        } else {
            throw Error(`wrong tune speed keyCode: ${keyCode}`)
        }
    }

    private toggleStartStop(): void {
        this.isRunning ? this.stop() : this.start()
    }

    private loop(): void {
        this.navigator.move()
        if (!this.gameOver) {
            this.navigator.reDraw()
        }
        this.events.emit(EVENT.onStateUpdate, this.state.state)
    }

    private start(gameSpeed: number = this.state.speed): void {
        if (this.gameOver) {
            return
        }
        this.stop()
        // this.loop() // todo: better change speed algorithm
        this.intervalID = window.setInterval(() => this.loop(), gameSpeed)
        this.isRunning = true
    }

    private finish(): void {
        console.info('Game is Over')
        this.stop()
        this.gameOver = true
        this.dashboard.showGameOver()
        alert('GAME OVER')
        location.reload()
    }

    private stop(): void {
        if (this.intervalID) {
            clearInterval(this.intervalID)
            this.isRunning = false
        }
    }
}

export default Game
