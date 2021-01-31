<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <slot name="caption"></slot>
        </caption>
        <thead>
            <tr>
                <th>included</th>
                <th>value</th>
                <th>description</th>
            </tr>
        </thead>

        <draggable v-model="manager.list" group="property" handle=".drag-handle" tag="tbody">
            <slot name="body"></slot>
            <tr v-for="item in manager.list" :key="item.name">
                <td>
                    <span class="drag-handle"> ✥ </span>
                    <b-form-checkbox v-model="item.included" switch class="mr11 wa inline"></b-form-checkbox>
                    <b-button-group>
                        <DeleteButton :manager="manager" :item="item"></DeleteButton>
                        <ChangeButton :item="item" name="name"></ChangeButton>
                    </b-button-group>
                </td>
                <td>
                    <b-form-input v-model="item.value"></b-form-input>
                </td>
                <td>
                    <b-form-input v-model="item.description"></b-form-input>
                </td>
            </tr>
        </draggable>

        <tfoot>
            <tr v-if="mutable">
                <td>
                    <AddButton :manager="manager"></AddButton>
                </td>
                <td></td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import AddButton from '../button/AddButton.vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import draggable from 'vuedraggable'

export default {
    name: 'OptionList',
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
        draggable,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        mutable: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
}
</script>
