import UniqueList from '../Base/UniqueList'
import { LayerManager } from './Layer'
import Node from './Node'

export default class Folder extends Node {
    isLayer = false
    nsPattern: string = ''
    readonly folderManager = new FolderManager()
    readonly layerManager = new LayerManager()

    get children() {
        const list: Node[] = this.folderManager.list
        return list.concat(this.layerManager.list)
    }

    get empty() {
        return this.folderManager.list.length === 0
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
