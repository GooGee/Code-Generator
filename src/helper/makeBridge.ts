import ICEFW from '../model/Bridge/ICEFW'

export default function makeBridge(cefw: ICEFW) {
    cefw.JavaBridge = {
        call(text) {
            const json = JSON.parse(text)
            json.data = ''
            json.status = 400
            json.message = 'Not available in browser'
            cefw.bridge.call(json)
        },
    }
}
