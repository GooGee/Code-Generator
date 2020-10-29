import sss from './state.js'

const bridge = {
    readDBHandler: null,
    runHandler: null,

    handle(text, cb) {
        try {
            const json = JSON.parse(text)
            if (parseInt(json.status) > 200) {
                cb(false, json.message)
                return
            }
            cb(true, json.data)
        } catch (error) {
            cb(false, error.message)
        }
    },
    load() {
        window.JavaBridge.load()
    },
    loadCB(text) {
        // console.log(text)
        if (text) {
            const data = JSON.parse(text)
            sss.load(data)
            return
        }
        sss.create('Project')
    },
    make(file, text) {
        window.JavaBridge.make(file + '*' + text)
    },
    makeCB(text) {
        console.log(text)
    },
    save(project) {
        window.JavaBridge.save(JSON.stringify(project))
    },
    saveCB(text) {
        console.log(text)
    },
    readDB(cb) {
        this.readDBHandler = cb
        window.JavaBridge.readDB(sss.project.server + '/entity/table')
    },
    readDBCB(text) {
        // console.log(text)
        this.handle(text, this.readDBHandler)
        this.readDBHandler = null
    },
    run(command, cb) {
        // console.log(command)
        this.runHandler = cb
        window.JavaBridge.run(sss.project.server + '/entity/run?command=' + encodeURIComponent(command))
    },
    runCB(text) {
        // console.log(text)
        this.handle(text, this.runHandler)
        this.runHandler = null
    },
    toJSON() {
        console.log(JSON.stringify(sss.project))
    },
}

setInterval(() => {
    if (window.JavaBridge) {
        if (sss.project.autoSave) {
            bridge.save(sss.project)
        }
    }
}, 11222)

window.bridge = bridge

export default bridge
