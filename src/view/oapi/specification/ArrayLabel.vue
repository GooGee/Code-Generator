<template>
    <b-form-checkbox v-model="schema.isArray" :value="true" :unchecked-value="false" class="inline">
        <span :class="{ gray: !schema.isArray }" class="array-label">Array</span>
    </b-form-checkbox>
</template>

<script>
export default {
    name: 'ArrayLabel',
    props: {
        schema: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style>
.array-label.gray {
    color: lightgray;
}
</style>
