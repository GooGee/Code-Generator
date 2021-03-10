<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3 class="inline mr11">HTML</h3>
            <span>field html</span>
        </caption>
        <thead>
            <tr>
                <th class="text-right">name</th>
                <th>edit</th>
                <th>index</th>
                <th>show</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="field in sss.sidebar.item.fieldManager.list" :key="field.name">
                <td class="text-right">{{ field.name }}</td>
                <td>
                    <select v-model="field.htmlEdit" class="form-control inline wa">
                        <option value="">----</option>
                        <option v-for="item in htmlxx" :value="item.name" :key="item.name">{{ item.name }}</option>
                    </select>
                </td>
                <td>
                    <select v-model="field.htmlIndex" class="form-control inline wa">
                        <option value="">----</option>
                        <option v-for="item in htmlxx" :value="item.name" :key="item.name">{{ item.name }}</option>
                    </select>
                </td>
                <td>
                    <select v-model="field.htmlShow" class="form-control inline wa">
                        <option value="">----</option>
                        <option v-for="item in htmlxx" :value="item.name" :key="item.name">{{ item.name }}</option>
                    </select>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import sss from '@/state.js'

export default {
    name: 'HtmlList',
    data() {
        return {
            sss,
            htmlxx: sss.getPreset('FieldHTML').propertyManager.list,
        }
    },
}
</script>
