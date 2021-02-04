import IKeyValue from "../Base/IKeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"
import Reference, { ReferenceType } from "./Reference"

export default class Status extends UniqueItem {
    readonly response = new Reference('', ReferenceType.responses)

    toOAPI() {
        return this.response.toOAPI()
    }
}

export class StatusManager extends UniqueList<Status> {

    constructor() {
        super(Status)
    }

    toOAPI() {
        const map: IKeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toOAPI()
        })
        return map
    }
}
