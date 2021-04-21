import Project from '../Schema/Project'
import Response from '../Bridge/Response'
import { ActionEnum } from '../Bridge/ActionEnum'
import IHandler from '../Bridge/IHandler'
import Route from '../Bridge/Route'
import { CGFolder } from './File'

const BackupFolder = CGFolder + '/backup'
const FileName = CGFolder + '/data.json'

export default class Save {
    static last = ''

    static run(project: Project, route: Route, handler?: IHandler) {
        if (project === null) {
            return
        }
        const text = JSON.stringify(project)
        if (text === this.last) {
            if (handler) {
                handler(Save.fake)
            }
            return
        }

        this.last = text
        route.move(FileName, this.makeName())
        route.write(FileName, text, handler)
    }

    private static get fake() {
        return new Response(ActionEnum.write, FileName, '', 'Nothing changed', 200)
    }

    private static makeName() {
        const dt = new Date().toISOString().substr(0, 19).replace('T', ' ').replace(':', '.').replace(':', '.')
        return BackupFolder + '/data.' + dt + '.json'
    }

}
