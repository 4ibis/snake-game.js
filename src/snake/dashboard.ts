import { EVENT, IEventEmitter } from '../share/event'
import { DashboardView, State } from './types'

export default class Dashboard {
    constructor(private dashboard: DashboardView, private events: IEventEmitter) {
        this.events.on(EVENT.onStateUpdate, (state: State) => this.update(state))
    }

    update(state: State) {
        for (const [key, value] of Object.entries(state)) {
            if (key === 'speed') {
                this.updateSpeedView(value)
                continue
            }
            this.dashboard[key].innerText = value.toString()
        }
    }

    updateSpeedView(newSpeed: number) {
        const speedValue = 1000 / newSpeed
        this.dashboard.speed.innerText = speedValue.toFixed(1)
    }

    showGameOver() {
        // this.dashboard.
    }
}
