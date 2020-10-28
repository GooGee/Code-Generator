<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar" title="Command"></SideBar>
        </div>

        <div v-if="sss.sidebar.item" class="col-9">
            <ArgumentList :manager="sss.sidebar.item.argumentManager">
                <div>
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
                </div>
                <div>
                    <b-form-input
                        v-model="sss.sidebar.item.description"
                        class="mt11"
                        placeholder="description"
                    ></b-form-input>
                </div>
            </ArgumentList>

            <div>
                <span>Result</span>
                <b-form-textarea v-model="result" rows="22" spellcheck="false" readonly></b-form-textarea>
            </div>
        </div>
    </div>
</template>

<script>
import ArgumentList from './schema/ArgumentList.vue'
import ChangeButton from './button/ChangeButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import SideBar from './part/SideBar.vue'
import sss from '../state.js'

export default {
    name: 'CommandPage',
    components: {
        ArgumentList,
        ChangeButton,
        DeleteButton,
        SideBar,
    },
    data() {
        return {
            sss,
            result: '',
        }
    },
    created() {
        sss.showCommand()
    },
    methods: {
        run() {
            sss.bridge.run(sss.sidebar.item.toString(), text => {
                this.result = text
            })
        },
    },
}
</script>
