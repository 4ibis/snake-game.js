import { State } from './types'

export default class GameState {
    private _level: number = 1
    private _steps: number = 0
    private _speed: number = 500
    private speedStep: number = 25
    private foodCount: number = 0

    updateDashboard: (state: State) => void

    getState(): State {
        return {
            level: this._level,
            steps: this._steps,
            speed: this._speed,
            food: this.foodCount,
        }
    }

    foodEaten(foodCount: number): void {
        this.foodCount = foodCount
        this.updateDashboard(this.getState())
    }

    levelUp() {
        this._level++
        this.updateDashboard(this.getState())
    }

    stepsUp() {
        this._steps++
        this.updateDashboard(this.getState())
    }

    get speed() {
        return this._speed
    }

    public speedUp() {
        const newSpeed = this._speed - this.speedStep
        this._speed = newSpeed < 0 ? 0 : newSpeed
        this.updateDashboard(this.getState())
    }

    public speedDown(): void {
        this._speed = this._speed + this.speedStep
        this.updateDashboard(this.getState())
    }
}
