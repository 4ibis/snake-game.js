import { DIRECTIONS } from './constant'
import { BaseFieldFigure, Cell, FigureBody } from './types'

class Snake implements BaseFieldFigure {
    body: FigureBody

    direction: string = DIRECTIONS.up
    color = 'green'

    constructor(body: Cell[]) {
        this.body = body
    }

    getHead(): Cell {
        return this.body[0]
    }

    setHead(head: Cell) {
        this.body.unshift(head)
    }

    popTail(): Cell {
        return this.body.pop()
    }

    grow(): void {
        const [cell] = this.body
        this.body.unshift(cell)
    }

    get size(): number {
        return this.body.length
    }

    turn(direction: string): void {
        switch (direction) {
            case 'Up':
                this.turnUp()
                break
            case 'Right':
                this.turnRight()
                break
            case 'Down':
                this.turnDown()
                break
            case 'Left':
                this.turnLeft()
                break
            default:
                throw new Error('Wrong direction')
        }
    }

    turnUp(): void {
        if (this.direction !== DIRECTIONS.down) {
            this.direction = DIRECTIONS.up
        }
    }

    turnRight(): void {
        if (this.direction !== DIRECTIONS.left) {
            this.direction = DIRECTIONS.right
        }
    }

    turnDown(): void {
        if (this.direction !== DIRECTIONS.up) {
            this.direction = DIRECTIONS.down
        }
    }

    turnLeft(): void {
        if (this.direction !== DIRECTIONS.right) {
            this.direction = DIRECTIONS.left
        }
    }
}

export default Snake
