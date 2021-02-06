<template>
    <b-button @click="show" :variant="reference.name ? 'outline-primary' : 'outline-danger'">
        {{ reference.text }}
    </b-button>
</template>

<script>
import sss from '@/state.js'

export default {
    name: 'Reference',
    props: {
        reference: {
            type: Object,
            required: true,
        },
    },
    methods: {
        show() {
            const manager = sss.project.document.getManager(this.reference.type)
            sss.listDialogue.showList(manager.list, 'Select a ' + this.reference.type, () => {
                const selected = sss.listDialogue.selected
                this.reference.name = selected.name
            })
        },
    },
}
</script>
