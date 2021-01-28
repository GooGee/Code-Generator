import { LoDashStatic } from 'lodash'
import Entity from './Schema/Entity'
import Layer from './Schema/Layer'
import Project from './Schema/Project'

export interface DataForScript {
    entity: Entity
    layer: Layer
    lodash: LoDashStatic
    project: Project
}
