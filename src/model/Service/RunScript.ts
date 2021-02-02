import lodash from 'lodash'
import Entity from '../Schema/Entity'
import Layer from '../Schema/Layer'
import Project from '../Schema/Project'
import { run, runAndRender } from '../Text'

export default class RunScript {

    static runAndRender(project: Project, layer: Layer, entity: Entity) {
        const data = {
            project: project,
            layer,
            entity,
            lodash,
        }
        return runAndRender(data)
    }

    static runFaker(project: Project, entity: Entity) {
        const data = {
            project: project,
            entity,
            lodash,
        }
        run(project.fakerScript, data)
    }

    static runValidation(project: Project, entity: Entity) {
        const data = {
            project: project,
            entity,
            lodash,
        }
        run(project.validationScript, data)
    }

}
