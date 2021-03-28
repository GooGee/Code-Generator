<template>
    <div id="app" style="margin-bottom: 33px">
        <Bar :ready="sss.ready"></Bar>
        <div class="container-fluid" style="margin-top: 55px">
            <router-view></router-view>
        </div>
        <InputDialogue></InputDialogue>
        <ListDialogue></ListDialogue>
        <NameDialogue></NameDialogue>
        <Top></Top>
    </div>
</template>

<script>
import makeBridge from './helper/makeBridge'
import Bar from './view/part/Bar.vue'
import InputDialogue from './view/part/InputDialogue.vue'
import ListDialogue from './view/part/ListDialogue.vue'
import NameDialogue from './view/part/NameDialogue.vue'
import Top from './view/part/Top.vue'
import sss from './state.js'

export default {
    name: 'App',
    components: {
        Bar,
        InputDialogue,
        ListDialogue,
        NameDialogue,
        Top,
    },
    data() {
        return {
            sss,
        }
    },
    created() {
        const sp = new URLSearchParams(window.location.search)
        const ide = sp.get('ide')
        if (ide === null) {
            makeBridge(window)
            return
        }

        sss.ide = ide
    },
}
</script>
