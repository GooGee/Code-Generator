import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'
import Entity from './Entity'

export default class Relation extends UniqueItem {
    type: string
    parameter: string = ''

    constructor(name: string, type: string = 'belongsTo') {
        super(name)
        this.type = type
    }
}

export class RelationManager extends UniqueList<Relation> {
    constructor() {
        super(Relation)
    }

    link(entity: Entity) {
        const relation = this.make(entity.snakeCase)
        relation.parameter = `${entity.name}::class`
        return relation
    }
}
