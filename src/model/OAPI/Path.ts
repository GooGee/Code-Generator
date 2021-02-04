import IKeyValue from '../Base/IKeyValue'
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"
import { OperationManager } from "./Operation"

export default class Path extends UniqueItem {
    readonly operationManager = new OperationManager(this)

    toOAPI() {
        return this.operationManager.toOAPI()
    }
}

export class PathManager extends UniqueList<Path> {

    constructor() {
        super(Path)
    }

    toOAPI() {
        const map: IKeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toOAPI()
        })
        return map
    }
}
