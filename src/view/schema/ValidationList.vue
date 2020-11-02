<template>
    <table id="validation" class="table b-table b-table-caption-top">
        <caption>
            <h3 class="inline mr11">Validation</h3>
            <span>validate request</span>
        </caption>
        <thead>
            <tr>
                <th width="120px">Field</th>
                <th width="120px">Type</th>
                <th>Rule List</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="field in manager.list" :key="field.name" :class="{ disabled: !field.included }">
                <td>
                    <b-form-checkbox v-model="field.included"> {{ field.name }} </b-form-checkbox>
                </td>
                <td>{{ field.type }}</td>
                <td>
                    <RuleTab :manager="field.ruleManager" :rulexx="rulexx" :rexx="rexx"></RuleTab>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="2">
                    <b-button-group class="mr11">
                        <EditButton
                            identifier="Validation:Script"
                            :content="sss.project.validationScript"
                            @save="save"
                        ></EditButton>
                        <b-button @click="run" variant="outline-primary"> Run </b-button>
                    </b-button-group>
                    <a href="https://github.com/googee/Code-Generator/blob/main/docs/script.md" target="_blank">
                        Guide
                    </a>
                </td>
                <td>
                    <b-button @click="clear" variant="outline-danger"> Clear All </b-button>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import EditButton from '../button/EditButton.vue'
import RuleTab from './RuleTab.vue'
import sss from '@/state.js'

export default {
    name: 'ValidationList',
    components: {
        EditButton,
        RuleTab,
    },
    data() {
        return {
            sss,
            rulexx: sss.getPreset('ValidationRule').propertyManager.list,
            rexx: sss.getPreset('RegularExpression').propertyManager.list,
        }
    },
    computed: {
        manager() {
            return sss.sidebar.item.fieldManager
        },
    },
    methods: {
        run() {
            try {
                sss.setValidation(sss.sidebar.item)
            } catch (error) {
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        save(ok, text) {
            if (ok) {
                sss.project.validationScript = text
            }
        },
        clear() {
            if (confirm('Are you sure?')) {
                this.manager.list.forEach(field => {
                    field.ruleManager.clear()
                })
            }
        },
    },
}
</script>

<style>
#validation tr.disabled td {
    color: darkgray;
}
</style>
