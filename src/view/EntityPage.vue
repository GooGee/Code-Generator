<template>
    <div class="row">
        <div class="col-4 col-xl-3">
            <SideBar :sidebar="sss.sidebar" title="Entity"></SideBar>
        </div>

        <div v-if="sss.sidebar.item" class="col-8 col-xl-9">
            <b-nav tabs class="mt11">
                <b-nav-item @click="tab = 'Cast'" :active="tab === 'Cast'"> Cast </b-nav-item>
                <b-nav-item @click="tab = 'Data'" :active="tab === 'Data'"> Data </b-nav-item>
                <b-nav-item @click="tab = 'Faker'" :active="tab === 'Faker'"> Faker </b-nav-item>
                <b-nav-item @click="tab = 'Field'" :active="tab === 'Field'"> Field </b-nav-item>
                <b-nav-item @click="tab = 'File'" :active="tab === 'File'"> File </b-nav-item>
                <b-nav-item @click="tab = 'HTML'" :active="tab === 'HTML'"> HTML </b-nav-item>
                <b-nav-item @click="tab = 'Index'" :active="tab === 'Index'"> Index </b-nav-item>
                <b-nav-item @click="tab = 'Property'" :active="tab === 'Property'"> Property </b-nav-item>
                <b-nav-item @click="tab = 'Relation'" :active="tab === 'Relation'"> Relation </b-nav-item>
                <b-nav-item @click="tab = 'Route'" :active="tab === 'Route'"> Route </b-nav-item>
                <b-nav-item @click="tab = 'Validation'" :active="tab === 'Validation'"> Validation </b-nav-item>
            </b-nav>

            <CastList v-if="tab === 'Cast'"></CastList>

            <DataList v-if="tab === 'Data'" :manager="sss.sidebar.item.dataManager"></DataList>

            <Faker v-if="tab === 'Faker'"></Faker>

            <FieldList v-if="tab === 'Field'"></FieldList>

            <FileList
                v-if="tab === 'File'"
                :map="map"
                :project="sss.project"
                :entity="sss.sidebar.item"
                :color.sync="sss.sidebar.otherColor"
            ></FileList>

            <HtmlList v-if="tab === 'HTML'"></HtmlList>

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

            <RouteList v-if="tab === 'Route'"></RouteList>

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
import HtmlList from './schema/HtmlList.vue'
import IndexList from './schema/IndexList.vue'
import EntityProperty from './schema/EntityProperty.vue'
import RelationList from './schema/RelationList.vue'
import RouteList from './schema/RouteList.vue'
import ValidationList from './schema/ValidationList.vue'
import SideBar from './part/SideBar.vue'
import sss from '../state.js'

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
        HtmlList,
        IndexList,
        EntityProperty,
        RelationList,
        RouteList,
        ValidationList,
        SideBar,
    },
    data() {
        return {
            sss,
            tab: 'File',
            map: null,
        }
    },
    created() {
        sss.showEntity()
        this.map = sss.project.folder.toMap()
        // console.log(Array.from(this.map.keys()))
    },
}
</script>
