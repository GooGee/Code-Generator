<template>
    <div>
        <b-button-group v-for="mw in manager.list" :key="mw.name" class="inline mr11">
            <DeleteButton :manager="manager" :item="mw"></DeleteButton>
            <b-button variant="outline-secondary"> {{ mw.name }} </b-button>
        </b-button-group>

        <b-button @click="add" variant="outline-primary"> + </b-button>
    </div>
</template>

<script>
import DeleteButton from '../button/DeleteButton.vue'
import sss from '@/state.js'

export default {
    name: 'MiddlewareList',
    components: {
        DeleteButton,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    methods: {
        add() {
            const list = sss.getPreset('Middleware').propertyManager.list
            sss.listDialogue.showList(list, 'Select a Middleware', () => {
                try {
                    const selected = sss.listDialogue.selected
                    const field = this.manager.make(selected.name)
                    this.manager.add(field)
                } catch (error) {
                    this.$root.$bvToast.toast(error.message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                }
            })
        },
    },
}
</script>
