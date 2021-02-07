import Discriminator from "./Discriminator"
import XML from "./XML"
import OAPIItem from './OAPIItem'

export default abstract class Schema extends OAPIItem {
    deprecated: boolean = false
    nullable: boolean = false
    readOnly: boolean = false
    required: Boolean = true
    writeOnly: boolean = false

    color: string = ''
    example: string = ''
    format: string = ''

    // readonly discriminator = new Discriminator
    // readonly xml = new XML

}
