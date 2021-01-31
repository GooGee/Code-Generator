import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'
import { OptionManager } from './Option'

export default class Artisan extends UniqueItem {
    original: boolean = true
    color: string = ''
    description: string = ''
    value: string = ''
    readonly optionManager = new OptionManager()

    toString() {
        const list = this.optionManager.list
            .filter(option => option.included)
            .map(option => option.name + ' ' + option.value)
        return this.name + ' ' + this.value + ' ' + list.join(' ')
    }
}

export class ArtisanManager extends UniqueList<Artisan> {
    constructor() {
        super(Artisan)
    }
}
