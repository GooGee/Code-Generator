import Item from "../Base/Item"
import { NameValueManager } from "./NameValue"

export default class Discriminator extends Item {
    name: string = ''
    readonly manager = new NameValueManager()

    toOAPI() {
        return {
            propertyName: this.name,
            mapping: this.manager.toOAPI()
        }
    }
}
