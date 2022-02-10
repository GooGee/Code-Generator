import nunjucks from 'nunjucks'
import UniqueItem from '../Base/UniqueItem'
import { DataForScript } from '../DataForScript'

nunjucks.configure({ autoescape: false })

export const script = 'function run(data) {\n    /** @type {DataForScript} */\n    const ddd = data\n\n    /**\n     * write code below\n     * it will be executed before generating files of the Entity\n     */\n}\n'

export function addQuote(text: any, quote: string = "'") {
    if (hasQuote(text)) {
        return text
    }
    return `${quote}${text}${quote}`
}

export function runText(text: string, data: Object): string {
    const names = Object.keys(data)
    const values = Object.values(data)
    return new Function(...names, `return \`${text}\`;`)(...values)
}

export function filter(keyword: string, list: Array<UniqueItem>) {
    const re = new RegExp(keyword, 'i')
    return list.filter(item => item.name.search(re) > -1)
}

export function hasQuote(text: any) {
    if (typeof text === 'string') {
        if (text.length < 2) {
            return false
        }
        if (text[0] === "'" && text[text.length - 1] === "'") {
            return true
        }
        if (text[0] === '"' && text[text.length - 1] === '"') {
            return true
        }
    }

    return false
}

export function numberOrQuote(text: any) {
    if (isNaN(parseFloat(text))) {
        return addQuote(text)
    }
    return text
}

export function render(template: string, data: DataForScript) {
    return nunjucks.renderString(template, data)
}

export function run(code: string, data: object) {
    if (code) {
        const fff = new Function('return ' + code)()
        fff(data)
    }
}

export function runAndRender(data: DataForScript) {
    let message = 'Failed to run script of project'
    try {
        run(data.project.script, data)

        message = 'Failed to run script of entity ' + data.entity.name
        run(data.entity.script, data)

        message = 'Failed to run script of layer ' + data.layer.name
        run(data.layer.script, data)

        message = 'Failed to render template of ' + data.layer.name
        return render(data.layer.template, data)
    } catch (error) {
        throw new Error(message + ': ' + error.message)
    }
}
