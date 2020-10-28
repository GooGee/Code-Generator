<template>
    <div id="ColorButton" style="width: 222px;">
        <span
            v-for="item in list"
            :key="item"
            :style="'background-color:' + item"
            @click="$emit('update:color', item)"
            class="button inline mr11"
            :class="{ active: item === color, first: item === '#fff' }"
        ></span>
    </div>
</template>

<script>
export default {
    name: 'ColorButton',
    props: {
        color: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            list: ['#fff', '#f00', '#f80', '#ff0', '#f08', '#f0f', '#0f0', '#0ff', '#00f', '#08f'],
        }
    },
}
</script>

<style>
#ColorButton .button {
    border-radius: 50%;
    cursor: pointer;
    width: 33px;
    height: 33px;
}

#ColorButton .button.first {
    border: solid 1px lightgray;
}

#ColorButton .button.active {
    border: solid 5px black;
}
</style>
