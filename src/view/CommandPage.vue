<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar" title="Command"></SideBar>
        </div>

        <div v-if="sss.sidebar.item" class="col-9">
            <ArgumentList :manager="sss.sidebar.item.argumentManager">
                <template slot="caption">
                    <h2 v-if="sss.sidebar.item.original" class="inline mr11">{{ sss.sidebar.item.name }}</h2>
                    <b-button-group v-else class="mr11">
                        <DeleteButton
                            :manager="sss.sidebar.manager"
                            :item="sss.sidebar.item"
                            @deleted="sss.sidebar.item = null"
                        ></DeleteButton>
                        <ChangeButton :item="sss.sidebar.item" name="name"></ChangeButton>
                    </b-button-group>
                    <b-button @click="run" variant="outline-success"> Run </b-button>
                </template>
                <template slot="body">
                    <tr>
                        <td></td>
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
                    <tr>
                        <td class="text-right">color</td>
                        <td colspan="2">
                            <ColorButton :color.sync="sss.sidebar.item.color"></ColorButton>
                        </td>
                    </tr>
                </template>
            </ArgumentList>

            <div>
                <p>Output</p>
                <b-form-textarea v-model="result" rows="22" spellcheck="false" readonly></b-form-textarea>
            </div>
        </div>
    </div>
</template>

<script>
import ArgumentList from './schema/ArgumentList.vue'
import ChangeButton from './button/ChangeButton.vue'
import ColorButton from './button/ColorButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import SideBar from './part/SideBar.vue'
import sss from '../state.js'

export default {
    name: 'CommandPage',
    components: {
        ArgumentList,
        ChangeButton,
        ColorButton,
        DeleteButton,
        SideBar,
    },
    data() {
        return {
            sss,
            waiting: false,
            result: '',
        }
    },
    created() {
        sss.showCommand()
    },
    methods: {
        run() {
            if (this.waiting) {
                return
            }
            const server = prompt('Please enter the local server', sss.project.server)
            if (!server) {
                return
            }

            this.waiting = true
            sss.project.server = server
            sss.bridge.run(server, sss.sidebar.item.toString(), text => {
                try {
                    const json = JSON.parse(text)
                    if (parseInt(json.status) > 200) {
                        this.$bvToast.toast(json.message, {
                            title: 'i',
                            variant: 'danger',
                            solid: true,
                        })
                        this.waiting = false
                        return
                    }

                    this.result = json.data
                } catch (error) {
                    this.$bvToast.toast(error.message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                }
                this.waiting = false
            })
        },
    },
}
</script>
