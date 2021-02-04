import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"

export default class Encoding extends UniqueItem {
    toOAPI() {
        return this
    }
}

export class EncodingManager extends UniqueList<Encoding> {

    constructor() {
        super(Encoding)
    }

    toOAPI() {
        return this.list
    }
}
