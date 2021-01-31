import Project from '../Schema/Project'
import Response from '../Bridge/Response'
import { ActionEnum } from '../Bridge/ActionEnum'

export default class Save {
    private static last = ''

    static readonly FileName = 'code-generator/data.json'

    static run(project: Project) {
        const text = JSON.stringify(project)
        if (text === this.last) {
            return ''
        }

        this.last = text
        return text
    }

    static get fake() {
        return new Response(ActionEnum.write, this.FileName, '', 'Nothing changed', 200)
    }

}
