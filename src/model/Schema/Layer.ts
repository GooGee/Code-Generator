import UniqueList from '../Base/UniqueList'
import Entity from './Entity'
import Node from './Node'
import { PresetManager } from './Preset'
import Project from './Project'
import { runText, script } from '../Text'

const FileExtension = '.php'

export enum LayerEnum {
    Migration = 'Migration',
    Model = 'Model',
}

export default class Layer extends Node {
    color: string = ''
    original: boolean = false
    requireName: boolean = true
    single: boolean = false
    description: string = ''
    classPattern: string = ''
    filePattern: string = ''
    nsPattern: string = ''
    pathPattern: string = ''
    script: string = script
    template: string = ''
    readonly dataManager = new PresetManager()

    getClassName(entity: Entity) {
        const data = {
            entity,
            layer: this,
        }
        return runText(this.classPattern, data)
    }

    getData(name: string) {
        return this.dataManager.find(name)
    }

    getFileName(entity: Entity) {
        const data = {
            entity,
            layer: this,
        }
        return runText(this.filePattern, data)
    }

    getFilePath(project: Project, entity: Entity) {
        return this.getPath(project, entity) + '/' + this.getFileName(entity)
    }

    getFullName(project: Project, entity: Entity) {
        return this.getNameSpace(project, entity) + '\\' + this.getClassName(entity)
    }

    getPathHash(project: Project, entity: Entity) {
        const path = this.getPath(project, entity)
        return btoa(path).split('/').join('-')
    }

    getNameSpace(project: Project, entity: Entity) {
        const data = {
            project,
            entity,
            layer: this,
        }
        const folderxx = project.folder.findLayer(this)
        folderxx.pop() // remove root
        const list = folderxx.reverse().map(item => item.nsPattern)
        if (this.nsPattern) {
            list.push(this.nsPattern)
        }
        return runText(list.join('/'), data)
            .split('/')
            .join('\\')
    }

    getPath(project: Project, entity: Entity) {
        const data = {
            project,
            entity,
            layer: this,
        }
        const folderxx = project.folder.findLayer(this)
        folderxx.pop() // remove root
        const list = folderxx.reverse().map(item => item.name)
        if (this.pathPattern) {
            list.push(this.pathPattern)
        }
        return runText(list.join('/'), data)
    }
}

export class LayerManager extends UniqueList<Layer> {
    constructor() {
        super(Layer)
    }

    make(name: string) {
        const item = super.make(name)
        item.classPattern = item.name
        item.filePattern = item.name + FileExtension
        return item
    }
}
