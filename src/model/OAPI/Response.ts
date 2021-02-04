import { MediaTypeManager } from "./MediaType"
import { ReferenceManager, ReferenceType } from "./Reference"
import IKeyValue from "../Base/IKeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"

export default class Response extends UniqueItem {
    description: string = ''
    readonly headerManager = new ReferenceManager(ReferenceType.headers)
    readonly linkManager = new ReferenceManager(ReferenceType.links)
    readonly mediaTypeManager = new MediaTypeManager

    toOAPI() {
        return {
            description: this.description,
            headers: this.headerManager.toOAPI(),
            // links: this.linkManager.toOAPI(),
            content: this.mediaTypeManager.toOAPI(),
        }
    }
}

export class ResponseManager extends UniqueList<Response> {

    constructor() {
        super(Response)
    }

    toOAPI() {
        const map: IKeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toOAPI()
        })
        return map
    }
}
