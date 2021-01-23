import lodash from 'lodash'
import Project from './Schema/Project'
import SideBar from './SideBar'
import InputDialogue from './Dialogue/InputDialogue'
import ListDialogue from './Dialogue/ListDialogue'
import { run, runAndRender } from './Text'
import Layer from './Schema/Layer'
import Entity from './Schema/Entity'
import Loader from './Loader/Loader'
import { IData } from './DataBase/IData'
import Convertor from './DataBase/Convertor'
import NameDialogue from './Dialogue/NameDialogue'
import ICEFW from './Bridge/ICEFW'
import Bridge from './Bridge/Bridge'
import HandlerManager from './Bridge/HandlerManager'
import { ActionEnum } from './Bridge/ActionEnum'
import { StatusEnum } from './Bridge/StatusEnum'
import ToJava from './Bridge/ToJava'
import Route from './Bridge/Route'

export default class State {
    bridge: Bridge
    route: Route
    preset: Project | null = null
    project: Project | null = null
    sidebar: SideBar | null = null

    readonly inputDialogue = new InputDialogue()
    readonly listDialogue = new ListDialogue()
    readonly nameDialogue = new NameDialogue()

    private sidebarCommand: SideBar | null = null
    private sidebarEntity: SideBar | null = null
    private sidebarLayer: SideBar | null = null
    private sidebarPreset: SideBar | null = null

    constructor(window: ICEFW) {

        const manager = new HandlerManager()
        manager.add(ActionEnum.load, 'project', (response) => {
            if (response.status === StatusEnum.OK) {
                console.log(response.data)
                this.load(response.data)
                return
            }
            this.create('Project')
        })

        const toJava = new ToJava(window, manager)
        this.route = new Route(toJava)
        this.bridge = new Bridge(manager)
        window.bridge = this.bridge

        setInterval(() => {
            if (this.ready) {
                if (window.JavaBridge) {
                    if (this.project!.autoSave) {
                        this.route.save(JSON.stringify(this.project))
                    }
                }
            }
        }, 11122)

    }

    private prepare() {
        this.sidebarCommand = new SideBar(this.project!.commandManager)
        this.sidebarEntity = new SideBar(this.project!.entityManager)
        this.sidebarLayer = new SideBar(this.project!.layerManager)
        this.sidebarPreset = new SideBar(this.project!.presetManager)
        this.showEntity()
    }

    convert(data: IData, skip: boolean) {
        const convertor = new Convertor(this.project!, this.preset!, skip)
        convertor.convert(data)
    }

    create(name: string) {
        const preset = this.preset!
        preset.name = name
        this.project = new Project(name)
        this.project.load(preset)
        this.prepare()
    }

    load(data: Project) {
        const project = new Project(data.name)
        const loader = new Loader(project)
        loader.load(data, this.preset!)
        this.project = project
        this.prepare()
    }

    showCommand() {
        this.sidebar = this.sidebarCommand
    }

    showEntity() {
        this.sidebar = this.sidebarEntity
    }

    showLayer() {
        this.sidebar = this.sidebarLayer
    }

    showPreset() {
        this.sidebar = this.sidebarPreset
    }

    getEntity(name: string) {
        return this.project!.getEntity(name)
    }

    getLayer(name: string) {
        return this.project!.getLayer(name)
    }

    getPreset(name: string) {
        return this.project!.getPreset(name)
    }

    render(layer: Layer, entity: Entity) {
        const data = {
            project: this.project!,
            layer,
            entity,
            lodash,
        }
        return runAndRender(data)
    }

    setValidation(entity: Entity) {
        const data = {
            project: this.project,
            entity,
            lodash,
        }
        run(this.project!.validationScript, data)
    }

    get loading() {
        return this.preset === null
    }

    get ready() {
        return this.project !== null
    }
}
