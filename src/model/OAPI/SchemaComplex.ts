import { ComplexType } from './DataType'
import IKeyValue from '../Base/IKeyValue'
import OAPIManager from './OAPIManager'
import Schema from './Schema'
import { SchemaSimpleManager } from './SchemaSimple'

export default class SchemaComplex extends Schema {
    type: ComplexType = ComplexType.object
    readonly schemaManager = new SchemaSimpleManager

    toOAPI() {
        if (this.type === ComplexType.object) {
            const data: IKeyValue = {
                type: this.type,
                properties: this.schemaManager.toOAPI()
            }
            const list = this.schemaManager.list.filter(one => one.required).map(one => one.name)
            if (list.length) {
                data.required = list
            }
            if (this.example) {
                data.example = this.example
            }
            return data
        }

        const list = this.schemaManager.list.map(item => item.toOAPI())
        const data: IKeyValue = {}
        data[this.type] = list
        return data
    }
}

export class SchemaManager extends OAPIManager<SchemaComplex> {

    constructor() {
        super(SchemaComplex)
    }
}
