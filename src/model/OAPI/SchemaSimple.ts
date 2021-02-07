import IKeyValue from '../Base/IKeyValue'
import OAPIManager from './OAPIManager'
import Reference, { ReferenceType } from './Reference'
import Schema from './Schema'
import { SimpleType } from './DataType'

export default class SchemaSimple extends Schema {
    type: SimpleType = SimpleType.string

    readonly reference = new Reference('', ReferenceType.schemas)

    makeData() {
        if (this.type === SimpleType.reference) {
            return this.reference.toOAPI()
        }

        const data: IKeyValue = {
            type: this.type,
        }
        if (this.example) {
            data.example = this.example
        }
        if (this.format) {
            data.format = this.format
        }
        return data
    }
}

export class SchemaSimpleManager extends OAPIManager<SchemaSimple> {

    constructor() {
        super(SchemaSimple)
    }
}
