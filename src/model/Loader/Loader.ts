import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'
import Project from '../Schema/Project'

const MinVersion = 15

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

        const data = this.loadPreset(source, preset)
        project.load(data)

        return project
    }

    private static loadPreset(source: Project, preset: Project) {
        const project = new Project(source.name)
        source.version = project.version
        project.load(source)
        this.addIfNotExist(project.presetManager, preset.presetManager)
        this.addIfNotExist(project.artisanManager, preset.artisanManager)
        return project
    }

    private static addIfNotExist(manager: UniqueList<UniqueItem>, preset: UniqueList<UniqueItem>) {
        preset.list.forEach(data => {
            if (manager.find(data.name) === undefined) {
                manager.add(data)
            }
        })
    }

    private static isProject(source: Project) {
        const keys = Object.keys(source)
        const mustContain = ['version', 'artisanManager', 'entityManager', 'presetManager']
        return mustContain.every(key => keys.includes(key))
    }
}
