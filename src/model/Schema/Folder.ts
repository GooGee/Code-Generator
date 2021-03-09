import UniqueList from '../Base/UniqueList'
import { filter } from '../Text'
import Layer, { LayerManager } from './Layer'
import Node from './Node'

interface Action {
    (layer: Layer): void
}

export default class Folder extends Node {
    isLayer = false
    readonly folderManager = new FolderManager()
    readonly layerManager = new LayerManager()

    each(folder: Folder, action: Action) {
        folder.layerManager.list.forEach(action)
        folder.folderManager.list.forEach(item => {
            this.each(item, action)
        })
    }

    find(name: string) {
        let found = this.layerManager.list.find((item) => item.name === name)
        if (found) {
            return found
        }

        this.folderManager.list.every(item => {
            found = item.find(name)
            if (found) {
                return false
            }
            return true
        })
        return found
    }

    findLayer(layer: Layer) {
        const found = this.layerManager.list.find((item) => Object.is(layer, item))
        if (found) {
            return [this]
        }

        let list: Folder[] = []
        this.folderManager.list.every(item => {
            list = item.findLayer(layer)
            if (list.length) {
                list.push(this)
                return false
            }
            return true
        })
        return list
    }

    get all() {
        const list: Layer[] = []
        this.each(this, (item) => list.push(item))
        return list
    }

    get children() {
        const list: Node[] = this.folderManager.list
        return list.concat(this.layerManager.list)
    }

    get text() {
        return this.name
    }

}

export class FolderManager extends UniqueList<Folder> {
    constructor() {
        super(Folder)
    }
}
