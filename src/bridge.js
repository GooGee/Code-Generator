import sss from './state.js'

const bridge = {
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
    save(project) {
        window.JavaBridge.save(JSON.stringify(project))
    },
    readDB() {
        window.JavaBridge.readDB()
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
