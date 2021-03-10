<template>
    <div class="row">
        <div class="col-5 col-lg-4">
            <TreeBar @show="show" :sidebar="sss.sidebar" :folder="folder"></TreeBar>
        </div>

        <div v-if="item" class="col-7 col-lg-8">
            <b-nav tabs class="mt11">
                <b-nav-item @click="tab = 'Property'" :active="tab === 'Property'"> Property </b-nav-item>
                <b-nav-item @click="tab = 'Data'" :active="tab === 'Data'"> Data </b-nav-item>
            </b-nav>

            <DataList v-if="tab === 'Data' && item.isLayer" :manager="item.dataManager"></DataList>

            <LayerProperty v-if="tab === 'Property'" :key="item.name" :item="item" :project="sss.project">
                <tr>
                    <td class="text-right">name</td>
                    <td>
                        <span v-if="item.original" class="mr11">{{ item.name }}</span>
                        <b-button-group v-else class="mr11">
                            <DeleteButton
                                :manager="sss.sidebar.manager"
                                :item="item"
                                @deleted="item = null"
                            ></DeleteButton>
                            <ChangeButton :item="item" name="name"></ChangeButton>
                        </b-button-group>
                        <CloneButton v-if="item.isLayer" :manager="sss.sidebar.manager" :item="item"></CloneButton>
                    </td>
                </tr>
            </LayerProperty>
        </div>
    </div>
</template>

<script>
import ChangeButton from './button/ChangeButton.vue'
import CloneButton from './button/CloneButton.vue'
import DataList from './schema/DataList.vue'
import DeleteButton from './button/DeleteButton.vue'
import LayerProperty from './schema/LayerProperty.vue'
import TreeBar from './part/TreeBar.vue'
import sss from '../state.js'

export default {
    name: 'LayerPage',
    components: {
        ChangeButton,
        CloneButton,
        DataList,
        DeleteButton,
        LayerProperty,
        TreeBar,
    },
    data() {
        return {
            sss,
            item: null,
            tab: 'Property',
            folder: sss.getProject().folder,
        }
    },
    created() {
        sss.showLayer()
    },
    methods: {
        show(item) {
            this.item = item
        },
    },
}
</script>
