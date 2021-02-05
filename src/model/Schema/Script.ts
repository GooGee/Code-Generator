import UniqueItem from '../Base/UniqueItem'

export default class Script extends UniqueItem {
    code: string = ''

    get file() {
        return `script/${this.name}.js`
    }
}
