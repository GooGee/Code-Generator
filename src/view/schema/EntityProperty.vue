<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3>Property</h3>
        </caption>
        <thead>
            <tr>
                <th class="text-right" style="width: 111px;">name</th>
                <th>value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="text-right">name</td>
                <td>
                    <b-button-group class="mr11">
                        <DeleteButton
                            :manager="sss.sidebar.manager"
                            :item="sss.sidebar.item"
                            @deleted="sss.sidebar.item = null"
                        ></DeleteButton>
                        <ChangeButton :item="sss.sidebar.item" name="name"></ChangeButton>
                    </b-button-group>
                    <CloneButton :manager="sss.sidebar.manager" :item="sss.sidebar.item"></CloneButton>
                </td>
            </tr>
            <tr>
                <td class="text-right">color</td>
                <td>
                    <ColorPanel :color.sync="sss.sidebar.item.color"></ColorPanel>
                </td>
            </tr>
            <tr>
                <td class="text-right">tableName</td>
                <td>
                    <ChangeButton :item="sss.sidebar.item" name="tableName"></ChangeButton>
                </td>
            </tr>
            <tr>
                <td class="text-right">script</td>
                <td>
                    <EditButton :file="file" :content="sss.sidebar.item.script" @save="save" class="mr11" />
                    <ScriptGuide></ScriptGuide>
                </td>
            </tr>
            <tr>
                <td class="text-right">routeDomain</td>
                <td>
                    <b-form-input v-model="sss.sidebar.item.routeDomain"></b-form-input>
                </td>
            </tr>
            <tr>
                <td class="text-right">routeName</td>
                <td>
                    <b-form-input v-model="sss.sidebar.item.routeName"></b-form-input>
                </td>
            </tr>
            <tr>
                <td class="text-right">routePrefix</td>
                <td>
                    <b-form-input v-model="sss.sidebar.item.routePrefix"></b-form-input>
                </td>
            </tr>
            <tr>
                <td class="text-right">description</td>
                <td>
                    <b-form-textarea v-model="sss.sidebar.item.description" rows="11"></b-form-textarea>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import sss from '@/state.js'
import ChangeButton from '../button/ChangeButton.vue'
import CloneButton from '../button/CloneButton.vue'
import ColorPanel from '../button/ColorPanel.vue'
import DeleteButton from '../button/DeleteButton.vue'
import EditButton from '../button/EditButton.vue'
import ScriptGuide from './ScriptGuide.vue'

export default {
    name: 'EntityProperty',
    components: {
        ChangeButton,
        CloneButton,
        ColorPanel,
        DeleteButton,
        EditButton,
        ScriptGuide,
    },
    data() {
        return {
            sss,
        }
    },
    computed: {
        file() {
            return `script/entity-${sss.sidebar.item.name}.js`
        },
    },
    methods: {
        save(ok, text) {
            if (ok) {
                sss.sidebar.item.script = text
            }
        },
    },
}
</script>
