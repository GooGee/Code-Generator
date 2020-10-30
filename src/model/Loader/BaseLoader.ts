import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'

export default class BaseLoader {

    loadList(source: UniqueItem[], manager: UniqueList<UniqueItem>) {
        source.forEach(data => {
            if (manager.find(data.name) === undefined) {
                const item = manager.make(data.name)
                item.load(data)
                manager.add(item)
            }
        })
    }

    replace(source: UniqueList<UniqueItem>, manager: UniqueList<UniqueItem>) {
        manager.clear()
        manager.load(source)
    }

}
