import Game from '../src/game'

beforeEach(() => {
    document.body.innerHTML = `
        <div>
            <canvas id="canvas"></canvas>
            <section class="speed">
                <p>Скорость: <span class="current-speed"></span></p>
            </section>
        </div>
    `
})

test('game NOT Finished!!', () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    const speedView = document.querySelector('.current-speed') as HTMLElement
    const game = new Game(canvas, speedView, 500)
    expect(game.speed).toBe(500)
})
