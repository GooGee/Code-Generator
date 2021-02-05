import Script from '../Schema/Script'
import UniqueList from '../Base/UniqueList'
import IKeyValue from '../Base/IKeyValue'
import OAPIItem from './OAPIItem'

export default class OAPIManager<T extends OAPIItem> extends UniqueList<T> {
    readonly script = new Script(this.type.name)

    load(manager: OAPIManager<T>) {
        this.script.load(manager.script)
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

    toJSON(key: string) {
        const result = {
            list: this.list,
            script: this.script
        }
        return result
    }

}
