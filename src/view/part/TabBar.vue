<template>
    <b-nav tabs>
        <b-nav-item
            v-for="item in route.children"
            :key="item.path"
            :to="route.path + '/' + item.path"
            exact-active-class="active"
        >
            {{ item.path }}
        </b-nav-item>
    </b-nav>
</template>

<script>
export default {
    name: 'TabBar',
    props: {
        route: {
            type: Object,
            required: true,
        },
    },
}
</script>
