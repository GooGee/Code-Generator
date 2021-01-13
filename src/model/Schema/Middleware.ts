import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'

export default class Middleware extends UniqueItem {
}

export class MiddlewareManager extends UniqueList<Middleware> {
    constructor() {
        super(Middleware)
    }
}
