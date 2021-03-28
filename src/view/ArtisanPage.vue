<template>
    <div class="row">
        <div class="col-4 col-xl-3">
            <SideBar :sidebar="sss.sidebar" title="Artisan"></SideBar>
        </div>

        <div v-if="sss.sidebar.item" class="col-8 col-xl-9">
            <div>
                <h2 v-if="sss.sidebar.item.original" class="inline mr11">
                    artisan {{ sss.sidebar.item.name }}
                </h2>
                <b-button-group v-else class="mr11">
                    artisan
                    <DeleteButton
                        :manager="sss.sidebar.manager"
                        :item="sss.sidebar.item"
                        @deleted="sss.sidebar.item = null"
                    ></DeleteButton>
                    <ChangeButton :item="sss.sidebar.item" name="name"></ChangeButton>
                </b-button-group>
                <b-button @click="run" :disabled="waiting" variant="outline-success">
                    <b-spinner v-if="waiting" small></b-spinner>
                    Run
                </b-button>
                <ul class="gray">
                    <li>
                        make sure the
                        <OpenButton file="https://packagist.org/packages/googee/entity">
                            PHP package
                        </OpenButton>
                        is installed
                    </li>
                    <li>
                        and the server
                        <a :href="sss.project.server" target="_blank">{{ sss.project.server }}</a>
                        is running
                    </li>
                    <li>
                        to change the server URL, go to page
                        <router-link to="/project">Project</router-link>
                    </li>
                </ul>
            </div>

            <b-nav tabs class="mt11">
                <b-nav-item @click="tab = 'Option'" :active="tab === 'Option'"> Option </b-nav-item>
                <b-nav-item @click="tab = 'Output'" :active="tab === 'Output'"> Output </b-nav-item>
            </b-nav>

            <OptionList v-if="tab === 'Option'" :manager="sss.sidebar.item.optionManager">
                <template slot="body">
                    <tr>
                        <td class="text-right">{{ sss.sidebar.item.name }}</td>
                        <td>
                            <b-form-input v-model="sss.sidebar.item.value"></b-form-input>
                        </td>
                        <td>
                            <b-form-input
                                v-model="sss.sidebar.item.description"
                                placeholder="description"
                            ></b-form-input>
                        </td>
                    </tr>
                </template>
            </OptionList>

            <div v-if="tab === 'Output'">
                <div class="mtb11">
                    <ColorPanel :color.sync="sss.sidebar.item.color"></ColorPanel>
                </div>
                <b-form-textarea
                    v-model="result"
                    rows="22"
                    spellcheck="false"
                    readonly
                ></b-form-textarea>
            </div>
        </div>
    </div>
</template>

<script>
import OptionList from './schema/OptionList.vue'
import ChangeButton from './button/ChangeButton.vue'
import ColorPanel from './button/ColorPanel.vue'
import DeleteButton from './button/DeleteButton.vue'
import OpenButton from './button/OpenButton.vue'
import SideBar from './part/SideBar.vue'
import sss from '../state.js'

export default {
    name: 'ArtisanPage',
    components: {
        OptionList,
        ChangeButton,
        ColorPanel,
        DeleteButton,
        OpenButton,
        SideBar,
    },
    data() {
        return {
            sss,
            waiting: false,
            tab: 'Option',
            result: '',
        }
    },
    created() {
        sss.showArtisan()
    },
    methods: {
        run() {
            if (this.waiting) {
                return
            }

            this.waiting = true
            const data = {
                command: sss.sidebar.item.toString(),
            }
            const route = sss.project.server + '/entity/run'
            sss.route.post(route, JSON.stringify(data), (response) => {
                if (response.status === 200) {
                    this.result = response.data
                    this.waiting = false
                    this.$root.$bvToast.toast(response.message, {
                        title: 'i',
                        variant: 'success',
                        autoHideDelay: 1222,
                        solid: true,
                    })
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
    },
}
</script>
