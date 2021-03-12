import { filter } from './Text'
import IUniqueItemWithColor from '../Base/IUniqueItemWithColor'
import UniqueList from '../Base/UniqueList'

export default class SideBar {
    readonly manager: UniqueList<IUniqueItemWithColor> | null = null
    color: string = ''
    otherColor: string = ''
    item: IUniqueItemWithColor | null = null
    keyword: string = ''

    constructor(manager: UniqueList<IUniqueItemWithColor>) {
        this.manager = manager
    }

    get list() {
        if (!this.manager) {
            return []
        }

        if (this.keyword) {
            return filter(this.keyword, this.manager.list)
        }
        if (this.color) {
            return this.manager.list.filter(item => item.color === this.color)
        }
        return this.manager.list
    }
}
