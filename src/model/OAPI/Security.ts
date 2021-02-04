import IKeyValue from '../Base/IKeyValue'
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"

export default class Security extends UniqueItem {
    readonly valueManager = new UniqueList(UniqueItem)

    toOAPI() {
        const map: IKeyValue = {}
        map[this.name] = this.valueManager.list.map(value => value.name)
        return map
    }
}

export class SecurityManager extends UniqueList<Security> {

    constructor() {
        super(Security)
    }

    toOAPI() {
        return this.list.map(tag => tag.toOAPI())
    }
}
