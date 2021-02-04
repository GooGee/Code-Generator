import IKeyValue from "../Base/IKeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"

export default class Link extends UniqueItem {
    toOAPI() {
        return this
    }
}

export class LinkManager extends UniqueList<Link> {

    constructor() {
        super(Link)
    }

    toOAPI() {
        const map: IKeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toOAPI()
        })
        return map
    }
}
