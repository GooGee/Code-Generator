<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar" title="Example"></SideBar>
        </div>

        <div class="col-9">
            <PropertyTable v-if="sss.sidebar.item" :sidebar="sss.sidebar">
                <tr>
                    <td class="text-right">externalValue</td>
                    <td>
                        <b-form-input v-model="sss.sidebar.item.externalValue"></b-form-input>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">summary</td>
                    <td>
                        <b-form-input v-model="sss.sidebar.item.summary"></b-form-input>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">value</td>
                    <td>
                        <textarea
                            v-model="sss.sidebar.item.value"
                            class="form-control"
                            spellcheck="false"
                            rows="11"
                        ></textarea>
                    </td>
                </tr>
            </PropertyTable>
        </div>
    </div>
</template>

<script>
import sss from '@/state.js'
import PropertyTable from '../part/PropertyTable.vue'
import SideBar from '../part/SideBar.vue'

export default {
    name: 'Example',
    components: {
        PropertyTable,
        SideBar,
    },
    data() {
        return {
            sss,
        }
    },
    created() {
        sss.show('Example')
    },
}
</script>
