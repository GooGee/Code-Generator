import IKeyValue from '../Base/IKeyValue'
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"

export default class ServerVariable extends UniqueItem {
    default: string = ''
    description: string = ''
    readonly valueManager = new UniqueList(UniqueItem)

    toOAPI() {
        if (this.valueManager.list.length) {
            const list = this.valueManager.list.map(value => value.name)
            return {
                default: this.default,
                description: this.description,
                enum: list,
            }
        }

        return {
            default: this.default,
            description: this.description,
        }
    }
}

export class ServerVariableManager extends UniqueList<ServerVariable> {

    constructor() {
        super(ServerVariable)
    }

    toOAPI() {
        const map: IKeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toOAPI()
        })
        return map
    }
}
