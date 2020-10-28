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

export default {
    name: 'EntityProperty',
    components: {
        ChangeButton,
        ColorButton,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
}
</script>
