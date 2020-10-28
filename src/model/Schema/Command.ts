import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'
import { ArgumentManager } from './Argument'

export default class Command extends UniqueItem {
    original: boolean = true
    description: string = ''
    readonly argumentManager = new ArgumentManager()

    toString() {
        const list = this.argumentManager.list
            .filter(argument => argument.included)
            .map(argument => argument.name + ' ' + argument.value)
        return this.name + ' ' + list.join(' ')
    }
}

export class CommandManager extends UniqueList<Command> {
    constructor() {
        super(Command)
    }
}
