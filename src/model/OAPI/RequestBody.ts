import IKeyValue from "../Base/IKeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"
import { MediaTypeManager } from "./MediaType"

export default class RequestBody extends UniqueItem {
    required: boolean = true
    description: string = ''
    readonly mediaTypeManager = new MediaTypeManager

    toOAPI() {
        return {
            required: this.required,
            description: this.description,
            content: this.mediaTypeManager.toOAPI(),
        }
    }
}

export class RequestBodyManager extends UniqueList<RequestBody> {

    constructor() {
        super(RequestBody)
    }

    toOAPI() {
        const map: IKeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toOAPI()
        })
        return map
    }
}
