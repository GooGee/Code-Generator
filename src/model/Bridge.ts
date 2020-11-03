
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

    handle(map: Map<string, Handler>, json: IResponse) {
        console.log(json)
        if (json === undefined) {
            return
        }
        try {
            const handler = map.get(json.key)

            if (handler === undefined) {
                alert(`handler ${json.key} not found`)
                return
            }

            if (json.status === StatusOK) {
                handler(true, json.data)
                return
            }

            handler(false, json.message ?? 'Error')

        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    handleError(code: number, text: string) {
        console.log(code)
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

    edit(identifier: string, type: string, data: string, handler: Handler = CallBack) {
        const key = identifier
        editMap.set(key, handler)
        const ddd = {
            key,
            type,
            data
        }
        this.window.JavaBridge.edit(JSON.stringify(ddd))
    }

    editHandler(json: IResponse) {
        console.log('editHandler')
        console.log(json)
        // this.handle(editMap, json)
    }

    editUpdate(json: IResponse) {
        console.log('editUpdate')
        this.handle(editMap, json)
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

    getHandler(json: IResponse) {
        console.log('getHandler')
        this.handle(getMap, json)
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

    postHandler(json: IResponse) {
        console.log('postHandler')
        this.handle(postMap, json)
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

    readHandler(json: IResponse) {
        console.log('readHandler')
        this.handle(readMap, json)
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

    writeHandler(json: IResponse) {
        console.log('writeHandler')
        this.handle(writeMap, json)
    }

}
