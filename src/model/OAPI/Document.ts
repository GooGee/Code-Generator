import Item from "../Base/Item"
import Component from "./Component"
import External from "./External"
import Info from "./Info"
import { PathManager } from "./Path"
import { ServerManager } from "./Server"
import { SecurityManager } from "./Security"
import { TagManager } from "./Tag"

const Version = '3.0.3'

export default class Document extends Item {
    script: string = ''
    scriptPath: string = ''
    scriptTag: string = ''
    scriptExample: string = ''
    scriptHeader: string = ''
    scriptParameter: string = ''
    scriptRequestBody: string = ''
    scriptResponse: string = ''
    scriptSchema: string = ''

    readonly info = new Info
    readonly component = new Component
    readonly externalDocs = new External
    readonly pathManager = new PathManager
    readonly securityManager = new SecurityManager
    readonly serverManager = new ServerManager
    readonly tagManager = new TagManager

    toOAPI() {
        return {
            openapi: Version,
            info: this.info.toOAPI(),
            components: this.component.toOAPI(),
            paths: this.pathManager.toOAPI(),
            security: this.securityManager.toOAPI(),
            servers: this.serverManager.toOAPI(),
            tags: this.tagManager.toOAPI(),
            externalDocs: this.externalDocs.toOAPI(),
        }
    }
}
