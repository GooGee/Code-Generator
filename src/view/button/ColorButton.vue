<template>
    <span
        :style="{ 'background-color': bg, 'border-color': bColor }"
        class="color-button"
        :class="{ empty: color === '' }"
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
        bColor() {
            if (this.color === '') {
                if (this.active) {
                    return '#333'
                }
                return '#eee'
            }
            return this.color
        },
    },
}
</script>

<style>
.color-button {
    display: inline-block;
    border: solid 4px lightgray;
    border-radius: 50%;
    cursor: pointer;
    width: 33px;
    height: 33px;
    margin: 3px;
}

.color-button.empty {
    background: linear-gradient(
        to top left,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) calc(50% - 3px),
        #f00 50%,
        rgba(0, 0, 0, 0) calc(50% + 3px),
        rgba(0, 0, 0, 0) 100%
    );
}
</style>
