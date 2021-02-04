import Item from "../Base/Item"
import { ExampleManager } from "./Example"
import { LinkManager } from "./Link"
import { ParameterManager, Location } from "./Parameter"
import { RequestBodyManager } from "./RequestBody"
import { ResponseManager } from "./Response"
import { SchemaManager } from "./Schema"
import { CallBackManager } from "./CallBack"
import { SecuritySchemeManager } from "./SecurityScheme"

export default class Component extends Item {
    readonly callbackManager = new CallBackManager
    readonly exampleManager = new ExampleManager
    readonly headerManager = new ParameterManager(Location.header)
    readonly linkManager = new LinkManager
    readonly parameterManager = new ParameterManager(Location.path)
    readonly requestBodyManager = new RequestBodyManager
    readonly responseManager = new ResponseManager
    readonly schemaManager = new SchemaManager
    readonly securitySchemeManager = new SecuritySchemeManager

    toOAPI() {
        return {
            callbacks: this.callbackManager.toOAPI(),
            examples: this.exampleManager.toOAPI(),
            headers: this.headerManager.toOAPI(),
            links: this.linkManager.toOAPI(),
            parameters: this.parameterManager.toOAPI(),
            requestBodies: this.requestBodyManager.toOAPI(),
            responses: this.responseManager.toOAPI(),
            schemas: this.schemaManager.toOAPI(),
            securitySchemes: this.securitySchemeManager.toOAPI(),
        }
    }
}
