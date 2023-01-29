import { Cell, CellCoords } from '../share/types'
import Snake from './snake'
import Field from '../share/field'
import Food from './food'
import { FOOD_COLOR } from './constant'
import { EVENT, IEventEmitter } from '../share/event'

class GameNavigator {
    private food: Food

    constructor(private snake: Snake, private field: Field, private events: IEventEmitter) {
        this.drawSnake()
        this.putNewFoodOnField()
    }

    public reDraw() {
        this.drawSnake()
    }

    private drawSnake() {
        this.field.drawFigure(this.snake)
        this.field.drawGrid()
    }

    private getNewFood(): Food {
        let coords: CellCoords
        do {
            coords = this.createRandomCell()
        } while (this.isCellUnderSnake(coords))
        return new Food({ coords, color: FOOD_COLOR })
    }

    private isCellUnderSnake(cell: CellCoords): boolean {
        const check = (cellOfSnake: Cell) => this.isOnSamePosition(cell, cellOfSnake.coords)
        return this.snake.body.some(check)
    }

    private getRandomNumber(min: number, max: number): number {
        const randomFloat = Math.random() * (min - max) + max
        return Math.floor(randomFloat)
    }

    private createRandomCell(): CellCoords {
        const x = this.getRandomNumber(0, this.field.maxXCell)
        const y = this.getRandomNumber(0, this.field.maxYCell)
        return [x, y]
    }

    private putNewFoodOnField(): void {
        this.food = this.getNewFood()
        this.field.drawFigure(this.food)
    }

    public move() {
        const newHeadCoords = this.getNextCellCoords(
            this.snake.getHead().coords,
            this.snake.direction
        )
        if (this.isCellUnderSnake(newHeadCoords)) {
            this.events.emit(EVENT.onDie)
            return
        }
        this.moveHeadForward(newHeadCoords)
        this.moveTail()
    }

    private moveHeadForward(newHeadCoords: CellCoords) {
        if (this.field.isOutOfCanvas(newHeadCoords)) {
            this.correctPosition(newHeadCoords)
        }
        // eat food
        if (this.isOnSamePosition(this.food.position, newHeadCoords)) {
            this.snake.isGrowing = true
            this.events.emit(EVENT.onEat, ++this.snake.foodInside)
            this.putNewFoodOnField()
        }
        this.snake.setHead(newHeadCoords)
    }

    private moveTail(): void {
        if (!this.snake.isGrowing) {
            this.field.clean(this.snake.popTail().coords)
        }
        this.snake.isGrowing = false
    }

    /**
     *  moves cell to opposite side if it is out of canvas
     */
    private correctPosition(cell: CellCoords): void {
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

    private isOnSamePosition(cellA: CellCoords, cellB: CellCoords): boolean {
        const [a_x, a_y] = cellA
        const [b_x, b_y] = cellB
        return a_x === b_x && a_y === b_y
    }

    private getNextCellCoords(cell: CellCoords, direction: string): CellCoords {
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

    public turn(direction: string) {
        this.snake.turn(direction)
    }
}

export default GameNavigator
