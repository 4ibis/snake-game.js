import { arrowsKeys } from './src/constant'
import Game from './src/game'

const game = new Game(getSpeed())

document.addEventListener('keydown', handleKeyDown)
document.querySelector('.startStop').addEventListener('click', () => toggleStartStop())
document.getElementById('speed').addEventListener('change', () => game.changeSpeed(getSpeed()))

function getSpeed() {
    const speedString = document.querySelector('#speed input:checked').value
    return parseInt(speedString)
}

function handleKeyDown(event) {
    const keyCode = event.code
    if (keyCode === 'Space') {
        toggleStartStop()
    } else if (arrowsKeys.includes(keyCode)) {
        let direction = keyCode.replace('Arrow', '')
        // call method
        game.snake[`turn${direction}`]()
    }
}

function toggleStartStop() {
    game.isRunning ? game.stop() : game.start()
}
