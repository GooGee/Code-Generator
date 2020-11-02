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
                <td class="text-right">tableName</td>
                <td>
                    <ChangeButton :item="item" name="tableName"></ChangeButton>
                </td>
            </tr>
            <tr>
                <td class="text-right">color</td>
                <td>
                    <ColorButton :color.sync="item.color"></ColorButton>
                </td>
            </tr>
            <tr>
                <td class="text-right">script</td>
                <td>
                    <EditButton :identifier="identifier" :content="item.script" @save="save" class="mr11" />
                    <a href="https://github.com/googee/Code-Generator/blob/main/docs/script.md" target="_blank">
                        Guide
                    </a>
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
import ChangeButton from '../button/ChangeButton.vue'
import ColorButton from '../button/ColorButton.vue'
import EditButton from '../button/EditButton.vue'

export default {
    name: 'EntityProperty',
    components: {
        ChangeButton,
        ColorButton,
        EditButton,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            identifier: `Entity:${this.item.name}:Script`,
        }
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
