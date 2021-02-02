<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar" title="Preset"></SideBar>
        </div>

        <div v-if="sss.sidebar.item" class="col-9">
            <PropertyList :manager="sss.sidebar.item.propertyManager">
                <div>
                    <h2 v-if="sss.sidebar.item.original">{{ sss.sidebar.item.name }}</h2>
                    <b-button-group v-else class="mb11">
                        <DeleteButton
                            :manager="sss.sidebar.manager"
                            :item="sss.sidebar.item"
                            @deleted="sss.sidebar.item = null"
                        ></DeleteButton>
                        <ChangeButton :item="sss.sidebar.item" name="name"></ChangeButton>
                    </b-button-group>
                </div>
                <div class="mb11">
                    <b-form-input v-model="sss.sidebar.item.description" placeholder="description"></b-form-input>
                </div>
                <ColorPanel :color.sync="sss.sidebar.item.color"></ColorPanel>
            </PropertyList>
        </div>
    </div>
</template>

<script>
import ChangeButton from './button/ChangeButton.vue'
import ColorPanel from './button/ColorPanel.vue'
import DeleteButton from './button/DeleteButton.vue'
import SideBar from './part/SideBar.vue'
import PropertyList from './schema/PropertyList.vue'
import sss from '../state.js'

export default {
    name: 'PresetPage',
    components: {
        ChangeButton,
        ColorPanel,
        DeleteButton,
        SideBar,
        PropertyList,
    },
    data() {
        return {
            sss,
        }
    },
    created() {
        sss.showPreset()
    },
}
</script>
