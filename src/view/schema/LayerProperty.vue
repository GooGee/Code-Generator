<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3>Property</h3>
        </caption>
        <thead>
            <tr>
                <th class="text-right" style="width: 122px;">name</th>
                <th>value</th>
            </tr>
        </thead>
        <tbody>
            <slot></slot>
            <tr>
                <td class="text-right">single</td>
                <td>
                    <b-form-checkbox v-model="item.single" switch class="mr11 wa inline"></b-form-checkbox>
                    <WriteButton v-if="item.single" :layer="item"></WriteButton>
                </td>
            </tr>
            <tr>
                <td class="text-right">color</td>
                <td>
                    <ColorButton :color.sync="item.color"></ColorButton>
                </td>
            </tr>
            <tr>
                <td class="text-right">class name</td>
                <td>
                    <b-form-input v-model="item.classPattern"></b-form-input>
                </td>
            </tr>
            <tr>
                <td class="text-right">file name</td>
                <td>
                    <b-form-input v-model="item.filePattern"></b-form-input>
                </td>
            </tr>
            <tr>
                <td class="text-right">name space</td>
                <td>
                    <b-form-input v-model="item.nsPattern"></b-form-input>
                </td>
            </tr>
            <tr>
                <td class="text-right">path pattern</td>
                <td>
                    <b-form-input v-model="item.pathPattern"></b-form-input>
                </td>
            </tr>
            <tr>
                <td class="text-right">script</td>
                <td>
                    <EditButton :title="titleScript" :content="item.script" @save="saveScript"></EditButton>
                </td>
            </tr>
            <tr>
                <td class="text-right">template</td>
                <td>
                    <EditButton :title="titleTemplate" :content="item.template" @save="saveTemplate"></EditButton>
                </td>
            </tr>
            <tr>
                <td class="text-right">description</td>
                <td>
                    <b-form-textarea v-model="item.description" rows="11"></b-form-textarea>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import ColorButton from '../button/ColorButton.vue'
import EditButton from '../button/EditButton.vue'
import WriteButton from '../button/WriteButton.vue'

export default {
    name: 'LayerProperty',
    components: {
        ColorButton,
        EditButton,
        WriteButton,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            titleScript: `Layer ${this.item.name} Script`,
            titleTemplate: `Layer ${this.item.name} Template`,
        }
    },
    methods: {
        saveScript(ok, text) {
            if (ok) {
                this.item.script = text
            }
        },
        saveTemplate(ok, text) {
            if (ok) {
                this.item.template = text
            }
        },
    },
}
</script>
