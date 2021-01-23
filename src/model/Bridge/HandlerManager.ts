import { ActionEnum } from './ActionEnum'
import IHandler from './IHandler'
import IResponse from './IResponse'

const CallBack = (data: IResponse) => {
    console.log(`Empty handler ${data.action} ${data.key}`)
}

export default class HandlerManager {
    readonly map = new Map<ActionEnum, Map<string, IHandler>>()

    constructor() {
        Object.values(ActionEnum).forEach(key => {
            this.make(key)
        })
    }

    make(action: ActionEnum) {
        if (this.map.has(action)) {
            return
        }
        this.map.set(action, new Map<string, IHandler>())
    }

    add(action: ActionEnum, key: string, handler: IHandler = CallBack) {
        const map = this.map.get(action)
        if (map) {
            map.set(key, handler)
        }
    }

    find(action: ActionEnum, key: string) {
        if (this.map.has(action)) {
            const map = this.map.get(action)
            if (map) {
                return map.get(key)
            }
        }
        return undefined
    }

}
