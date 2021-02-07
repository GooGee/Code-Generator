import { MediaTypeManager } from "./MediaType"
import OAPIItem from './OAPIItem'
import OAPIManager from './OAPIManager'
import { ReferenceManager, ReferenceType } from "./Reference"

export default class Response extends OAPIItem {
    color: string = ''
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

export class ResponseManager extends OAPIManager<Response> {

    constructor() {
        super(Response)
    }

}
