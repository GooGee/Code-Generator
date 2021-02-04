import Bridge from '../Bridge/Bridge'
import HandlerManager from '../Bridge/HandlerManager'
import { ActionEnum } from '../Bridge/ActionEnum'
import { StatusEnum } from '../Bridge/StatusEnum'
import ToJava from '../Bridge/ToJava'
import ICEFW from '../Bridge/ICEFW'
import Route from '../Bridge/Route'
import State from '../State'
import Save from './Save'
import Loader from '../Loader/Loader'
import Project from '../Schema/Project'

export default class Start {

    static run(state: State, window: ICEFW) {

        const manager = new HandlerManager()
        manager.add(ActionEnum.error, '*', (response) => {
            alert(response.message)
        })
        manager.add(ActionEnum.load, 'project', (response) => {
            if (response.status === StatusEnum.OK) {
                const project = JSON.parse(response.data)
                state.project = Loader.load(project, state.preset)
                this.ready(state)
                Save.last = response.data
                return
            }
            state.project = new Project('ProjectName')
            state.project.load(state.preset)
            this.ready(state)
        })

        const toJava = new ToJava(window, manager)
        const route = new Route(toJava)
        window.bridge = new Bridge(manager)

        manager.add(ActionEnum.save, 'project', (response) => {
            if (response.status === StatusEnum.OK) {
                route.save(state.project!)
            }
        })

        setInterval(() => {
            if (state.ready) {
                if (window.JavaBridge) {
                    if (state.project!.autoSave) {
                        route.save(state.project!)
                    }
                }
            }
        }, 11122)

        return route
    }

    private static ready(state: State) {
        state.sidebarManager.bind(state.project!)
        state.showEntity()
    }

}
