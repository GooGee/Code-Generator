import OAPIItem from './OAPIItem'
import OAPIManager from "./OAPIManager"

export default class Example extends OAPIItem {
    color: string = ''
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

export class ExampleManager extends OAPIManager<Example> {

    constructor() {
        super(Example)
    }
}
