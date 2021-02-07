<template>
    <b-nav tabs>
        <b-nav-item v-for="item in list" :key="item.name" :active="tab === item.name" @click="$emit('show', item.name)">
            {{ item.name }}
        </b-nav-item>
    </b-nav>
</template>

<script>
export default {
    name: 'TabList',
    props: {
        list: {
            type: Array,
            required: true,
        },
        tab: {
            type: String,
            required: false,
            default: 'name',
        },
    },
}
</script>
