import lodash from 'lodash'
import Entity from '../Schema/Entity'
import Layer from '../Schema/Layer'
import Project from '../Schema/Project'
import * as text from '../Text'

export default class RunScript {

    static runAndRender(project: Project, layer: Layer, entity: Entity) {
        const data = {
            project: project,
            layer,
            entity,
            lodash,
            text,
        }
        return text.runAndRender(data)
    }

    static runFaker(project: Project, entity: Entity) {
        const data = {
            project: project,
            entity,
            lodash,
        }
        text.run(project.fakerScript, data)
    }

    static runValidation(project: Project, entity: Entity) {
        const data = {
            project: project,
            entity,
            lodash,
        }
        text.run(project.validationScript, data)
    }

}
