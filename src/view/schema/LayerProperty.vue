<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3>Property</h3>
        </caption>
        <thead>
            <tr>
                <th class="text-right" style="width: 122px">name</th>
                <th>value</th>
            </tr>
        </thead>
        <tbody>
            <slot></slot>
            <tr v-if="item.isLayer">
                <td class="text-right">color</td>
                <td>
                    <ColorPanel :color.sync="item.color"></ColorPanel>
                </td>
            </tr>
            <tr v-if="item.isLayer">
                <td class="text-right">single</td>
                <td>
                    <b-form-checkbox v-model="item.single" switch class="mr11 wa inline"></b-form-checkbox>
                    <WriteButton v-if="item.single" :layer="item" class="mr11"></WriteButton>
                </td>
            </tr>
            <tr v-if="item.isLayer && item.single">
                <td class="text-right">requireName</td>
                <td>
                    <b-form-checkbox v-model="item.requireName" switch></b-form-checkbox>
                </td>
            </tr>
            <tr v-if="item.isLayer">
                <td class="text-right">script</td>
                <td>
                    <EditButton :file="fileScript" :content="item.script" @save="saveScript" class="mr11" />
                    <ScriptGuide></ScriptGuide>
                </td>
            </tr>
            <tr v-if="item.isLayer">
                <td class="text-right">template</td>
                <td>
                    <EditButton :file="fileTemplate" :content="item.template" @save="saveTemplate" class="mr11" />
                    <OpenButton file="https://mozilla.github.io/nunjucks/templating.html">Document</OpenButton>
                </td>
            </tr>
            <tr v-if="item.isLayer">
                <td class="text-right">class name</td>
                <td>
                    <b-form-input v-model="item.classPattern"></b-form-input>
                </td>
            </tr>
            <tr v-if="item.isLayer">
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
            <tr v-if="item.isLayer">
                <td class="text-right">path pattern</td>
                <td>
                    <b-form-input v-model="item.pathPattern"></b-form-input>
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
import ColorPanel from '../button/ColorPanel.vue'
import EditButton from '../button/EditButton.vue'
import OpenButton from '../button/OpenButton.vue'
import WriteButton from '../button/WriteButton.vue'
import ScriptGuide from './ScriptGuide.vue'

export default {
    name: 'LayerProperty',
    components: {
        ColorPanel,
        EditButton,
        OpenButton,
        ScriptGuide,
        WriteButton,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
        project: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            fileScript: this.getScript(),
            fileTemplate: this.getTemplate(),
        }
    },
    watch: {
        item() {
            this.fileScript = this.getScript()
            this.fileTemplate = this.getTemplate()
        },
    },
    methods: {
        getHash() {
            if (this.item.isLayer) {
                const entity = { name: 'code' }
                return this.item.getPathHash(this.project, entity)
            }
            return ''
        },
        getScript() {
            return `script/${this.getHash()}.${this.item.name}.js`
        },
        getTemplate() {
            return `template/${this.getHash()}.${this.item.name}.txt`
        },
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
