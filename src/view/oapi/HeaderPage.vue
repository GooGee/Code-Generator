<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar" title="Header"></SideBar>
        </div>

        <div class="col-9">
            <Header v-if="sss.sidebar.item" :item="sss.sidebar.item" :manager="sss.sidebar.manager"></Header>
        </div>
    </div>
</template>

<script>
import sss from '@/state.js'
import Header from './specification/Header.vue'
import SideBar from '../part/SideBar.vue'

export default {
    name: 'HeaderPage',
    components: {
        Header,
        SideBar,
    },
    data() {
        return {
            sss,
        }
    },
    created() {
        sss.show('Header')
    },
}
</script>
