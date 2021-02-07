import IKeyValue from '../Base/IKeyValue'
import OAPIManager from './OAPIManager'
import Reference, { ReferenceType } from './Reference'
import Schema from './Schema'
import { SimpleType } from './DataType'

export default class SchemaSimple extends Schema {
    itemType: SimpleType = SimpleType.string
    type: SimpleType = SimpleType.string

    readonly reference = new Reference('', ReferenceType.schemas)

    get isItemReference() {
        return this.itemType === SimpleType.reference
    }

    toOAPI() {
        if (this.type === SimpleType.reference) {
            return this.reference.toOAPI()
        }

        const data: IKeyValue = {
            required: this.required,
            type: this.type,
        }
        if (this.example) {
            data.example = this.example
        }
        if (this.type === SimpleType.array) {
            if (this.isItemReference) {
                data.items = this.reference.toOAPI()
            } else {
                data.items = {
                    type: this.itemType,
                }
                if (this.format) {
                    data.items.format = this.format
                }
            }
        } else {
            if (this.format) {
                data.format = this.format
            }
        }
        return data
    }
}

export class SchemaSimpleManager extends OAPIManager<SchemaSimple> {

    constructor() {
        super(SchemaSimple)
    }
}
