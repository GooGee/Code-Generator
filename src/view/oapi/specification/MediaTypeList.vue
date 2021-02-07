<template>
    <div>
        <SelectButton :list="typexx" :callback="add" class="wa"></SelectButton>

        <TabList :tab="tab" :list="manager.list" @show="show" class="mt11"></TabList>

        <MediaType v-if="item" :item="item" :manager="manager"></MediaType>
    </div>
</template>

<script>
import sss from '@/state.js'
import MediaType from './MediaType.vue'
import SelectButton from '@/view/button/SelectButton.vue'
import TabList from '@/view/part/TabList.vue'

export default {
    name: 'MediaTypeList',
    components: {
        MediaType,
        SelectButton,
        TabList,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            tab: '',
            typexx: [],
        }
    },
    computed: {
        item() {
            return this.manager.find(this.tab)
        },
    },
    created() {
        this.typexx = sss.project.getPreset('MediaType').propertyManager.list
    },
    methods: {
        add(type) {
            const item = this.manager.make(type)
            this.manager.add(item)
        },
        show(tab) {
            this.tab = tab
        },
    },
}
</script>
