<template>
    <div class="pre-scrollable position-fixed" style="max-height: 90%; height: 90vh">
        <div class="text-center mtb11">
            <h2 style="min-width: 333px">Layer</h2>
        </div>

        <b-input-group class="mb11">
            <b-form-input v-model="sidebar.keyword" placeholder="Search"></b-form-input>
            <b-input-group-append @click="visible = !visible">
                <ColorButton :color="sidebar.color" :active="true"></ColorButton>
            </b-input-group-append>
        </b-input-group>

        <div v-if="visible" class="mb11">
            <ColorPanel :color.sync="sidebar.color" style="margin: auto"></ColorPanel>
        </div>

        <div v-if="sidebar.keyword || sidebar.color" class="list-group">
            <div
                v-for="item in sidebar.list"
                :key="item.name"
                @click="$emit('show', item)"
                :class="Object.is(sidebar.item, item) ? 'active' : ''"
                class="list-group-item list-group-item-action"
            >
                {{ item.name }}
            </div>
        </div>

        <TreeRoot v-else v-on="$listeners" :root="folder"></TreeRoot>
    </div>
</template>

<script>
import ColorButton from '../button/ColorButton.vue'
import ColorPanel from '../button/ColorPanel.vue'
import TreeRoot from './TreeRoot.vue'

export default {
    name: 'TreeBar',
    components: {
        ColorButton,
        ColorPanel,
        TreeRoot,
    },
    props: {
        sidebar: {
            type: Object,
            required: true,
        },
        folder: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            visible: false,
        }
    },
}
</script>
