<template>
    <div>
        <div>
            <b-button @click="show" variant="outline-primary"> + </b-button>
        </div>
        <EditList :manager="manager" :withadd="false" :withedit="false"></EditList>
    </div>
</template>

<script>
import sss from '@/state.js'
import EditList from '@/view/part/EditList.vue'

export default {
    name: 'ReferenceList',
    components: {
        EditList,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        type: {
            type: String,
            required: false,
            default: '',
        },
    },
    methods: {
        show() {
            const manager = sss.project.document.getManager(this.type)
            sss.listDialogue.showList(manager.list, 'Select a ' + this.type, () => {
                const selected = sss.listDialogue.selected
                const item = this.manager.make(selected.name, this.type)
                this.manager.add(item)
            })
        },
    },
}
</script>
