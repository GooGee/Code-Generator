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
        type: {
            type: String,
            required: false,
            default: 'schemas',
        },
    },
    methods: {
        show() {
            const manager = sss.project.document.component.schemaManager
            const list = manager.list.filter(schema => schema.type === this.type)
            sss.listDialogue.showList(list, 'Select a ' + this.type, () => {
                const selected = sss.listDialogue.selected
                this.reference.name = selected.name
            })
        },
    },
}
</script>
