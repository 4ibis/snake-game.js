import Canvas from './canvas'
import Snake from './snake'
import GameNavigator from './navigator'
import { Cell } from './types'
import { CANVAS_PARAMS } from './constant'
import Food from './food'


class Game {
    isRunning: boolean = false
    public speed: number = 500
    private intervalID: any
    public snake: Snake
    public nav: GameNavigator
    public field: Canvas
    private food: Food

    constructor(speed: number) {
        this.field = new Canvas(CANVAS_PARAMS)
        this.snake = new Snake()
        this.nav = new GameNavigator(this.snake, this.field)
        this.speed = speed
        this.field.draw(this.snake)
        this.putNewFoodOnField()
    }

    setup() {

    }

    /**
     *  moves cell to opposite side if it is out of canvas
     */
    private correctPosition(cell: Cell): void {
        const [x, y] = cell
        if (x < 0) {
            cell[0] = this.field.maxXCell
        } else if (x > this.field.maxXCell) {
            cell[0] = 0
        } else if (y < 0) {
            cell[1] = this.field.maxYCell
        } else if (y > this.field.maxYCell) {
            cell[1] = 0
        }
    }

    moveHeadForward(): void {
        const newHead: Cell = this.nav.getNextCell(this.snake.getHead(), this.snake.direction)
        if (this.field.isOutOfCanvas(newHead)) {
            this.correctPosition(newHead)
        }
        if (this.nav.isOnSamePosition(this.food.position, newHead)) {
            this.snake.grow()
            this.putNewFoodOnField()
        }
        this.snake.setHead(newHead)
    }

    loop(): void {
        this.moveHeadForward()
        this.field.clean(this.snake.popTail())
        this.field.draw(this.snake)
    }

    start(gameSpeed?: number | null): void {
        this.stop()
        this.setup()
        this.intervalID = setInterval(() => this.loop(), gameSpeed || this.speed)
        this.isRunning = true
    }

    stop(): void {
        if (this.intervalID) {
            clearInterval(this.intervalID)
            this.isRunning = false
        }
    }

    isCellOnSnake(cell): boolean {
        let result = false
        this.snake.body.some(cellOfSnake => (result = this.nav.isOnSamePosition(cell, cellOfSnake)))
        return result
    }

    getRandomNumber(min: number = 0, max: number): number {
        const randomFloat = Math.random() * (min - max) + max
        return Math.floor(randomFloat)
    }

    createRandomCell(): Cell {
        const x = this.getRandomNumber(0, this.field.maxXCell)
        const y = this.getRandomNumber(0, this.field.maxYCell)
        return [x, y]
    }

    getNewFood(): Food {
        let cell
        do {
            cell = this.createRandomCell()
        } while (this.isCellOnSnake(cell))
        return new Food(cell)
    }

    putNewFoodOnField(): void {
        this.food = this.getNewFood()
        this.field.draw(this.food)
    }

    changeSpeed(speed: number): void {
        this.speed = speed
        this.start()
    }
}

export default Game
