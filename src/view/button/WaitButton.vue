<template>
    <b-button @click="$emit('run')" :disabled="waiting" variant="outline-success">
        <b-spinner v-if="waiting" small></b-spinner>
        <slot></slot>
    </b-button>
</template>

<script>
export default {
    name: 'WaitButton',
    props: {
        waiting: {
            type: Boolean,
            required: true,
        },
    },
}
</script>
