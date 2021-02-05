import IOAPI from './IOAPI'
import IKeyValue from '../Base/IKeyValue'
import UniqueItem from '../Base/UniqueItem'

export default abstract class OAPIItem extends UniqueItem implements IOAPI {

    abstract toOAPI(): IKeyValue

}
