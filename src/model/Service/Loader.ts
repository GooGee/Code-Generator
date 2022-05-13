import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'
import Folder from '../Schema/Folder'
import Project from '../Schema/Project'

const MinVersion = 20

export default class Loader {
    static load(source: Project, preset: Project) {
        if (!this.isProject(source)) {
            throw new Error('Unknown data!')
        }

        const version: number = source.version
        const message = `Cannot load version ${version} project!`
        if (version < MinVersion) {
            throw new Error(message)
        }

        const project = new Project(source.name)
        if (version > project.version) {
            throw new Error(message)
        }

        if (source.version === project.version) {
            project.load(source)
        } else {
            const data = this.loadPreset(source, preset)
            project.load(data)
        }

        return project
    }

    static upgrade(source: Project, preset: Project) {
        source.version = MinVersion
        return this.load(source, preset)
    }

    private static loadPreset(source: Project, preset: Project) {
        const project = new Project(source.name)
        source.version = project.version
        project.load(source)
        this.addIfNotExist(project.presetManager, preset.presetManager)
        this.addIfNotExist(project.artisanManager, preset.artisanManager)
        this.loadFolder(project.folder, preset.folder)
        return project
    }

    private static addIfNotExist(manager: UniqueList<UniqueItem>, preset: UniqueList<UniqueItem>) {
        preset.list.forEach(data => {
            if (manager.find(data.name) === undefined) {
                const item = manager.make(data.name)
                item.load(data)
                manager.add(item)
            }
        })
    }

    private static loadFolder(folder: Folder, preset: Folder) {
        this.addIfNotExist(folder.folderManager, preset.folderManager)
        this.addIfNotExist(folder.layerManager, preset.layerManager)
        preset.folderManager.list.forEach(item => {
            const found = folder.folderManager.find(item.name)
            this.loadFolder(found!, item)
        })
    }

    private static isProject(source: Project) {
        const keys = Object.keys(source)
        const mustContain = ['version', 'artisanManager', 'entityManager', 'presetManager']
        return mustContain.every(key => keys.includes(key))
    }
}
