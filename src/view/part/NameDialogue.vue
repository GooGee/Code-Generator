<template>
    <b-modal
        v-model="dialogue.visible"
        :title="dialogue.title"
        headerClass="border-bottom-0"
        footerClass="border-top-0"
        @ok="close(true)"
        @cancel="close(false)"
    >
        <b-form-input v-model="dialogue.text" autofocus></b-form-input>
    </b-modal>
</template>

<script>
import sss from '@/state.js'

export default {
    name: 'NameDialogue',
    data() {
        return {
            dialogue: sss.nameDialogue,
        }
    },
    methods: {
        close(ok) {
            if (this.dialogue.callback) {
                this.dialogue.callback(ok, this.dialogue.text)
            }
        },
    },
}
</script>
