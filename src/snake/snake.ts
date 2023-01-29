import { Cell, CellCoords } from '../share/types'
import { DIRECTIONS, SNAKE_COLORS } from './constant'
import { BaseFieldFigure, ColorString, FigureBody } from './types'

class Snake implements BaseFieldFigure {
    body: FigureBody
    isGrowing: boolean = false
    direction: string = DIRECTIONS.up
    colorBody: ColorString = SNAKE_COLORS.body
    colorHead: ColorString = SNAKE_COLORS.head
    foodInside: number = 0

    constructor(body: Cell[]) {
        this.body = body
    }

    getHead(): Cell {
        return this.body[0]
    }

    setHead(coords: CellCoords) {
        const head = { coords, color: this.colorHead }
        this.body.unshift(head)
        this.body[1].color = this.colorBody
    }

    popTail(): Cell {
        return this.body.pop()
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

    private turnUp(): void {
        if (this.direction !== DIRECTIONS.down) {
            this.direction = DIRECTIONS.up
        }
    }

    private turnRight(): void {
        if (this.direction !== DIRECTIONS.left) {
            this.direction = DIRECTIONS.right
        }
    }

    private turnDown(): void {
        if (this.direction !== DIRECTIONS.up) {
            this.direction = DIRECTIONS.down
        }
    }

    private turnLeft(): void {
        if (this.direction !== DIRECTIONS.right) {
            this.direction = DIRECTIONS.left
        }
    }
}

export default Snake
