import Dialogue from './Dialogue'

export default class NameDialogue extends Dialogue {
    size: string = 'sm'
    text: string = ''

    showInput(title: string, text = '', callback: CallableFunction | null = null) {
        this.title = title
        this.text = text
        this.callback = callback
        this.visible = true
    }

}
