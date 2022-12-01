import { CANVAS_PARAMS } from '../share/constant'
import { Coordinates } from '../snake/types'
import Field from '../share/field'
import { CellCoords } from '../share/types'

export default class PixelGame {
    field: Field
    currentColor: string = '#000000'

    constructor(private canvas: HTMLCanvasElement) {
        this.field = new Field(canvas.getContext('2d', { willReadFrequently: true }), CANVAS_PARAMS)
    }

    private clickToCell(event: MouseEvent): CellCoords {
        const clickCoordinates: Coordinates = [event.offsetX, event.offsetY]
        const cell = this.field.getCellCoordsFromPixels(clickCoordinates)
        return cell
    }

    handleClick(event: MouseEvent): void {
        const color = event.shiftKey ? CANVAS_PARAMS.bgColor : this.currentColor
        const cell = this.clickToCell(event)
        this.field.drawFigure({ body: [{ coords: cell, color }], colorBody: color })
    }

    chooseColor(event: MouseEvent) {
        this.currentColor = (event.target as HTMLElement).dataset.color
        const color: HTMLElement = document.querySelector('.current-color')!
        color.style.backgroundColor = this.currentColor
    }

    handleDraw(event: Event) {
        console.log(event)
    }

    saveImage() {
        const imageURL = this.canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.download = 'pixel.png'
        a.href = imageURL
        a.click()
    }
}
