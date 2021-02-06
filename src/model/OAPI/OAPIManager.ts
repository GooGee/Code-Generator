import UniqueList from '../Base/UniqueList'
import IKeyValue from '../Base/IKeyValue'
import OAPIItem from './OAPIItem'

export default class OAPIManager<T extends OAPIItem> extends UniqueList<T> {

    load(manager: OAPIManager<T>) {
        manager.list.forEach(item => {
            const iii = this.make(item.name)
            iii.load(item)
            this.add(iii)
        })
    }

    toOAPI() {
        const map: IKeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toOAPI()
        })
        return map
    }

}
