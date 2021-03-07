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
            <slot></slot>
            <tr>
                <td class="text-right">color</td>
                <td>
                    <ColorPanel :color.sync="item.color"></ColorPanel>
                </td>
            </tr>
            <tr>
                <td class="text-right">tableName</td>
                <td>
                    <ChangeButton :item="item" name="tableName"></ChangeButton>
                </td>
            </tr>
            <tr>
                <td class="text-right">script</td>
                <td>
                    <EditButton :file="file" :content="item.script" @save="save" class="mr11" />
                    <ScriptGuide></ScriptGuide>
                </td>
            </tr>
            <tr>
                <td class="text-right">routeDomain</td>
                <td>
                    <b-form-input v-model="item.routeDomain"></b-form-input>
                </td>
            </tr>
            <tr>
                <td class="text-right">routeName</td>
                <td>
                    <b-form-input v-model="item.routeName"></b-form-input>
                </td>
            </tr>
            <tr>
                <td class="text-right">routePrefix</td>
                <td>
                    <b-form-input v-model="item.routePrefix"></b-form-input>
                </td>
            </tr>
            <tr>
                <td class="text-right">description</td>
                <td>
                    <b-form-textarea v-model="item.description" rows="3"></b-form-textarea>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import ChangeButton from '../button/ChangeButton.vue'
import ColorPanel from '../button/ColorPanel.vue'
import EditButton from '../button/EditButton.vue'
import ScriptGuide from './ScriptGuide.vue'

export default {
    name: 'EntityProperty',
    components: {
        ChangeButton,
        ColorPanel,
        EditButton,
        ScriptGuide,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        file() {
            return `script/entity-${this.item.name}.js`
        },
    },
    methods: {
        save(ok, text) {
            if (ok) {
                this.item.script = text
            }
        },
    },
}
</script>
