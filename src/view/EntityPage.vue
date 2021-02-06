<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar" title="Entity"></SideBar>
        </div>

        <div v-if="sss.sidebar.item" class="col-9">
            <TabBar :route="route" class="mt11"></TabBar>

            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import sss from '../state.js'
import SideBar from './part/SideBar.vue'
import TabBar from './part/TabBar.vue'

export default {
    name: 'EntityPage',
    components: {
        SideBar,
        TabBar,
    },
    data() {
        return {
            sss,
        }
    },
    computed: {
        route() {
            return this.$router.options.routes.find(route => route.name === 'entity')
        },
    },
    created() {
        sss.showEntity()
    },
}
</script>
