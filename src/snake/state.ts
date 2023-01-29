import { EVENT, IEventEmitter } from '../share/event'
import { State } from './types'

export default class GameState {
    private _level: number = 1
    private _steps: number = 0
    private _speed: number = 500
    private speedStep: number = 25
    private foodCount: number = 0

    constructor(private events: IEventEmitter) {
        this.events.on(EVENT.onEat, (foodCount: number) => this.setFoodCount(foodCount))
    }

    updateDashboard: (state: State) => void

    get state(): State {
        return {
            level: this._level,
            steps: this._steps,
            speed: this._speed,
            food: this.foodCount,
        }
    }

    private setFoodCount(foodCount: number): void {
        this.foodCount = foodCount
    }

    levelUp() {
        this._level++
        this.events.emit(EVENT.onLevelUp, this._level)
    }

    get speed() {
        return this._speed
    }

    public speedUp() {
        const newSpeed = this._speed - this.speedStep
        this._speed = newSpeed < 0 ? 0 : newSpeed
        this.events.emit(EVENT.onSpeedChange, this.speed)
    }

    public speedDown(): void {
        this._speed = this._speed + this.speedStep
        this.events.emit(EVENT.onSpeedChange, this.speed)
    }
}
