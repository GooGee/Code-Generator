import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'
import { PropertyManager } from './Property'

export default class Preset extends UniqueItem {
    original: boolean = false
    color: string = ''
    description: string = ''
    version: number = 1
    readonly propertyManager = new PropertyManager()
}

export class PresetManager extends UniqueList<Preset> {
    constructor() {
        super(Preset)
    }
}
