<template>
    <tr>
        <td>
            <span class="drag-handle"> ✥ </span>
            <b-button-group>
                <DeleteButton :manager="manager" :item="route"></DeleteButton>
                <ChangeButton :item="route" name="name"></ChangeButton>
            </b-button-group>
        </td>
        <td>
            <select v-model="route.method" class="form-control inline wa">
                <option v-for="item in methodxx" :value="item" :key="item">{{ item }}</option>
            </select>
        </td>
        <td>
            <b-form-input v-model="route.path"></b-form-input>
        </td>
        <td>
            <b-form-input v-model="route.routeName"></b-form-input>
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
        methodxx: {
            type: Array,
            required: true,
        },
    },
}
</script>
