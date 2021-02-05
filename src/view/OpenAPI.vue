<template>
    <div class="row">
        <div class="col-9 offset-3">
            <TabBar :tab="tab" :list="tabxx" @show="show" class="mt11"></TabBar>

            <table v-if="tab === tabxx[0]"  class="table">
                <tbody>
                    <tr>
                        <td class="text-right" width="222px">title</td>
                        <td>
                            <b-form-input v-model="info.title"></b-form-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">version</td>
                        <td>
                            <b-form-input v-model="info.version"></b-form-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">description</td>
                        <td>
                            <b-form-input v-model="info.description"></b-form-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">termsOfService</td>
                        <td>
                            <b-form-input v-model="info.termsOfService"></b-form-input>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table v-if="tab === tabxx[1]" class="table">
                <tbody>
                    <tr>
                        <td class="text-right">name</td>
                        <td>
                            <b-form-input v-model="info.contact.name"></b-form-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">email</td>
                        <td>
                            <b-form-input v-model="info.contact.email"></b-form-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">url</td>
                        <td>
                            <b-form-input v-model="info.contact.url"></b-form-input>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table v-if="tab === tabxx[2]" class="table">
                <tbody>
                    <tr>
                        <td class="text-right">name</td>
                        <td>
                            <b-form-input v-model="info.license.name"></b-form-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">url</td>
                        <td>
                            <b-form-input v-model="info.license.url"></b-form-input>
                        </td>
                    </tr>
                </tbody>
            </table>

            <External v-if="tab === tabxx[3]" :item="externalDocs"></External>
        </div>
    </div>
</template>

<script>
import sss from '../state.js'
import External from './oapi/External.vue'
import TabBar from './part/TabBar.vue'

export default {
    name: 'OpenAPI',
    components: {
        External,
        TabBar,
    },
    data() {
        return {
            sss,
            info: sss.project.document.info,
            externalDocs: sss.project.document.externalDocs,
            tab: 'Info',
            tabxx: ['Info', 'Contact', 'License', 'ExternalDocs'],
        }
    },
    methods: {
        show(tab) {
            this.tab = tab
        },
    },
}
</script>
