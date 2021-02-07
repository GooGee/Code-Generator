<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar" title="Response"></SideBar>
        </div>

        <div v-if="sss.sidebar.item" class="col-9">
            <table class="table">
                <tbody>
                    <tr>
                        <td width="111px"></td>
                        <td>
                            <b-button-group>
                                <DeleteButton :manager="sss.sidebar.manager" :item="sss.sidebar.item"></DeleteButton>
                                <ChangeButton :item="sss.sidebar.item" name="name"></ChangeButton>
                            </b-button-group>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">description</td>
                        <td>
                            <b-form-input v-model="sss.sidebar.item.description"></b-form-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">content</td>
                        <td>
                            <MediaTypeList :manager="sss.sidebar.item.mediaTypeManager"></MediaTypeList>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">headers</td>
                        <td>
                            <ReferenceList :manager="sss.sidebar.item.headerManager" type="headers"></ReferenceList>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import sss from '@/state.js'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import MediaTypeList from './specification/MediaTypeList.vue'
import ReferenceList from './specification/ReferenceList.vue'
import SideBar from '../part/SideBar.vue'

export default {
    name: 'Response',
    components: {
        ChangeButton,
        DeleteButton,
        MediaTypeList,
        ReferenceList,
        SideBar,
    },
    data() {
        return {
            sss,
        }
    },
    created() {
        sss.show('Response')
    },
}
</script>
