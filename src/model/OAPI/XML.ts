import Item from "../Base/Item"

export default class XML extends Item {
    namespace: string = ''
    prefix: string = ''
    attribute: boolean = false
    wrapped: boolean = false

    toOAPI() {
        return this
    }
}
