import IKeyValue from "../Base/IKeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"

export default class Example extends UniqueItem {
    description: string = ''
    externalValue: string = ''
    summary: string = ''
    value: string = ''

    toOAPI() {
        return {
            description: this.description,
            externalValue: this.externalValue,
            summary: this.summary,
            value: this.value,
        }
    }
}

export class ExampleManager extends UniqueList<Example> {

    constructor() {
        super(Example)
    }

    toOAPI() {
        const map: IKeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toOAPI()
        })
        return map
    }
}
