import { BaseFieldFigure, Cell, ColorString } from './types'

class Food implements BaseFieldFigure {
    body: Cell[]
    color: ColorString = 'red'

    constructor(foodCell: Cell) {
        this.body = [foodCell]
    }

    get position(): Cell {
        return this.body[0]
    }

    set position(cell: Cell) {
        this.body = [cell]
    }
}

export default Food
