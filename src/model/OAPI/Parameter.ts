import OAPIItem from './OAPIItem'
import OAPIManager from './OAPIManager'
import SchemaSimple from './SchemaSimple'

export enum Location {
    cookie = 'cookie',
    header = 'header',
    path = 'path',
    query = 'query',
}

export default class Parameter extends OAPIItem {
    allowEmptyValue: boolean = false
    color: string = ''
    deprecated: boolean = false
    description: string = ''
    example: string = ''
    location: Location
    name2: string = ''
    required: boolean = true
    readonly schema = new SchemaSimple(this.name)

    constructor(name: string, location: Location = Location.cookie) {
        super(name)
        this.name2 = name
        this.location = location
    }

    toOAPI() {
        if (this.location === Location.header) {
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

export class ParameterManager extends OAPIManager<Parameter> {
    readonly location: Location

    constructor(location: Location) {
        super(Parameter)
        this.location = location
    }

    make(name: string, location: Location = this.location) {
        const item = new Parameter(name, location)
        return item
    }
}
