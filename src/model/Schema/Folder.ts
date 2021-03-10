import UniqueList from '../Base/UniqueList'
import Layer, { LayerManager } from './Layer'
import Node from './Node'

interface ActionLayer {
    (layer: Layer): void
}

interface ActionFolder {
    (layer: Folder, path: string): void
}

export default class Folder extends Node {
    isLayer = false
    readonly folderManager = new FolderManager()
    readonly layerManager = new LayerManager()

    static eachLayer(folder: Folder, action: ActionLayer) {
        folder.layerManager.list.forEach(action)
        folder.folderManager.list.forEach(item => {
            this.eachLayer(item, action)
        })
    }

    static eachFolder(folder: Folder, parent: string, action: ActionFolder) {
        const path = parent ? `${parent}/${folder.name}` : folder.name
        action(folder, path)
        folder.folderManager.list.forEach(item => {
            this.eachFolder(item, path, action)
        })
    }

    find(namexx: string[], layer: string) {
        if (namexx.length === 0) {
            return undefined
        }

        let folder: Folder = this
        for (let index = 0; index < namexx.length; index++) {
            const name = namexx[index]
            const found = folder.folderManager.find(name)
            if (found === undefined) {
                return undefined
            }
            folder = found
        }

        return folder.layerManager.list.find((item) => item.name === layer)
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

    toMap() {
        const map = new Map<string, Layer>()
        Folder.eachFolder(this, '', (item, path) => {
            item.layerManager.list.forEach(layer => {
                map.set(`${path}/${layer.name}`, layer)
            })
        })
        return map
    }

    get all() {
        const list: Layer[] = []
        Folder.eachLayer(this, (item) => list.push(item))
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
