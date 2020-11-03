<template>
    <b-button @click="change" variant="outline-primary"> {{ item[name] }} </b-button>
</template>

<script>
import sss from '@/state.js'

export default {
    name: 'ChangeButton',
    props: {
        item: {
            type: Object,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    methods: {
        change() {
            sss.nameDialogue.showInput(`Please input the ${this.name}`, this.item[this.name], (ok, text) => {
                if (ok) {
                    if (text === '') {
                        this.$root.$bvToast.toast(`${this.name} cannot be empty`, {
                            title: 'i',
                            variant: 'danger',
                            solid: true,
                        })
                    } else {
                        this.item[this.name] = text
                    }
                }
            })
        },
    },
}
</script>
