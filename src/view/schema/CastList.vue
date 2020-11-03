<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3 class="inline mr11">Cast</h3>
            <span>cast database type to PHP type (e.g. timestamp to Carbon)</span>
        </caption>
        <thead>
            <tr>
                <th width="222px" class="text-right">Field</th>
                <th width="66px">Fillable</th>
                <th width="66px">Hidden</th>
                <th width="120px">Type</th>
                <th>Cast</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="field in manager.list" :key="field.name">
                <td class="text-right">{{ field.name }}</td>
                <td>
                    <b-form-checkbox v-model="field.fillable"></b-form-checkbox>
                </td>
                <td>
                    <b-form-checkbox v-model="field.hidden"></b-form-checkbox>
                </td>
                <td>{{ field.type }}</td>
                <td>
                    <b-input-group>
                        <b-input-group-prepend>
                            <b-button @click="select(field)" variant="outline-primary"> + </b-button>
                        </b-input-group-prepend>
                        <b-form-input v-model="field.cast"></b-form-input>
                    </b-input-group>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import sss from '@/state.js'

export default {
    name: 'CastList',
    computed: {
        manager() {
            return sss.sidebar.item.fieldManager
        },
    },
    methods: {
        select(field) {
            const list = sss.getPreset('CastPHP').propertyManager.list
            sss.listDialogue.showList(list, 'Select a Type', () => {
                field.cast = sss.listDialogue.selected.name
            })
        },
    },
}
</script>
