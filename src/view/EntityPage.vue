<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar" title="Entity"></SideBar>
        </div>

        <div v-if="sss.sidebar.item" class="col-9">
            <TabBar :tab="tab" :list="tabxx" @show="show" class="mt11"></TabBar>

            <CastList v-if="tab === 'Cast'"></CastList>

            <DataList v-if="tab === 'Data'" :manager="sss.sidebar.item.dataManager"></DataList>

            <Faker v-if="tab === 'Faker'"></Faker>

            <FieldList v-if="tab === 'Field'"></FieldList>

            <FileList
                v-if="tab === 'File'"
                :layerxx="layerxx"
                :project="sss.project"
                :entity="sss.sidebar.item"
            ></FileList>

            <IndexList v-if="tab === 'Index'"></IndexList>

            <EntityProperty v-if="tab === 'Property'" :item="sss.sidebar.item">
                <tr>
                    <td class="text-right">name</td>
                    <td>
                        <b-button-group class="mr11">
                            <DeleteButton
                                :manager="sss.sidebar.manager"
                                :item="sss.sidebar.item"
                                @deleted="sss.sidebar.item = null"
                            ></DeleteButton>
                            <ChangeButton :item="sss.sidebar.item" name="name"></ChangeButton>
                        </b-button-group>
                        <CloneButton :manager="sss.sidebar.manager" :item="sss.sidebar.item"></CloneButton>
                    </td>
                </tr>
            </EntityProperty>

            <RelationList v-if="tab === 'Relation'"></RelationList>

            <ValidationList v-if="tab === 'Validation'"></ValidationList>
        </div>
    </div>
</template>

<script>
import CastList from './schema/CastList.vue'
import ChangeButton from './button/ChangeButton.vue'
import CloneButton from './button/CloneButton.vue'
import DataList from './schema/DataList.vue'
import DeleteButton from './button/DeleteButton.vue'
import Faker from './schema/Faker.vue'
import FieldList from './schema/FieldList.vue'
import FileList from './schema/FileList.vue'
import IndexList from './schema/IndexList.vue'
import EntityProperty from './schema/EntityProperty.vue'
import RelationList from './schema/RelationList.vue'
import ValidationList from './schema/ValidationList.vue'
import SideBar from './part/SideBar.vue'
import TabBar from './part/TabBar.vue'
import sss from '../state.js'
import menu from '../menu.js'

export default {
    name: 'EntityPage',
    components: {
        CastList,
        ChangeButton,
        CloneButton,
        DataList,
        DeleteButton,
        Faker,
        FieldList,
        FileList,
        IndexList,
        EntityProperty,
        RelationList,
        ValidationList,
        SideBar,
        TabBar,
    },
    data() {
        return {
            sss,
            tab: 'File',
            tabxx: menu.entity,
        }
    },
    created() {
        sss.showEntity()
    },
    computed: {
        layerxx() {
            return sss.project.layerManager.list.filter(layer => layer.single === false)
        },
    },
    methods: {
        show(tab) {
            this.tab = tab
        },
    },
}
</script>
