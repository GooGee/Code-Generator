import Bridge from './Bridge'
import IJavaBridge from './IJavaBridge'

export default interface ICEFW extends Window {
    bridge: Bridge
    JavaBridge: IJavaBridge
}
