<template>
    <div class="mtb11">
        <slot name="header"></slot>

        <div v-if="editing">
            <b-button @click="editing = false" variant="outline-primary"> OK </b-button>

            <div v-for="item in manager.list" :key="item.name" class="mtb11">
                <b-button-group>
                    <DeleteButton :manager="manager" :item="item"></DeleteButton>
                    <ChangeButton v-if="withedit" :item="item" name="name"></ChangeButton>
                    <b-button v-else variant="outline-secondary"> {{ item.name }} </b-button>
                </b-button-group>
            </div>

            <AddButton v-if="withadd" :manager="manager" name="name"></AddButton>
        </div>

        <ul v-else @click="editing = true">
            <li v-if="withadd" style="list-style-type: none;">+</li>
            <li v-for="item in manager.list" :key="item.name">{{ item.name }}</li>
        </ul>
    </div>
</template>

<script>
import AddButton from '../button/AddButton.vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'

export default {
    name: 'EditList',
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        withadd: {
            type: Boolean,
            required: false,
            default: true,
        },
        withedit: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data() {
        return {
            editing: false,
        }
    },
}
</script>
