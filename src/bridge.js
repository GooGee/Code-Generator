import sss from './state.js'

const bridge = {
    readDBHandler: null,
    runHandler: null,

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
    readDB(server, cb) {
        this.readDBHandler = cb
        window.JavaBridge.readDB(server + '/entity/table')
    },
    readDBCB(text) {
        // console.log(text)
        if (this.readDBHandler) {
            this.readDBHandler(text)
            this.readDBHandler = null
        }
    },
    run(server, command, cb) {
        // console.log(command)
        this.runHandler = cb
        window.JavaBridge.run(server + '/entity/run?command=' + encodeURIComponent(command))
    },
    runCB(text) {
        // console.log(text)
        if (this.runHandler) {
            this.runHandler(text)
            this.runHandler = null
        }
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
