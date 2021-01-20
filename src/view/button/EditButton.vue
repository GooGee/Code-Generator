<template>
    <b-button @click="run" :disabled="waiting" variant="outline-success">
        <b-spinner v-if="waiting" small></b-spinner>
        Edit
    </b-button>
</template>

<script>
import sss from '@/state.js'

export default {
    name: 'EditButton',
    props: {
        file: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            waiting: false,
        }
    },
    methods: {
        run() {
            if (this.waiting) {
                return
            }

            this.waiting = true
            try {
                const file = 'code-generator/' + this.file
                sss.bridge.edit(file, this.content, (ok, text) => {
                    this.waiting = false
                    this.$emit('save', ok, text)
                })
            } catch (error) {
                this.waiting = false
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
