export type ColorString = string
export type Pixel = number

export type X = Pixel
export type Y = Pixel
export type Coordinates = [X, Y]

export type CellsX = number
export type CellsY = number
export type Cell = [CellsX, CellsY]

export type Width = number
export type Height = number
export type Size = [Width, Height]

export type RenderingParams = [X, Y, Width, Height]

export type FigureBody = Cell[]

export interface BaseFieldFigure {
    body: FigureBody
    color: ColorString
}
