<template>
    <span
        :style="'background-color:' + color"
        class="color-button"
        :class="{ active: active, empty: color === '', white: color === '#fff' }"
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
}
</script>

<style>
.color-button {
    display: inline-block;
    border-radius: 50%;
    cursor: pointer;
    width: 33px;
    height: 33px;
    margin: 3px;
}

.color-button.empty,
.color-button.white {
    border: solid 1px lightgray;
}

.color-button.active {
    border: solid 5px black;
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
