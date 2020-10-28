import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'

export default class Argument extends UniqueItem {
    included: boolean = true
    value: string = ''
    description: string = ''
}

export class ArgumentManager extends UniqueList<Argument> {
    constructor() {
        super(Argument)
    }
}
