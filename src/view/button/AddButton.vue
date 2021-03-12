<template>
    <b-button @click="add" variant="outline-primary"> + </b-button>
</template>

<script>
import sss from '@/state.js'

export default {
    name: 'AddButton',
    props: {
        manager: {
            type: Object,
            required: true,
        },
        name: {
            type: String,
            required: false,
            default: 'name',
        },
        value: {
            type: String,
            required: false,
            default: 'name',
        },
    },
    methods: {
        add() {
            if (this.name) {
                sss.nameDialogue.showInput(`Please input the ${this.name}`, this.value, (ok, text) => {
                    if (ok) {
                        if (text === '') {
                            this.$root.$bvToast.toast(`${this.name} cannot be empty`, {
                                title: 'i',
                                variant: 'danger',
                                solid: true,
                            })
                        } else {
                            this.make(text)
                        }
                    }
                })
            } else {
                this.make(Math.random())
            }
        },
        make(value) {
            try {
                const item = this.manager.make(value)
                if (this.name === '') {
                    item.name = value
                }
                this.manager.add(item)
                this.$emit('added', item)
            } catch (error) {
                this.$root.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
    },
}
</script>
