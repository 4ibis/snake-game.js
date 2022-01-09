import { Cell } from './types'
import Snake from './snake'
import Canvas from './canvas'

class GameNavigator {

    constructor(
        private snake: Snake,
        private canvas: Canvas
    ) {
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

}

export default GameNavigator