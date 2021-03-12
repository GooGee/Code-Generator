<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3>Route</h3>
            <MiddlewareList :manager="sss.sidebar.item.middlewareManager">
                <span class="mr11">Middleware</span>
            </MiddlewareList>
        </caption>
        <thead>
            <tr>
                <th style="min-width: 222px;">Controller Method</th>
                <th>HTTP Method</th>
                <th>Path</th>
                <th>Route Name</th>
                <th>Middleware</th>
            </tr>
        </thead>

        <draggable v-model="manager.list" group="route" handle=".drag-handle" tag="tbody">
            <Route
                v-for="route in manager.list"
                :route="route"
                :methodxx="methodxx"
                :manager="manager"
                :key="route.name"
            ></Route>
        </draggable>

        <tfoot>
            <tr>
                <td>
                    <SelectButton :list="routexx" :callback="addRoute"></SelectButton>
                </td>
                <td>
                    <select
                        v-model="selected"
                        @change="add($event.target.value)"
                        class="form-control inline wa"
                    >
                        <option selected="true" disabled="disabled" value="">----</option>
                        <option v-for="item in methodxx" :value="item" :key="item">
                            {{ item }}
                        </option>
                    </select>
                </td>
                <td>
                    <b-button @click="addRESTful" variant="outline-primary"> RESTful </b-button>
                </td>
                <td></td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import draggable from 'vuedraggable'
import MiddlewareList from './MiddlewareList.vue'
import Route from './Route.vue'
import SelectButton from '../button/SelectButton.vue'
import sss from '@/state.js'

export default {
    name: 'RouteList',
    components: {
        draggable,
        MiddlewareList,
        Route,
        SelectButton,
    },
    computed: {
        manager() {
            return sss.sidebar.item.routeManager
        },
    },
    data() {
        return {
            sss,
            methodxx: ['delete', 'get', 'options', 'patch', 'post', 'put'],
            routexx: sss.getPreset('RouteMethod').propertyManager.list,
            selected: '',
        }
    },
    methods: {
        add(action) {
            this.selected = ''
            this.make(action, sss.sidebar.item.snakeCase, 'Method Name')
        },
        addRoute(name) {
            const item = sss.getPreset('RouteMethod').propertyManager.find(name)
            const path = sss.sidebar.item.snakeCase + item.value
            this.make(item.tag, path, item.name)
        },
        addRESTful() {
            sss.getPreset('RouteRESTful').propertyManager.list.forEach((item) => {
                const path = sss.sidebar.item.snakeCase + item.value
                this.make(item.tag, path, item.name)
            })
        },
        make(method, path, name) {
            try {
                const route = this.manager.make(name)
                route.method = method
                route.path = path
                this.manager.add(route)
            } catch (error) {
                this.$root.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
    },
}
</script>
