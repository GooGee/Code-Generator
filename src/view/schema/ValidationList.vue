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
                            file="script/validation.js"
                            :content="sss.project.validationScript"
                            @save="save"
                        ></EditButton>
                        <b-button @click="run" variant="outline-primary"> Run </b-button>
                    </b-button-group>
                    <ScriptGuide></ScriptGuide>
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
import ScriptGuide from './ScriptGuide.vue'
import sss from '@/state.js'

export default {
    name: 'ValidationList',
    components: {
        EditButton,
        RuleTab,
        ScriptGuide,
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
                this.$root.$bvToast.toast(error.message, {
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
            this.$bvModal
                .msgBoxConfirm('Are you sure?', {
                    title: 'Delete',
                    headerClass: 'border-bottom-0',
                    footerClass: 'border-top-0',
                    centered: true,
                })
                .then(value => {
                    if (value) {
                        this.manager.list.forEach(field => {
                            field.ruleManager.clear()
                        })
                    }
                })
                .catch(error => {
                    this.$root.$bvToast.toast(error.message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                })
        },
    },
}
</script>

<style>
#validation tr.disabled td {
    color: darkgray;
}
</style>
