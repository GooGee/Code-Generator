<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3 class="inline mr11">Route</h3>
        </caption>
        <thead>
            <tr>
                <th></th>
                <th>Action</th>
                <th>Path</th>
                <th>Method</th>
                <th>Middleware</th>
            </tr>
        </thead>

        <draggable v-model="manager.list" group="route" handle=".drag-handle" tag="tbody">
            <Route
                v-for="route in manager.list"
                :route="route"
                :actionxx="actionxx"
                :manager="manager"
                :key="route.name"
            ></Route>
        </draggable>

        <tfoot>
            <tr>
                <td>
                    <select v-model="selected" @change="add($event.target.value)" class="form-control inline wa">
                        <option selected="true" disabled="disabled" value=""> ---- </option>
                        <option v-for="item in actionxx" :value="item" :key="item"> {{ item }} </option>
                    </select>
                </td>
                <td></td>
                <td>
                    <b-button @click="addRESTful" variant="outline-primary"> RESTful </b-button>
                </td>
                <td>
                    <SelectButton :list="routexx" :callback="addRoute"></SelectButton>
                </td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import draggable from 'vuedraggable'
import Route from './Route.vue'
import SelectButton from '../button/SelectButton.vue'
import sss from '@/state.js'

export default {
    name: 'RouteList',
    components: {
        draggable,
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
            actionxx: ['delete', 'get', 'options', 'patch', 'post', 'put'],
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
            sss.getPreset('RouteRESTful').propertyManager.list.forEach(item => {
                const path = sss.sidebar.item.snakeCase + item.value
                this.make(item.tag, path, item.name)
            })
        },
        make(action, path, method) {
            try {
                const route = this.manager.make(method)
                route.action = action
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
