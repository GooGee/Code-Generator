<template>
    <table class="table">
        <tbody>
            <tr>
                <td width="111px"></td>
                <td>
                    <b-button-group>
                        <DeleteButton :manager="manager" :item="item"></DeleteButton>
                        <b-button variant="outline-secondary"> {{ item.name }} </b-button>
                    </b-button-group>
                </td>
            </tr>
            <tr>
                <td class="text-right">schema</td>
                <td>
                    <SimpleType :schema="item.schema"></SimpleType>
                </td>
            </tr>
            <tr>
                <td class="text-right">examples</td>
                <td>
                    <ReferenceList :manager="item.exampleManager" type="examples"></ReferenceList>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import DeleteButton from '@/view/button/DeleteButton.vue'
import ReferenceList from './ReferenceList.vue'
import SimpleType from './SimpleType.vue'

export default {
    name: 'MediaType',
    components: {
        DeleteButton,
        ReferenceList,
        SimpleType,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
    },
}
</script>
