
interface Handler {
    (ok: boolean, data: any): void
}

export interface CEFW extends Window {
    bridge: Bridge
    JavaBridge: IJavaBridge
}

interface IJavaBridge {

    load(json: string): void

    edit(json: string): void

    get(json: string): void
    post(json: string): void

    read(json: string): void
    write(json: string): void

}

interface IResponse {
    status: number
    message: string
    key: string
    data: any
}

const editMap = new Map<string, Handler>()
const getMap = new Map<string, Handler>()
const postMap = new Map<string, Handler>()
const readMap = new Map<string, Handler>()
const writeMap = new Map<string, Handler>()

const StatusOK = 200
const FileName = 'code-generator.json'

const CallBack = (ok: boolean, data: any) => { }

export default class Bridge {
    readonly window: CEFW
    readonly listenerxx: Array<Handler> = []

    constructor(window: CEFW) {
        this.window = window
    }

    add(handler: Handler) {
        this.listenerxx.push(handler)
    }

    handle(map: Map<string, Handler>, text: string) {
        try {
            const json = JSON.parse(text) as IResponse
            const handler = map.get(json.key)

            if (handler === undefined) {
                console.log(`read handler for ${json.key} is undefined`)
                return
            }

            map.delete(json.key)

            if (json.status === StatusOK) {
                handler(true, json.data)
                return
            }

            handler(false, json.message)

        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    handleError(text: string) {
        console.log(text)
        alert(text)
    }

    load(json: IResponse) {
        // console.log(json)
        try {
            this.listenerxx.forEach(handler => {
                if (json.status === StatusOK) {
                    const data = JSON.parse(json.data)
                    handler(true, data)
                    return
                }

                handler(false, json.message)
            })
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    save(project: string, handler: Handler = CallBack) {
        this.write(FileName, project, handler)
    }

    edit(identifier: string, data: string, handler: Handler = CallBack) {
        const key = identifier
        editMap.set(key, handler)
        const ddd = {
            key,
            data
        }
        this.window.JavaBridge.edit(JSON.stringify(ddd))
    }

    editHandler(text: string) {
        console.log(text)
        // this.handle(editMap, text)
    }

    editUpdate(text: string) {
        this.handle(editMap, text)
    }

    get(route: string, data: string, handler: Handler = CallBack) {
        const key = route
        getMap.set(key, handler)
        const ddd = {
            key,
            data
        }
        this.window.JavaBridge.get(JSON.stringify(ddd))
    }

    getHandler(text: string) {
        this.handle(getMap, text)
    }

    post(route: string, data: string, handler: Handler = CallBack) {
        const key = route
        postMap.set(key, handler)
        const ddd = {
            key,
            data
        }
        this.window.JavaBridge.post(JSON.stringify(ddd))
    }

    postHandler(text: string) {
        this.handle(postMap, text)
    }

    read(file: string, data: string, handler: Handler = CallBack) {
        const key = file
        readMap.set(key, handler)
        const ddd = {
            key,
            data
        }
        this.window.JavaBridge.read(JSON.stringify(ddd))
    }

    readHandler(text: string) {
        console.log('readHandler')
        this.handle(readMap, text)
    }

    write(file: string, data: string, handler: Handler = CallBack) {
        const key = file
        writeMap.set(key, handler)
        const ddd = {
            key,
            data
        }
        this.window.JavaBridge.write(JSON.stringify(ddd))
    }

    writeHandler(text: string) {
        console.log('writeHandler')
        this.handle(writeMap, text)
    }

}
