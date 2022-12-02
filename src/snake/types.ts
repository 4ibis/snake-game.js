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

export type Controls<T = HTMLElement> = {
    speedUp: T
    speedDown: T
}

export type DashboardView<T = HTMLElement> = {
    speed: T
    level: T
    steps: T
    food: T
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
