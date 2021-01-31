import Project from '../Schema/Project'
import Response from '../Bridge/Response'
import { ActionEnum } from '../Bridge/ActionEnum'
import IHandler from '../Bridge/IHandler'
import Route from '../Bridge/Route'

export default class Save {
    private static last = ''

    static readonly FileName = 'code-generator/data.json'

    static run(project: Project, route: Route, handler?: IHandler) {
        const text = JSON.stringify(project)
        if (text === this.last) {
            if (handler) {
                handler(Save.fake)
            }
            return
        }

        this.last = text
        route.write(Save.FileName, text, handler)
    }

    private static get fake() {
        return new Response(ActionEnum.write, Save.FileName, '', 'Nothing changed', 200)
    }

}
