import IKeyValue from "../Base/IKeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"
import Reference, { ReferenceType } from "./Reference"
import { DataType, isComposition, isPrimitive } from "./DataType"
import Discriminator from "./Discriminator"
import XML from "./XML"
import { NameValueManager } from "./NameValue"

export default class Schema extends UniqueItem {
    // deprecated: boolean = false
    // nullable: boolean = false
    // readOnly: boolean = false
    // writeOnly: boolean = false

    type: DataType = DataType.string
    format: string = ''
    example: string = ''
    itemType: DataType = DataType.string
    required: Boolean = true

    // readonly discriminator = new Discriminator
    readonly operationManager = new NameValueManager()
    readonly reference = new Reference('', ReferenceType.schemas)
    readonly schemaManager = new SchemaManager
    // readonly xml = new XML

    get isComposition() {
        return isComposition(this.type)
    }

    get isItemReference() {
        return this.itemType === DataType.reference
    }

    get isPrimitive() {
        return isPrimitive(this.type)
    }

    toOAPI(): IKeyValue {
        if (this.type === DataType.reference) {
            return this.reference.toOAPI()
        }

        if (this.type === DataType.array) {
            if (this.isItemReference) {
                return {
                    type: this.type,
                    items: this.reference.toOAPI()
                }
            }
            return {
                type: this.type,
                items: {
                    type: this.itemType
                }
            }
        }

        if (this.isComposition) {
            const list = this.schemaManager.list.map(item => item.toOAPI())
            const data: IKeyValue = {}
            data[this.type] = list
            return data
        }

        if (this.type === DataType.object) {
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

        return {
            type: this.type
        }
    }
}

export class SchemaManager extends UniqueList<Schema> {

    constructor() {
        super(Schema)
    }

    toOAPI() {
        const map: IKeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toOAPI()
        })
        return map
    }
}
