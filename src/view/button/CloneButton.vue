<template>
    <b-button @click="clone" variant="outline-primary">
        Clone
    </b-button>
</template>

<script>
import sss from '@/state.js'

export default {
    name: 'CloneButton',
    props: {
        manager: {
            type: Object,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
    },
    methods: {
        clone() {
            sss.nameDialogue.showInput('Please input the name', this.item.name, (ok, text) => {
                if (ok) {
                    if (text === '') {
                        this.$root.$bvToast.toast('name cannot be empty', {
                            title: 'i',
                            variant: 'danger',
                            solid: true,
                        })
                        return
                    }
                    try {
                        const one = this.manager.make(text)
                        one.load(this.item)
                        one.name = text
                        this.manager.add(one)
                    } catch (error) {
                        this.$root.$bvToast.toast(error.message, {
                            title: 'i',
                            variant: 'danger',
                            solid: true,
                        })
                    }
                }
            })
        },
    },
}
</script>
