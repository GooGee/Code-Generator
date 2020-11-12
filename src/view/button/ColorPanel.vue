<template>
    <div style="width: 244px;">
        <span v-for="item in list" :key="item" @click="$emit('update:color', item)">
            <ColorButton :color="item" :active="item === color"></ColorButton>
        </span>
    </div>
</template>

<script>
import ColorButton from './ColorButton.vue'

export default {
    name: 'ColorPanel',
    components: {
        ColorButton,
    },
    props: {
        color: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            list: ['', '#f00', '#f80', '#ff0', '#80f', '#f0f', '#fff', '#0f0', '#0ff', '#00f', '#08f', '#888'],
        }
    },
}
</script>
