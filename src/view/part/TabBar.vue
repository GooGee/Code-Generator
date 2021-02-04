<template>
    <b-nav tabs>
        <b-nav-item v-for="item in list" :key="item" :active="tab === item" @click="$emit('show', item)">
            {{ item }}
        </b-nav-item>
    </b-nav>
</template>

<script>
export default {
    name: 'TabBar',
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
