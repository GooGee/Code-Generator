<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar" title="Parameter"></SideBar>
        </div>

        <div class="col-9">
            <Header v-if="sss.sidebar.item" :item="sss.sidebar.item" :manager="sss.sidebar.manager">
                <tr>
                    <td class="text-right">name</td>
                    <td>
                        <ChangeButton :item="sss.sidebar.item" name="name2"></ChangeButton>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">in</td>
                    <td>
                        <b-form-select v-model="sss.sidebar.item.location" :options="locationxx"></b-form-select>
                    </td>
                </tr>
            </Header>
        </div>
    </div>
</template>

<script>
import sss from '@/state.js'
import ChangeButton from '../button/ChangeButton.vue'
import Header from './specification/Header.vue'
import SideBar from '../part/SideBar.vue'

export default {
    name: 'Parameter',
    components: {
        ChangeButton,
        Header,
        SideBar,
    },
    data() {
        return {
            sss,
            locationxx: ['cookie', 'path', 'query'],
        }
    },
}
</script>
