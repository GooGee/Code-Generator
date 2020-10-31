<template>
    <WaitButton @run="run" :waiting="waiting"> Edit </WaitButton>
</template>

<script>
import WaitButton from './WaitButton.vue'
import sss from '@/state.js'

export default {
    name: 'EditButton',
    components: {
        WaitButton,
    },
    props: {
        identifier: {
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
            sss.bridge.edit(this.identifier, this.content, (ok, text) => {
                this.waiting = false
                this.$emit('save', ok, text)
            })
        },
    },
}
</script>
