<template>
    <div>
        <div class="text-center" style="margin-top: 11%;">
            <img v-if="sss.ready" alt="logo" src="@/assets/logo.svg" style="width: 222px;" />
            <img v-else alt="loading" src="@/assets/loading.svg" class="mb11" />
            <h1>Code Generator</h1>
            <p>{{ version }}</p>
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
        }
    },
}
</script>
