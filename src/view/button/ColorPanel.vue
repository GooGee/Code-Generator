<template>
    <div id="ColorPanel" style="width: 244px;">
        <span @click="$emit('update:color', '')" :class="{ active: '' === color }" class="button empty"></span>
        <span
            v-for="item in list"
            :key="item"
            :style="'background-color:' + item"
            @click="$emit('update:color', item)"
            class="button"
            :class="{ active: item === color, white: item === '#fff' }"
        ></span>
    </div>
</template>

<script>
export default {
    name: 'ColorPanel',
    props: {
        color: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            list: ['#f00', '#f80', '#ff0', '#80f', '#f0f', '#fff', '#0f0', '#0ff', '#00f', '#08f', '#888'],
        }
    },
}
</script>

<style>
#ColorPanel .button {
    display: inline-block;
    border-radius: 50%;
    cursor: pointer;
    width: 33px;
    height: 33px;
    margin: 3px;
}

#ColorPanel .button.white {
    border: solid 1px lightgray;
}

#ColorPanel .button.active {
    border: solid 5px black;
}

#ColorPanel .button.empty {
    border: solid 1px lightgray;
    background: linear-gradient(
        to top left,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) calc(50% - 3px),
        #f00 50%,
        rgba(0, 0, 0, 0) calc(50% + 3px),
        rgba(0, 0, 0, 0) 100%
    );
}

#ColorPanel .button.empty.active {
    border: solid 5px black;
}
</style>
