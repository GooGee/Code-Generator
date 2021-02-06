<template>
    <div class="row">
        <div class="col-3">
            <div class="text-center mtb11">
                <h3 class="inline gray mr11">Data</h3>
                <AddButton :manager="sss.sidebar.item.dataManager"></AddButton>
            </div>

            <draggable v-model="sss.sidebar.item.dataManager.list" group="data">
                <div
                    v-for="one in sss.sidebar.item.dataManager.list"
                    :key="one.name"
                    @click="item = one"
                    :class="Object.is(item, one) ? 'active' : ''"
                    class="list-group-item list-group-item-action"
                >
                    ✥ {{ one.name }}
                </div>
            </draggable>
        </div>

        <div class="col-9">
            <PropertyList v-if="item" :manager="item.propertyManager">
                <b-button-group class="mb11">
                    <DeleteButton :manager="sss.sidebar.item.dataManager" :item="item" @deleted="item = null"></DeleteButton>
                    <ChangeButton :item="item" name="name"></ChangeButton>
                </b-button-group>
                <b-form-input v-model="item.description" placeholder="description"></b-form-input>
            </PropertyList>
        </div>
    </div>
</template>

<script>
import sss from '@/state.js'
import AddButton from '../button/AddButton.vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import draggable from 'vuedraggable'
import PropertyList from './PropertyList.vue'

export default {
    name: 'DataList',
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
        draggable,
        PropertyList,
    },
    data() {
        return {
            sss,
            item: null,
        }
    },
}
</script>
