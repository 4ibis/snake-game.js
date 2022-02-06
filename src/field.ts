import { BaseFieldFigure, Cell, ColorString, Coordinates, Pixel, RenderingParams, Size } from './types'


export interface CanvasParams {
    size: Size
    cellSize: number
    gridColor: ColorString
    bgColor: ColorString
}

class Field {
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

    fillBackground(color: string): void {
        this.context.fillStyle = color
        this.context.fillRect(0, 0, this.height, this.width)
    }

    isOutOfCanvas([x, y]: Cell): boolean {
        const xIsOut = x < 0 || x > this.maxXCell
        const yIsOut = y < 0 || y > this.maxYCell
        return xIsOut || yIsOut
    }

    initBoundaries() {
        this.maxXCell = Math.floor((this.width - this.cellSize) / this.cellSize)
        this.maxYCell = Math.floor((this.height - this.cellSize) / this.cellSize)
    }

    getCoordinates(cell: Cell): Coordinates {
        let [x, y] = cell
        const result = [x * this.cellSize, y * this.cellSize]
        return result as Cell
    }

    clean(cell: Cell) {
        let coordinates = this.getCoordinates(cell)
        this.context.clearRect(...coordinates, this.cellSize, this.cellSize)
    }

    drawCell(cell: Cell, color: ColorString) {
        const [x, y] = cell
        const coordinates: Cell = [x * this.cellSize, y * this.cellSize]
        const size: Size = [this.cellSize, this.cellSize]
        const params: RenderingParams = [...coordinates, ...size]
        this.context.fillStyle = color
        this.context.fillRect(...params)
    }

    draw(figure: BaseFieldFigure) {
        figure.body.forEach(cell => this.drawCell(cell, figure.color))
    }

    drawLine(startPoint: Cell, endPoint: Cell) {
        this.context.moveTo(...startPoint)
        this.context.lineTo(...endPoint)
    }

    drawGrid() {
        const canvasEnd = Math.max(this.width, this.height)
        for (let i = 0.5; i <= canvasEnd; i += this.cellSize) {
            this.drawLine([i, 1], [i, this.height])
            this.drawLine([1, i], [this.width, i])
        }
        this.context.strokeStyle = this.gridColor
        this.context.stroke()
    }
}

export default Field