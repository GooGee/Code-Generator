import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'
import { MiddlewareManager } from './Middleware'

export default class Route extends UniqueItem {
    action: string = ''
    path: string = ''
    routeName: string = ''
    readonly middlewareManager = new MiddlewareManager()
}

export class RouteManager extends UniqueList<Route> {
    constructor() {
        super(Route)
    }
}
