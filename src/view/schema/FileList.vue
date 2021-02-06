<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3 class="inline mr11">File</h3>
            <span class="mr11">generate PHP file</span>
            <RefreshButton></RefreshButton>
        </caption>
        <thead>
            <tr>
                <th>Layer</th>
                <th>Class name</th>
                <th>File name</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="layer in layerxx" :key="layer.name">
                <td>{{ layer.name }}</td>
                <td>{{ layer.getClassName(sss.sidebar.item) }}</td>
                <td>
                    <b-button-group class="mr11">
                        <WriteButton :entity="sss.sidebar.item" :layer="layer"></WriteButton>
                        <RenderButton :entity="sss.sidebar.item" :layer="layer"></RenderButton>
                    </b-button-group>

                    <span>{{ layer.getFileName(sss.sidebar.item) }}</span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import sss from '@/state.js'
import RefreshButton from '../button/RefreshButton.vue'
import RenderButton from '../button/RenderButton.vue'
import WriteButton from '../button/WriteButton.vue'

export default {
    name: 'FileList',
    components: {
        RefreshButton,
        RenderButton,
        WriteButton,
    },
    data() {
        return {
            sss,
        }
    },
    computed: {
        layerxx() {
            return sss.project.layerManager.list.filter(layer => layer.single === false)
        },
    },
}
</script>
