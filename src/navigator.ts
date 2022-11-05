import { Cell } from './types'
import Snake from './snake'
import Field from './field'
import Food from './food'

class GameNavigator {
    private food: Food
    private snake: Snake
    private field: Field

    constructor(snake: Snake, field: Field) {
        this.snake = snake
        this.field = field
    }

    reDraw() {
        this.drawSnake()
        this.field.clean(this.snake.popTail())
        this.field.drawGrid()
    }

    drawSnake() {
        this.field.drawFigure(this.snake)
    }

    getNewFood(): Food {
        let cell
        do {
            cell = this.createRandomCell()
        } while (this.isCellUnderSnake(cell))
        return new Food(cell)
    }

    isCellUnderSnake(cell: Cell): boolean {
        let result = false
        this.snake.body.some(
            (cellOfSnake) => (result = this.isOnSamePosition(cell, cellOfSnake))
        )
        return result
    }

    getRandomNumber(min = 0, max: number): number {
        const randomFloat = Math.random() * (min - max) + max
        return Math.floor(randomFloat)
    }

    createRandomCell(): Cell {
        const x = this.getRandomNumber(0, this.field.maxXCell)
        const y = this.getRandomNumber(0, this.field.maxYCell)
        return [x, y]
    }

    putNewFoodOnField(): void {
        this.food = this.getNewFood()
        this.field.drawFigure(this.food)
    }

    moveHeadForward(): void {
        const newHead: Cell = this.getNextCell(this.snake.getHead(), this.snake.direction)
        if (this.field.isOutOfCanvas(newHead)) {
            this.correctPosition(newHead)
        }
        if (this.isOnSamePosition(this.food.position, newHead)) {
            this.snake.grow()
            this.putNewFoodOnField()
        }
        this.snake.setHead(newHead)
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

    public isOnSamePosition(cellA: Cell, cellB: Cell): boolean {
        const [a_x, a_y] = cellA
        const [b_x, b_y] = cellB
        return a_x === b_x && a_y === b_y
    }

    getNextCell(cell: Cell, direction: string): Cell {
        let [x, y] = cell
        let newHead = null
        switch (direction) {
            case 'up':
                newHead = [x, --y]
                break
            case 'right':
                newHead = [++x, y]
                break
            case 'down':
                newHead = [x, ++y]
                break
            case 'left':
                newHead = [--x, y]
                break
            default:
                throw new Error('wrong direction!')
        }
        return newHead
    }

    turn(direction: string) {
        this.snake.turn(direction)
    }
}

export default GameNavigator
