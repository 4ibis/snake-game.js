import { Cell, CellCoords } from '../share/types'
import { BaseFieldFigure, ColorString } from './types'

class Food implements BaseFieldFigure {
    body: Cell[]
    colorBody: ColorString = 'red'

    constructor(foodCell: Cell) {
        this.body = [foodCell]
    }

    get position(): CellCoords {
        return this.body[0].coords
    }

    set position(coords: CellCoords) {
        const cell: Cell = { coords, color: this.colorBody }
        this.body = [cell]
    }
}

export default Food
