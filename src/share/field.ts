import { BaseFieldFigure, Coordinates, Pixel, Size } from '../snake/types'

import { CanvasParams, Cell, CellCoords } from '../share/types'

export default class Field {
    width: Pixel
    height: Pixel
    cellSize: number
    context: CanvasRenderingContext2D
    gridColor: string
    maxXCell: number
    maxYCell: number

    constructor(context: CanvasRenderingContext2D, params: CanvasParams) {
        const [width, height] = params.size
        this.width = width
        this.height = height
        this.context = context
        this.cellSize = params.cellSize
        this.gridColor = params.gridColor
        this.initBoundaries()
        this.fillBackground(params.bgColor)
        this.drawGrid()
    }

    pickColor([x, y]: CellCoords): Uint8ClampedArray {
        const image = this.context.getImageData(x, y, 1, 1)
        console.log('image', image)
        return image.data
    }

    private fillBackground(color: string): void {
        this.context.fillStyle = color
        this.context.fillRect(0, 0, this.height, this.width)
    }

    public isOutOfCanvas([x, y]: CellCoords): boolean {
        const xIsOut = x < 0 || x > this.maxXCell
        const yIsOut = y < 0 || y > this.maxYCell
        return xIsOut || yIsOut
    }

    private initBoundaries() {
        this.maxXCell = Math.floor((this.width - this.cellSize) / this.cellSize)
        this.maxYCell = Math.floor((this.height - this.cellSize) / this.cellSize)
    }

    getCellCoordsFromPixels([clickX, clickY]: Coordinates): CellCoords {
        const cellX = Math.floor(clickX / this.cellSize)
        const cellY = Math.floor(clickY / this.cellSize)
        return [cellX, cellY]
    }

    getCoordinates(cell: CellCoords): Coordinates {
        const [x, y] = cell
        return [x * this.cellSize, y * this.cellSize] as Coordinates
    }

    clean(cell: CellCoords) {
        const coordinates = this.getCoordinates(cell)
        this.context.clearRect(...coordinates, this.cellSize, this.cellSize)
    }

    private drawCell(cell: Cell) {
        const coordinates = this.getCoordinates(cell.coords)
        const size: Size = [this.cellSize, this.cellSize]
        this.context.fillStyle = cell.color
        this.context.fillRect(...coordinates, ...size)
    }

    drawFigure(figure: BaseFieldFigure) {
        const b = figure.body
        const lastIndex = b.length - 1
        // draw from end to start
        for (let i = lastIndex; i >= 0; i--) {
            console.log(i)
            this.drawCell(b[i])
        }
        this.drawGrid()
        this.context.save()
    }

    private drawLine(startPoint: CellCoords, endPoint: CellCoords) {
        this.context.moveTo(...startPoint)
        this.context.lineTo(...endPoint)
    }

    drawGrid() {
        const canvasEnd = Math.max(this.width, this.height)
        for (let i = 0.5; i <= canvasEnd; i += this.cellSize) {
            this.drawLine([i, 1], [i, this.height])
            this.drawLine([1, i], [this.width, i])
        }
        this.context.stroke()
    }
}
