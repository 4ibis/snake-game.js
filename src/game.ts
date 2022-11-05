import Field from './field'
import Snake from './snake'
import GameNavigator from './navigator'
import { FigureBody, Size } from './types'
import {
    arrowsKeys,
    CANVAS_PARAMS,
    increaseDecreaseKeys,
    numberKeys,
    speedMap,
} from './constant'

class Game {
    isRunning = false
    public speed: number
    private speedView: HTMLElement
    private intervalID: number
    public navigator: GameNavigator

    constructor(canvas: HTMLCanvasElement, speedView: HTMLElement, speed = 500) {
        this.setupCanvas(canvas, CANVAS_PARAMS.size)
        //todo: generate snake's body at the field's center
        const snakeBody = [
            [10, 12],
            [10, 13],
        ] as FigureBody
        const snake = new Snake(snakeBody)
        const field = new Field(canvas.getContext('2d'), CANVAS_PARAMS)
        this.navigator = new GameNavigator(snake, field)
        this.speed = speed
        this.speedView = speedView
        this.updateSpeedView()
        this.navigator.drawSnake()
        this.navigator.putNewFoodOnField()
    }

    handleKeyInput(event: KeyboardEvent) {
        const keyCode = event.code
        if (keyCode === 'Space') {
            this.toggleStartStop()
        }
        if (arrowsKeys.includes(keyCode)) {
            const direction = keyCode.replace('Arrow', '')
            this.navigator.turn(direction)
        }
        if (numberKeys.includes(keyCode)) {
            const speedIndex = keyCode.slice(-1)
            this.changeSpeed(speedMap[speedIndex])
        }
        if (increaseDecreaseKeys.includes(keyCode)) {
            this.tuneSpeed(keyCode)
        }
    }

    tuneSpeed(keyCode: string) {
        let newSpeed = this.speed
        const tuningStep = 50
        if (keyCode.endsWith('Add')) {
            newSpeed = this.speed - tuningStep < 0 ? 0 : this.speed - tuningStep
        }
        if (keyCode.endsWith('Subtract')) {
            newSpeed = this.speed + tuningStep
        }
        this.changeSpeed(newSpeed)
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
        this.navigator.moveHeadForward()
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
