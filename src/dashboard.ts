import { DashboardView, State } from './types'

export default class Dashboard {
    constructor(private dashboard: DashboardView, private stateGetter: () => State) {}

    update(state: State = this.stateGetter()) {
        for (const [key, value] of Object.entries(state)) {
            this.dashboard[key].innerText = value.toString()
        }
    }

    updateSpeedView() {
        const state = this.stateGetter()
        const speedValue = 1000 / state.speed
        this.dashboard.speed.innerText = speedValue.toFixed(1)
    }

    updateSteps() {
        this.dashboard.steps.innerText = this.stateGetter().steps.toString()
    }
}
