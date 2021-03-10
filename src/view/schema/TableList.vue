<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3 class="inline mr11">DataBase Schema</h3>
            <b-button @click="read" :disabled="waiting" variant="outline-success">
                <b-spinner v-if="waiting" small></b-spinner>
                Read
            </b-button>
            <ul class="gray">
                <li>
                    make sure the
                    <OpenButton file="https://packagist.org/packages/googee/entity">PHP package</OpenButton>
                    is installed
                </li>
                <li>
                    and the server
                    <a :href="sss.project.server" target="_blank">{{ sss.project.server }}</a>
                    is running
                </li>
                <li>
                    and database is configured in .env file
                </li>
                <li>
                    to change the server URL, go to Property tab
                </li>
            </ul>
        </caption>
        <tbody>
            <tr v-for="table in data.tables" :key="table.name">
                <td>
                    <b-form-checkbox v-model="table.included"> {{ table.name }} </b-form-checkbox>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <b-form-checkbox v-model="all" @change="select" switch> All </b-form-checkbox>
                </td>
            </tr>
            <tr>
                <td>
                    prefix <span class="red">{{ data.prefix }}</span>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="mr11">if table exists</span>
                    <b-form-radio v-model="skip" :value="true" class="inline mr11">Skip</b-form-radio>
                    <b-form-radio v-model="skip" :value="false" class="inline">Replace</b-form-radio>
                </td>
            </tr>
            <tr>
                <td>
                    <b-button @click="convert" variant="outline-primary"> Import selected table </b-button>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import sss from '@/state.js'
import OpenButton from '../button/OpenButton.vue'

export default {
    name: 'TableList',
    components: {
        OpenButton,
    },
    data() {
        return {
            sss,
            all: true,
            skip: false,
            waiting: false,
            data: {
                prefix: '',
                tables: [],
            },
        }
    },
    methods: {
        read() {
            if (this.waiting) {
                return
            }

            this.waiting = true
            const route = sss.project.server + '/entity/table'
            sss.route.get(route, '', response => {
                if (response.status === 200) {
                    this.data = response.data
                    if (response.data.tables.length === 0) {
                        this.$root.$bvToast.toast('No table found', {
                            title: 'i',
                            variant: 'success',
                            solid: true,
                        })
                    }
                    this.select(true)
                    this.waiting = false
                    return
                }

                this.$root.$bvToast.toast(response.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
                this.waiting = false
            })
        },
        convert() {
            if (this.data.tables.length === 0) {
                return
            }

            try {
                sss.convert(this.data, this.skip)
                this.$root.$bvToast.toast('Table imported', {
                    title: 'i',
                    variant: 'success',
                    solid: true,
                })
            } catch (error) {
                this.$root.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        select(value) {
            this.data.tables.forEach(table => {
                table.included = value
            })
        },
    },
}
</script>
