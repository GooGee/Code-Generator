import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'

export default class Option extends UniqueItem {
    included: boolean = true
    value: string = ''
    description: string = ''
}

export class OptionManager extends UniqueList<Option> {
    constructor() {
        super(Option)
    }
}
