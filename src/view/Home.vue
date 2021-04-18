<template>
    <div class="text-center" style="margin-top: 11%">
        <img v-if="sss.ready" alt="logo" src="@/assets/logo.svg" style="width: 222px" />
        <img v-else alt="loading" src="@/assets/loading.svg" class="mb11" />
        <h1>Code Generator</h1>
        <p>{{ version }}</p>

        <div v-if="sss.error">
            <p class="red">Data is not compatible with this version!</p>
            <div>To fix this, do one of the following:</div>
            <div>- downgrade plugin to v2 and restart IDE</div>
            <div>
                - or abandon all data in Layer page and
                <b-button @click="upgrade" variant="outline-danger"> Upgrade </b-button>
            </div>
        </div>

        <p v-if="sss.inBrowser" class="mt11">
            <span @click="add" class="btn btn-outline-primary"> New </span>
        </p>
    </div>
</template>

<script>
import sss from '../state.js'

export default {
    name: 'Home',
    data() {
        return {
            sss,
            version: process.env.VUE_APP_VERSION,
        }
    },
    methods: {
        add() {
            const response = {
                action: 'load',
                key: 'project',
                data: '',
                message: '',
                status: 200,
            }
            window.bridge.call(response)
        },
        upgrade() {
            this.$bvModal
                .msgBoxConfirm('This will abandon all data in Layer page, Continue?', {
                    title: 'Warning',
                    headerClass: 'border-bottom-0',
                    footerClass: 'border-top-0',
                    centered: true,
                })
                .then((value) => {
                    if (value) {
                        sss.upgrade()
                        sss.error = null
                    }
                })
                .catch((error) => {
                    this.$root.$bvToast.toast(error.message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                })
        },
    },
}
</script>
