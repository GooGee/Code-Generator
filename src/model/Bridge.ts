
interface Handler {
    (ok: boolean, data: any): void
}

export interface CEFW extends Window {
    bridge: Bridge
    JavaBridge: IJavaBridge
}

interface IJavaBridge {

    call(json: string): void

}

interface IResponse {
    status: number
    message: string
    action: string
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
    private refreshCB: Handler = CallBack
    readonly window: CEFW
    readonly listenerxx: Array<Handler> = []

    constructor(window: CEFW) {
        this.window = window
    }

    add(handler: Handler) {
        this.listenerxx.push(handler)
    }

    call(json: IResponse) {
        console.log(json)
        switch (json.action) {
            case 'load':
                this.load(json)
                break;

            default:
                break;
        }
    }

    error(json: string) {
        console.log(json)
    }

    handle(json: string) {
        console.log(json)
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

    edit(file: string, data: string, handler: Handler = CallBack) {
        const key = file
        editMap.set(key, handler)
        const ddd = {
            action: 'edit',
            key,
            data
        }
        this.window.JavaBridge.call(JSON.stringify(ddd))
    }

    get(route: string, data: string, handler: Handler = CallBack) {
        const key = route
        getMap.set(key, handler)
        const ddd = {
            action: 'get',
            key,
            data
        }
        this.window.JavaBridge.call(JSON.stringify(ddd))
    }

    post(route: string, data: string, handler: Handler = CallBack) {
        const key = route
        postMap.set(key, handler)
        const ddd = {
            action: 'post',
            key,
            data
        }
        this.window.JavaBridge.call(JSON.stringify(ddd))
    }

    refresh(handler: Handler = CallBack) {
        this.refreshCB = handler
        const ddd = {
            action: 'refresh',
            key: '',
            data: ''
        }
        this.window.JavaBridge.call(JSON.stringify(ddd))
    }

    read(file: string, data: string, handler: Handler = CallBack) {
        const key = file
        readMap.set(key, handler)
        const ddd = {
            action: 'read',
            key,
            data
        }
        this.window.JavaBridge.call(JSON.stringify(ddd))
    }

    write(file: string, data: string, handler: Handler = CallBack) {
        const key = file
        writeMap.set(key, handler)
        const ddd = {
            action: 'write',
            key,
            data
        }
        this.window.JavaBridge.call(JSON.stringify(ddd))
    }

}
