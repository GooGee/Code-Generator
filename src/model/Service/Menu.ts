export default class Menu {
    readonly name: string
    readonly path: string

    constructor(name: string, path: string) {
        this.name = name
        this.path = path
    }

}

export class MenuData {
    readonly generator: Menu[] = []
    readonly oapi: Menu[] = []
    readonly entity: string[] = []
}
