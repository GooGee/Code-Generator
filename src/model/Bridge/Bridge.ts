import HandlerManager from './HandlerManager'
import IResponse from './IResponse'

export default class Bridge {
    readonly manager: HandlerManager

    constructor(manager: HandlerManager) {
        this.manager = manager
    }

    call(response: IResponse) {
        if ('string' === typeof response) {
            response = JSON.parse(response)
        }
        console.log(`${response.status} ${response.action} ${response.key} ${response.message}`)
        const handler = this.manager.find(response.action, response.key)
        if (handler) {
            handler(response)
        } else {
            console.error('No handler')
        }
    }

    error(code: number, message: string) {
        console.log(`${code} ${message}`)
        alert(message)
    }

}
