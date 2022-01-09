import Canvas, { CanvasParams } from './canvas'

class Initiator {

    static prepareCanvas(params: CanvasParams): Canvas {
        return new Canvas(params)
    }
}

export default Initiator