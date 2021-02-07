import Discriminator from "./Discriminator"
import IKeyValue from '../Base/IKeyValue'
import OAPIItem from './OAPIItem'
import XML from "./XML"

export default abstract class Schema extends OAPIItem {
    deprecated: boolean = false
    isArray: boolean = false
    nullable: boolean = false
    readOnly: boolean = false
    required: Boolean = true
    writeOnly: boolean = false

    color: string = ''
    example: string = ''
    format: string = ''

    // readonly discriminator = new Discriminator
    // readonly xml = new XML

    makeArray() {
        const data: IKeyValue = {
            required: this.required,
            type: 'array',
            items: this.makeData()
        }
        return data
    }

    abstract makeData(): IKeyValue

    toOAPI() {
        if (this.isArray) {
            return this.makeArray()
        }

        const data = this.makeData()
        data.required = this.required
        return data
    }

}
