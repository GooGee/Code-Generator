import Project from './Schema/Project'
import SideBar, { SideBarEnum, SideBarManager } from './Service/SideBar'
import InputDialogue from './Dialogue/InputDialogue'
import ListDialogue from './Dialogue/ListDialogue'
import Layer from './Schema/Layer'
import Entity from './Schema/Entity'
import { IData } from './DataBase/IData'
import Convertor from './DataBase/Convertor'
import NameDialogue from './Dialogue/NameDialogue'
import ICEFW from './Bridge/ICEFW'
import Route from './Bridge/Route'
import Start from './Service/Start'
import RunScript from './Service/RunScript'

export default class State {
    route: Route
    readonly preset: Project
    project: Project | null = null
    sidebar: SideBar | null = null

    readonly inputDialogue = new InputDialogue()
    readonly listDialogue = new ListDialogue()
    readonly nameDialogue = new NameDialogue()

    readonly sidebarManager = new SideBarManager()

    constructor(window: ICEFW, preset: Project) {
        this.preset = preset
        this.route = Start.run(this, window)
    }

    convert(data: IData, skip: boolean) {
        const convertor = new Convertor(this.project!, this.preset, skip)
        convertor.convert(data)
    }

    showArtisan() {
        this.sidebar = this.sidebarManager.get(SideBarEnum.Artisan)
    }

    showEntity() {
        this.sidebar = this.sidebarManager.get(SideBarEnum.Entity)
    }

    showLayer() {
        this.sidebar = this.sidebarManager.get(SideBarEnum.Layer)
    }

    showPreset() {
        this.sidebar = this.sidebarManager.get(SideBarEnum.Preset)
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
        return RunScript.runAndRender(this.project!, layer, entity)
    }

    setFaker(entity: Entity) {
        RunScript.runFaker(this.project!, entity)
    }

    setValidation(entity: Entity) {
        RunScript.runValidation(this.project!, entity)
    }

    get ready() {
        return this.project !== null
    }
}
