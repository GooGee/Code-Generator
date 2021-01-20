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
                <td>{{ layer.getClassName(entity) }}</td>
                <td>
                    <b-button-group class="mr11">
                        <WriteButton :entity="entity" :layer="layer"></WriteButton>
                        <RenderButton :entity="entity" :layer="layer"></RenderButton>
                    </b-button-group>

                    <span>{{ layer.getFileName(entity) }}</span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
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
    props: {
        layerxx: {
            type: Array,
            required: true,
        },
        project: {
            type: Object,
            required: true,
        },
        entity: {
            type: Object,
            required: true,
        },
    },
}
</script>
