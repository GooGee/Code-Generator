import { filter } from './Text'
import IUniqueItemWithColor from '../Base/IUniqueItemWithColor'
import UniqueList from '../Base/UniqueList'
import Project from '../Schema/Project'

export default class SideBar {
    readonly manager: UniqueList<IUniqueItemWithColor> | null = null
    color: string = ''
    item: IUniqueItemWithColor | null = null
    keyword: string = ''

    constructor(manager: UniqueList<IUniqueItemWithColor>) {
        this.manager = manager
    }

    get list() {
        if (!this.manager) {
            return []
        }

        if (this.keyword) {
            return filter(this.keyword, this.manager.list)
        }
        if (this.color) {
            return this.manager.list.filter(item => item.color === this.color)
        }
        return this.manager.list
    }
}

export enum SideBarEnum {
    Artisan = 'Artisan',
    Entity = 'Entity',
    Layer = 'Layer',
    Preset = 'Preset',
}

export class SideBarManager {
    readonly map = new Map<SideBarEnum, SideBar>()

    bind(project: Project) {
        this.map.set(SideBarEnum.Artisan, new SideBar(project.artisanManager))
        this.map.set(SideBarEnum.Entity, new SideBar(project.entityManager))
        this.map.set(SideBarEnum.Layer, new SideBar(project.layerManager))
        this.map.set(SideBarEnum.Preset, new SideBar(project.presetManager))
    }

    get(name: SideBarEnum) {
        const sb = this.map.get(name)
        if (sb) {
            return sb
        }
        throw new Error(`SideBar ${name} not found!`)
    }

}
