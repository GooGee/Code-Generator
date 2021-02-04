import IKeyValue from "../Base/IKeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"
import { OAuthFlows } from "./OAuthFlow"
import { Location } from "./Parameter"

export enum SecurityType {
    apiKey = 'apiKey',
    http = 'http',
    oauth2 = 'oauth2',
    openIdConnect = 'openIdConnect',
}

export default class SecurityScheme extends UniqueItem {
    type: SecurityType = SecurityType.http
    description: string = ''
    name2: string = ''
    location: Location
    scheme: string = ''
    bearerFormat: string = ''
    openIdConnectUrl: string = ''
    readonly flows = new OAuthFlows

    constructor(name: string, location: Location = Location.cookie) {
        super(name)
        this.name2 = name
        this.location = location
    }

    toOAPI() {
        return {
            type: this.type,
            description: this.description,
            name: this.name2,
            in: this.location,
            scheme: this.scheme,
            bearerFormat: this.bearerFormat,
            openIdConnectUrl: this.openIdConnectUrl,
            flows: this.flows.toOAPI(),
        }
    }
}

export class SecuritySchemeManager extends UniqueList<SecurityScheme> {

    constructor() {
        super(SecurityScheme)
    }

    toOAPI() {
        const map: IKeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toOAPI()
        })
        return map
    }
}
