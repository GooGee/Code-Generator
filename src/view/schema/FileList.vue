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
            <tr v-for="name in layerxx" :key="name">
                <td>{{ name }}</td>
                <td>{{ map.get(name).getClassName(entity) }}</td>
                <td>
                    <b-button-group class="mr11">
                        <WriteButton :entity="entity" :layer="map.get(name)"></WriteButton>
                        <RenderButton :entity="entity" :layer="map.get(name)"></RenderButton>
                    </b-button-group>

                    <span>{{ map.get(name).getFileName(entity) }}</span>
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
        map: {
            type: Map,
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
    created() {
        Array.from(this.map.keys()).forEach((name) => {
            const layer = this.map.get(name)
            if (layer.single) {
                return
            }
            this.layerxx.push(name)
        })
    },
    data() {
        return {
            layerxx: [],
        }
    },
}
</script>
