<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3>Property</h3>
        </caption>
        <thead>
            <tr>
                <th class="text-right" style="width: 222px">name</th>
                <th>value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="text-right">name</td>
                <td>
                    <ChangeButton :item="item" name="name"></ChangeButton>
                </td>
            </tr>
            <tr>
                <td class="text-right">script</td>
                <td>
                    <EditButton
                        file="script/project.js"
                        :content="item.script"
                        :callback="save"
                        class="mr11"
                    />
                    <ScriptGuide></ScriptGuide>
                </td>
            </tr>
            <tr>
                <td class="text-right">server</td>
                <td>
                    <b-form-input v-model="item.server"></b-form-input>
                </td>
            </tr>
            <tr>
                <td class="text-right">dataVersion</td>
                <td>
                    <b-form-input v-model="item.dataVersion"></b-form-input>
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
import EditButton from '../button/EditButton.vue'
import ScriptGuide from './ScriptGuide.vue'

export default {
    name: 'ProjectProperty',
    components: {
        ChangeButton,
        EditButton,
        ScriptGuide,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            save: (ok, text) => {
                if (ok) {
                    this.item.script = text
                }
            },
        }
    },
}
</script>
