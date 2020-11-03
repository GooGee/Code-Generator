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
import Bridge, { CEFW } from './Bridge'
import NameDialogue from './Dialogue/NameDialogue'

export default class State {
    bridge: Bridge
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

    constructor(window: CEFW) {
        this.bridge = new Bridge(window)
        window.bridge = this.bridge

        this.bridge.add((ok, data) => {
            if (ok) {
                this.load(data)
                return
            }
            this.create('Project')
        })

        setInterval(() => {
            if (window.JavaBridge) {
                if (this.ready) {
                    if (this.project!.autoSave) {
                        this.bridge.save(JSON.stringify(this.project))
                    }
                }
            }
        }, 11222)

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
        }
        return runAndRender(data)
    }

    setValidation(entity: Entity) {
        const data = {
            project: this.project,
            entity,
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
