<template>
    <div>
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
            list: ['', '#f00', '#f0f', '#f80', '#ff0', '#0f0', '#0ff', '#00f', '#08f', '#80f'],
        }
    },
}
</script>
