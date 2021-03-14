<template>
    <span
        :style="{ 'background-color': bg, 'border-color': border }"
        :class="{ active: active }"
        class="color-button"
    ></span>
</template>

<script>
export default {
    name: 'ColorButton',
    props: {
        color: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        bg() {
            if (this.color === '') {
                return '#fff'
            }
            if (this.active) {
                return this.color
            }
            return '#fff'
        },
        border() {
            if (this.color === '') {
                return '#333'
            }
            return this.color
        },
    },
}
</script>

<style>
.color-button {
    display: inline-block;
    border-radius: 50%;
    border-style: solid;
    border-width: 4px;
    cursor: pointer;
    width: 33px;
    height: 33px;
    margin: 3px;
    opacity: 0.2;
}

.color-button.active {
    opacity: 1;
}
</style>
