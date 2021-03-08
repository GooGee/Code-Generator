<template>
    <div>
        <div class="text-center" style="margin-top: 11%">
            <img v-if="sss.ready" alt="logo" src="@/assets/logo.svg" style="width: 222px" />
            <img v-else alt="loading" src="@/assets/loading.svg" class="mb11" />
            <h1>Code Generator</h1>
            <p>{{ version }}</p>
            <p v-if="isDev">
                <span @click="add" class="btn btn-outline-primary"> New </span>
            </p>
        </div>
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
            isDev: process.env.NODE_ENV === 'development',
        }
    },
    methods: {
        add() {
            function setJavaBridge(cefw) {
                cefw.JavaBridge = {
                    call(text) {
                        const json = JSON.parse(text)
                        console.log(json.data)
                        json.data = ''
                        json.status = 400
                        json.message = 'Echo OK'
                        cefw.bridge.call(json)
                    },
                }

                const response = {
                    action: 'load',
                    key: 'project',
                    data: '',
                    message: '',
                    status: 200,
                }
                cefw.bridge.call(response)
            }

            setJavaBridge(window)
        },
    },
}
</script>
