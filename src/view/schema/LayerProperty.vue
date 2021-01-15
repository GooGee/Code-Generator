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
                <td class="text-right">requireName</td>
                <td>
                    <b-form-checkbox v-model="item.requireName" switch></b-form-checkbox>
                </td>
            </tr>
            <tr>
                <td class="text-right">color</td>
                <td>
                    <ColorPanel :color.sync="item.color"></ColorPanel>
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
                    <EditButton :identifier="identifierScript" type="js" :content="item.script" @save="saveScript" class="mr11" />
                    <a href="https://github.com/googee/Code-Generator/blob/main/docs/script.md" target="_blank">
                        Guide
                    </a>
                </td>
            </tr>
            <tr>
                <td class="text-right">template</td>
                <td>
                    <EditButton
                        :identifier="identifierTemplate"
                        type="text"
                        :content="item.template"
                        @save="saveTemplate"
                        class="mr11"
                    />
                    <a href="https://mozilla.github.io/nunjucks/templating.html" target="_blank">Document</a>
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
import ColorPanel from '../button/ColorPanel.vue'
import EditButton from '../button/EditButton.vue'
import WriteButton from '../button/WriteButton.vue'

export default {
    name: 'LayerProperty',
    components: {
        ColorPanel,
        EditButton,
        WriteButton,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        identifierScript() {
            return `Layer:${this.item.name}:Script`
        },
        identifierTemplate() {
            return `Layer:${this.item.name}:Template`
        },
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
