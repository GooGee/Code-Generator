
<template>
    <b-button @click="run" :disabled="waiting" variant="outline-success">
        <b-spinner v-if="waiting" small></b-spinner>
        Refresh
    </b-button>
</template>

<script>
import sss from '@/state.js'

export default {
    name: 'RefreshButton',
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
                sss.route.refresh((response) => {
                    this.waiting = false
                    this.$root.$bvToast.toast(response.message, {
                        title: 'i',
                        variant: 'success',
                        autoHideDelay: 1222,
                        solid: true,
                    })
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
