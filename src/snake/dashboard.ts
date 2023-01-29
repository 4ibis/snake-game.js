import { DashboardView, State } from './types'

export default class Dashboard {
    constructor(private dashboardView: DashboardView) {}

    update(state: State) {
        for (const [key, value] of Object.entries(state)) {
            if (key === 'speed') {
                this.updateSpeedView(value)
                continue
            }
            this.dashboardView[key].innerText = value.toString()
        }
    }

    private updateSpeedView(newSpeed: number) {
        const speedValue = 1000 / newSpeed
        this.dashboardView.speed.innerText = speedValue.toFixed(1)
    }

    showGameOver() {
        // todo: show game over popup
    }
}
