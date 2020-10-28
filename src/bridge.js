import sss from './state.js'

const bridge = {
    readDBHandler: null,

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
