import { MediaTypeManager } from "./MediaType"
import OAPIItem from './OAPIItem'
import OAPIManager from './OAPIManager'

export default class RequestBody extends OAPIItem {
    color: string = ''
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

export class RequestBodyManager extends OAPIManager<RequestBody> {

    constructor() {
        super(RequestBody)
    }
}
