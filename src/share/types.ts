export interface CanvasParams {
    selector: string
    size: [number, number]
    cellSize: number
    gridColor: string
    bgColor: string
}

export type colorAsArr = [number, number, number, number]

export type CellCoords = [number, number]

export type Cell = {
    coords: CellCoords
    color: string
}
