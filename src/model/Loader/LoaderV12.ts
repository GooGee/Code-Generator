import BaseLoader from './BaseLoader'
import Project from '../Schema/Project'

export default class LoaderV12 extends BaseLoader {
    readonly project: Project

    constructor(project: Project) {
        super()
        this.project = project
    }

    load(source: Project, preset: Project) {
        this.project.load(source)
        this.loadList(preset.commandManager.list, this.project.commandManager)
    }
}
