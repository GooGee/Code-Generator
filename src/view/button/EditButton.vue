<template>
    <b-button @click="run" :disabled="waiting" variant="outline-success">
        <b-spinner v-if="waiting" small></b-spinner>
        Edit
    </b-button>
</template>

<script>
import sss from '@/state.js'
import { getPath } from '@/model/Service/File.ts'

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
        callback: {
            type: Function,
            required: false,
            default: null,
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
                const file = getPath(this.file)
                sss.route.edit(file, this.content, (response) => {
                    this.waiting = false
                    if (response.status === 200) {
                        if (this.callback) {
                            this.callback(response.status === 200, response.data)
                        }
                    } else {
                        this.$root.$bvToast.toast(response.message, {
                            title: 'i',
                            variant: 'danger',
                            solid: true,
                        })
                    }
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
