import { ActionEnum } from './ActionEnum'

export default class Payload {
    constructor(public action: ActionEnum, public key: string, public data: string) { }

    static make(action: ActionEnum, key: string, data: string) {
        return new Payload(action, key, data)
    }

}
