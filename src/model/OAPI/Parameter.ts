import IKeyValue from "../Base/IKeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"
import Schema from "./Schema"

export enum Location {
    cookie = 'cookie',
    header = 'header',
    path = 'path',
    query = 'query',
}

export default class Parameter extends UniqueItem {
    allowEmptyValue: boolean = false
    deprecated: boolean = false
    description: string = ''
    example: string = ''
    location: Location
    name2: string = ''
    required: boolean = true
    readonly schema = new Schema(this.name)

    constructor(name: string, location: Location = Location.cookie) {
        super(name)
        this.name2 = name
        this.location = location
    }

    toOAPI(location: Location) {
        if (location === Location.header) {
            return {
                required: this.required,
                description: this.description,
                schema: this.schema.toOAPI()
            }
        }

        return {
            name: this.name,
            required: this.required,
            in: this.location,
            description: this.description,
            schema: this.schema.toOAPI()
        }
    }
}

export class ParameterManager extends UniqueList<Parameter> {
    readonly location: Location

    constructor(location: Location) {
        super(Parameter)
        this.location = location
    }

    make(name: string, location: Location = this.location) {
        const item = new Parameter(name, location)
        return item
    }

    toOAPI() {
        const map: IKeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toOAPI(this.location)
        })
        return map
    }
}
