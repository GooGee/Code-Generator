<template>
    <tr>
        <td>
            <span class="drag-handle"> ✥ </span>
            <DeleteButton :manager="manager" :item="route" class="mr11"></DeleteButton>
        </td>
        <td>
            <select v-model="route.action" class="form-control inline wa">
                <option v-for="item in actionxx" :value="item" :key="item"> {{ item }} </option>
            </select>
        </td>
        <td>
            <b-form-input v-model="route.path"></b-form-input>
        </td>
        <td>
            <ChangeButton :item="route" name="name"></ChangeButton>
        </td>
        <td>
            <MiddlewareList :manager="route.middlewareManager"></MiddlewareList>
        </td>
    </tr>
</template>

<script>
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import MiddlewareList from './MiddlewareList.vue'

export default {
    name: 'Route',
    components: {
        ChangeButton,
        DeleteButton,
        MiddlewareList,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        route: {
            type: Object,
            required: true,
        },
        actionxx: {
            type: Array,
            required: true,
        },
    },
}
</script>
