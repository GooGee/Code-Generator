import NameItem from '../Base/NameItem'
import { CommandManager } from './Command'
import { EntityManager } from './Entity'
import { LayerManager } from './Layer'
import { PresetManager } from './Preset'

const Version = 13

export default class Project extends NameItem {
    version = Version
    ns = 'App'
    autoSave: boolean = false
    dataVersion = '1.0'
    description: string = ''
    script: string = ''
    server: string = 'http://localhost'
    validationScript: string = ''

    readonly commandManager = new CommandManager()
    readonly entityManager = new EntityManager()
    readonly layerManager = new LayerManager()
    readonly presetManager = new PresetManager()

    get fileName() {
        return this.name + '.json'
    }

    getEntity(name: string) {
        return this.entityManager.find(name)
    }

    getLayer(name: string) {
        return this.layerManager.find(name)
    }

    getPreset(name: string) {
        return this.presetManager.find(name)
    }
}
