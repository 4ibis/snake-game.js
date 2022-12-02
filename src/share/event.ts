interface EventCallback {
    (data: unknown): unknown
}

export const enum EVENT {
    onStart = 'onStart',
    onStop = 'onStop',
    onDie = 'onDie',
    onEat = 'onEat',
    onStateUpdate = 'onStateUpdate',
    onLevelUp = 'onLevelUp',
    onSpeedChange = 'onSpeedChange',
}

type Events = Map<EVENT, EventCallback[]>

export class EventEmitter {
    events: Events = new Map()

    /**
     * subscribe method
     */
    on(event: EVENT, listener: EventCallback) {
        if (!this.events.get(event)) {
            this.events.set(event, [])
        }
        this.events.get(event).push(listener)
    }

    /**
     * unsubscribe method
     */
    off(event: EVENT, listener: EventCallback): EventCallback | null {
        //
        // todo: tests for this method

        const callbacks = this.getCallbacks(event)
        const callbackIndex = callbacks.indexOf(listener)
        let removedCallback = null
        if (callbackIndex > -1) {
            removedCallback = callbacks.splice(callbackIndex, 1)
        }
        return removedCallback
    }

    emit(event: EVENT, data?: unknown) {
        const callbacks = this.getCallbacks(event)
        callbacks.forEach((listener: EventCallback) => {
            listener(data)
        })
    }

    private getCallbacks(event: EVENT): EventCallback[] {
        const isEvent = this.events.has(event)
        if (!isEvent) {
            console.info(`There is no Callbacks for Event "${event}"`)
            return []
        }
        return this.events.get(event)
    }

    destroy() {
        this.events.clear()
    }
}
