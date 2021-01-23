import { ActionEnum } from './ActionEnum'
import HandlerManager from './HandlerManager'
import ICEFW from './ICEFW'
import IHandler from './IHandler'
import Payload from './Payload'

export default class ToJava {
    readonly manager: HandlerManager
    readonly window: ICEFW

    constructor(window: ICEFW, manager: HandlerManager) {
        this.window = window
        this.manager = manager
    }

    send(action: ActionEnum, key: string, data: string, handler?: IHandler) {
        const payload = Payload.make(action, key, data)
        this.manager.add(action, key, handler)
        const text = JSON.stringify(payload)
        this.window.JavaBridge.call(text)
    }

}
