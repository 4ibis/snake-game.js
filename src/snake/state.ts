import { EVENT, IEventEmitter } from '../share/event'
import { State } from './types'

export default class GameState {
    private level: number = 1
    private steps: number = 0
    private speed_: number = 500
    private speedStep: number = 10
    private foodCount: number = 0

    constructor(private events: IEventEmitter) {
        this.events.on(EVENT.onEat, (foodCount: number) => this.setFoodCount(foodCount))
    }

    get state(): State {
        return {
            level: this.level,
            steps: this.steps,
            speed: this.speed_,
            food: this.foodCount,
        }
    }

    private setFoodCount(foodCount: number): void {
        this.foodCount = foodCount
    }

    public checkUpdateLevel() {
        // increase level every 3 food
        if (this.foodCount % 3 === 0) {
            this.levelUp()
        }
    }

    levelUp() {
        this.level++
        this.speedUp()
        this.events.emit(EVENT.onLevelUp, this.level)
    }

    get speed() {
        return this.speed_
    }

    public speedUp() {
        const newSpeed = this.speed_ - this.speedStep
        this.speed_ = newSpeed < 0 ? 0 : newSpeed
        this.events.emit(EVENT.onSpeedChange, this.speed)
    }

    public speedDown() {
        this.speed_ = this.speed_ + this.speedStep
        this.events.emit(EVENT.onSpeedChange, this.speed)
    }
}
