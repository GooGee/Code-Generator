import Bridge from '../Bridge/Bridge'
import HandlerManager from '../Bridge/HandlerManager'
import { ActionEnum } from '../Bridge/ActionEnum'
import { StatusEnum } from '../Bridge/StatusEnum'
import ToJava from '../Bridge/ToJava'
import ICEFW from '../Bridge/ICEFW'
import Route from '../Bridge/Route'
import State from '../State'
import Save from './Save'

export default class Start {
    static run(state: State, window: ICEFW) {
        const manager = new HandlerManager()
        manager.add(ActionEnum.error, '*', response => {
            alert(response.message)
        })
        manager.add(ActionEnum.load, 'project', response => {
            if (response.status === StatusEnum.OK) {
                if (response.data) {
                    try {
                        const project = JSON.parse(response.data)
                        state.data = project
                        state.load(project)
                        Save.last = response.data
                    } catch (error) {
                        state.error = error
                    }
                    return
                }
            }
            state.create('Project')
        })

        const toJava = new ToJava(window, manager)
        const route = new Route(toJava)
        window.bridge = new Bridge(manager)

        manager.add(ActionEnum.save, 'project', response => {
            if (response.status === StatusEnum.OK) {
                route.save(state.project!)
            }
        })

        return route
    }
}
