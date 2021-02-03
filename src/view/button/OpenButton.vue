<template>
    <b-button @click="run" :disabled="waiting" variant="link">
        <slot></slot>
    </b-button>
</template>

<script>
import sss from '@/state.js'

export default {
    name: 'OpenButton',
    props: {
        file: {
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
                sss.route.open(this.file, response => {
                    this.waiting = false
                    console.log(response.message)
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
