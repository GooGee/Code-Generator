import UniqueList from '../Base/UniqueList'
import { filter } from '../Text'
import Layer, { LayerManager } from './Layer'
import Node from './Node'

interface Filter {
    (layer: Layer): void
}

export default class Folder extends Node {
    isLayer = false
    nsPattern: string = ''
    readonly folderManager = new FolderManager()
    readonly layerManager = new LayerManager()

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

    getAll() {
        const list: Layer[] = []
        this.getList(this, (item) => list.push(item))
        return list
    }

    getColorList(color: string) {
        const list: Layer[] = []
        this.getList(this, item => {
            if (item.color === color) {
                list.push(item)
            }
        })
        return list
    }

    getList(folder: Folder, filter: Filter) {
        folder.layerManager.list.forEach(filter)
        folder.folderManager.list.forEach(item => {
            this.getList(item, filter)
        })
    }

    getSearchList(word: string) {
        const list: Layer[] = this.getAll()
        return filter(word, list)
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
