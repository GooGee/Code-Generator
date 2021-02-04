import IKeyValue from "../Base/IKeyValue"
import Item from "../Base/Item"
import { NameValueManager } from "./NameValue"

export default class OAuthFlow extends Item {
    authorizationUrl: string = ''
    tokenUrl: string = ''
    refreshUrl: string = ''
    readonly manager = new NameValueManager()

    toOAPI() {
        return {
            authorizationUrl: this.authorizationUrl,
            tokenUrl: this.tokenUrl,
            refreshUrl: this.refreshUrl,
            scopes: this.manager.toOAPI()
        }
    }
}

export class OAuthFlows extends Item {
    readonly implicit = new OAuthFlow
    readonly password = new OAuthFlow
    readonly clientCredentials = new OAuthFlow
    readonly authorizationCode = new OAuthFlow

    toOAPI() {
        const map: IKeyValue = {}
        if (this.implicit.authorizationUrl) {
            map['implicit'] = this.implicit.toOAPI()
        }
        if (this.password.authorizationUrl) {
            map['password'] = this.password.toOAPI()
        }
        if (this.clientCredentials.authorizationUrl) {
            map['clientCredentials'] = this.clientCredentials.toOAPI()
        }
        if (this.authorizationCode.authorizationUrl) {
            map['authorizationCode'] = this.authorizationCode.toOAPI()
        }
        return map
    }
}
