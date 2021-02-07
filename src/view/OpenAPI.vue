<template>
    <div class="row">
        <div class="col-9 offset-3">
            <TabList :tab="tab" :list="tabxx" @show="show" class="mt11"></TabList>

            <table v-if="tab === tabxx[0].name" class="table">
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

            <table v-if="tab === tabxx[1].name" class="table">
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

            <table v-if="tab === tabxx[2].name" class="table">
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

            <External v-if="tab === tabxx[3].name" :item="externalDocs"></External>
        </div>
    </div>
</template>

<script>
import sss from '../state.js'
import External from './oapi/specification/External.vue'
import TabList from './part/TabList.vue'

export default {
    name: 'OpenAPI',
    components: {
        External,
        TabList,
    },
    data() {
        return {
            sss,
            info: sss.project.document.info,
            externalDocs: sss.project.document.externalDocs,
            tab: 'Info',
            tabxx: [
                //
                { name: 'Info' },
                { name: 'Contact' },
                { name: 'License' },
                { name: 'ExternalDocs' },
            ],
        }
    },
    methods: {
        show(tab) {
            this.tab = tab
        },
    },
}
</script>
