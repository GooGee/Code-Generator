<template>
    <tr>
        <td>
            <span class="drag-handle"> ✥ </span>
            <span class="mr11">{{ entity.name }}</span>
            <select v-model="relation.type" class="form-control inline wa">
                <option v-for="item in relationxx" :value="item.name" :key="item.name"> {{ item.name }} </option>
            </select>
        </td>
        <td>
            <b-button-group>
                <DeleteButton :manager="manager" :item="relation"></DeleteButton>
                <ChangeButton :item="relation" name="name"></ChangeButton>
            </b-button-group>
        </td>
        <td>
            <b-form-input v-model="relation.parameter"></b-form-input>
        </td>
    </tr>
</template>

<script>
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'

export default {
    name: 'Relation',
    components: {
        ChangeButton,
        DeleteButton,
    },
    props: {
        entity: {
            type: Object,
            required: true,
        },
        manager: {
            type: Object,
            required: true,
        },
        relation: {
            type: Object,
            required: true,
        },
        relationxx: {
            type: Array,
            required: true,
        },
    },
}
</script>
