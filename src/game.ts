import Field from './field'
import Snake from './snake'
import GameNavigator from './navigator'
import { Controls, FigureBody, Size } from './types'
import {
    ARROW_KEYS,
    CANVAS_PARAMS,
    DECREASE_KEYS,
    INCREASE_KEYS,
    numberKeys,
    PLAY_PAUSE_KEYS,
    speedMap,
} from './constant'

class Game {
    public speed: number
    private speedChangeStep: number = 25
    private speedView: HTMLElement
    private intervalID: number
    public navigator: GameNavigator
    private isRunning: boolean = false

    constructor(canvas: HTMLCanvasElement, speedView: HTMLElement, speed = 500) {
        this.setupCanvas(canvas, CANVAS_PARAMS.size)
        //todo: generate snake's body at the field's center
        const snakeBody: FigureBody = [
            [10, 12],
            [10, 13],
        ]
        const snake = new Snake(snakeBody)
        const field = new Field(canvas.getContext('2d'), CANVAS_PARAMS)
        this.navigator = new GameNavigator(snake, field)
        this.speed = speed
        this.speedView = speedView
        this.updateSpeedView()
        this.navigator.drawSnake()
        this.navigator.putNewFoodOnField()
    }

    initControls(controls: Controls) {
        controls.speedUp.addEventListener('click', () => this.speedUp())
        controls.speedDown.addEventListener('click', () => this.speedDown())
    }

    handleKeyInput(event: KeyboardEvent) {
        const keyCode = event.code
        const ALL_CONTROL_KEYS = [].concat(ARROW_KEYS, numberKeys, INCREASE_KEYS, DECREASE_KEYS)
        const SPEED_KYES = [].concat(INCREASE_KEYS, DECREASE_KEYS)

        // console.log('keyCode', keyCode)
        if (ALL_CONTROL_KEYS.includes(keyCode)) event.preventDefault()

        if (PLAY_PAUSE_KEYS.includes(keyCode)) this.toggleStartStop()
        if (SPEED_KYES.includes(keyCode)) this.tuneSpeed(keyCode)

        if (ARROW_KEYS.includes(keyCode)) {
            const direction = keyCode.replace('Arrow', '')
            this.navigator.turn(direction)
        }

        // direct set speed for development
        if (numberKeys.includes(keyCode)) {
            const speedIndex = keyCode.slice(-1)
            const newSpeed = speedMap[speedIndex]
            newSpeed && this.changeSpeed(speedMap[speedIndex])
        }
    }

    tuneSpeed(keyCode: string) {
        if (INCREASE_KEYS.includes(keyCode)) this.speedUp()
        if (DECREASE_KEYS.includes(keyCode)) this.speedDown()
    }

    private speedUp() {
        const speed = this.speed - this.speedChangeStep < 0 ? 0 : this.speed - this.speedChangeStep
        this.changeSpeed(speed)
    }

    private speedDown(): void {
        const speed = this.speed + this.speedChangeStep
        this.changeSpeed(speed)
    }

    toggleStartStop(): void {
        this.isRunning ? this.stop() : this.start()
    }

    setupCanvas(canvasElement: HTMLCanvasElement, size: Size): void {
        const [width, height] = size
        canvasElement.setAttribute('width', width.toString())
        canvasElement.setAttribute('height', height.toString())
    }

    loop(): void {
        this.navigator.move()
        this.navigator.reDraw()
    }

    start(gameSpeed: number = this.speed): void {
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

    changeSpeed(speed: number): void {
        this.speed = speed
        this.updateSpeedView()
        this.start()
    }

    updateSpeedView() {
        const speedValue = 1000 / this.speed
        this.speedView.innerText = speedValue.toFixed(1)
    }
}

export default Game
