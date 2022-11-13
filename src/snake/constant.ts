import { Controls, DashboardView } from './types'

export const DIRECTIONS = {
    up: 'up',
    right: 'right',
    down: 'down',
    left: 'left',
}

export const ARROW_KEYS = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft']
export const INCREASE_KEYS = ['NumpadAdd', 'Equal', 'BracketRight']
export const DECREASE_KEYS = ['NumpadSubtract', 'Minus', 'BracketLeft']
export const PLAY_PAUSE_KEYS = ['Space', 'KeyP']

export const SPEED_MAP = {
    '1': 1000,
    '2': 750,
    '3': 500,
    '4': 250,
    '5': 100,
}

export const DASHBOARD_SELECTORS: Record<keyof DashboardView, string> = {
    speed: '.current-speed',
    level: '.level-view',
    steps: '.steps-view',
    food: '.debug .food-view',
}

export const CONTROLS_SELECTORS: Record<keyof Controls, string> = {
    speedUp: '.speed-up',
    speedDown: '.speed-down',
}
