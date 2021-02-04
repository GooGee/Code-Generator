import IKeyValue from "../Base/IKeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"
import Schema from "./Schema"
import { EncodingManager } from "./Encoding"
import { ReferenceManager, ReferenceType } from "./Reference"

export default class MediaType extends UniqueItem {
    readonly schema = new Schema('Schema')
    readonly exampleManager = new ReferenceManager(ReferenceType.examples)
    // readonly encodingManager = new EncodingManager

    toOAPI() {
        if (this.exampleManager.list.length > 0) {
            return {
                examples: this.exampleManager.toOAPI(),
                schema: this.schema.toOAPI(),
            }
        }
        return {
            schema: this.schema.toOAPI(),
        }
    }
}

export class MediaTypeManager extends UniqueList<MediaType> {

    constructor() {
        super(MediaType)
    }

    toOAPI() {
        const map: IKeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toOAPI()
        })
        return map
    }
}
