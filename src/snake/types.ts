import { Cell } from '../share/types'

export type ColorString = string
export type Pixel = number

export type X = Pixel
export type Y = Pixel
export type Coordinates = [X, Y]

export type Width = number
export type Height = number
export type Size = [Width, Height]

export type FigureBody = Cell[]

export interface BaseFieldFigure {
    body: FigureBody
    colorBody: ColorString
}

export type Controls = {
    speedUp: HTMLElement
    speedDown: HTMLElement
}

export type DashboardView = {
    speed: HTMLElement
    level: HTMLElement
    steps: HTMLElement
    food: HTMLElement
}

export type State = {
    level: number
    speed: number
    steps: number
    food: number
}

export type Callbacks = {
    onEat: (countFood: number) => void
    onDie: () => void
}
