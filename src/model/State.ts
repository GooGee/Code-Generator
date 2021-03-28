import Project from './Schema/Project'
import SideBar from './Service/SideBar'
import InputDialogue from './Dialogue/InputDialogue'
import ListDialogue from './Dialogue/ListDialogue'
import Layer from './Schema/Layer'
import Entity from './Schema/Entity'
import Loader from './Service/Loader'
import { IData } from './DataBase/IData'
import Convertor from './DataBase/Convertor'
import NameDialogue from './Dialogue/NameDialogue'
import ICEFW from './Bridge/ICEFW'
import Route from './Bridge/Route'
import Start from './Service/Start'
import RunScript from './Service/RunScript'
import Folder from './Schema/Folder'

class FakeManager {
    constructor(readonly folder: Folder) {}

    get list() {
        return this.folder.all
    }
}

export default class State {
    error = null
    ide = ''
    route: Route
    readonly preset: Project
    project: Project | null = null
    sidebar: SideBar | null = null

    readonly inputDialogue = new InputDialogue()
    readonly listDialogue = new ListDialogue()
    readonly nameDialogue = new NameDialogue()

    private sidebarArtisan: SideBar | null = null
    private sidebarEntity: SideBar | null = null
    private sidebarLayer: SideBar | null = null
    private sidebarPreset: SideBar | null = null

    constructor(window: ICEFW, preset: Project) {
        this.preset = preset
        this.route = Start.run(this, window)
    }

    private prepare() {
        this.sidebarArtisan = new SideBar(this.project!.artisanManager)
        this.sidebarEntity = new SideBar(this.project!.entityManager)
        const layerManager = new FakeManager(this.project!.folder)
        this.sidebarLayer = new SideBar(layerManager as any)
        this.sidebarPreset = new SideBar(this.project!.presetManager)
        this.showEntity()
    }

    convert(data: IData, skip: boolean) {
        const convertor = new Convertor(this.project!, this.preset, skip)
        convertor.convert(data)
    }

    create(name: string) {
        const preset = this.preset
        preset.name = name
        this.project = new Project(name)
        this.project.load(preset)
        this.prepare()
    }

    load(data: Project) {
        this.project = Loader.load(data, this.preset)
        this.prepare()
    }

    showArtisan() {
        this.sidebar = this.sidebarArtisan
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

    getLayer(path: string, layer: string) {
        return this.project!.getLayer(path, layer)
    }

    getProject() {
        return this.project!
    }

    getPreset(name: string) {
        return this.project!.getPreset(name)
    }

    render(layer: Layer, entity: Entity) {
        return RunScript.runAndRender(this.project!, layer, entity)
    }

    setFaker(entity: Entity) {
        RunScript.runFaker(this.project!, entity)
    }

    setValidation(entity: Entity) {
        RunScript.runValidation(this.project!, entity)
    }

    get inBrowser() {
        return this.ide === ''
    }

    get ready() {
        return this.project !== null
    }
}
