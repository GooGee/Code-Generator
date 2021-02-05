<template>
    <table class="table">
        <thead>
            <tr>
                <th class="text-right" style="width: 222px;">name</th>
                <th>value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="text-right">name</td>
                <td>
                    <b-button-group class="mr11">
                        <DeleteButton
                            :manager="sidebar.manager"
                            :item="sidebar.item"
                            @deleted="sidebar.item = null"
                        ></DeleteButton>
                        <ChangeButton :item="sidebar.item" name="name"></ChangeButton>
                    </b-button-group>
                    <CloneButton :manager="sidebar.manager" :item="sidebar.item"></CloneButton>
                </td>
            </tr>
            <tr>
                <td class="text-right">color</td>
                <td>
                    <ColorPanel :color.sync="sidebar.item.color"></ColorPanel>
                </td>
            </tr>
            <tr>
                <td class="text-right">description</td>
                <td>
                    <b-form-input v-model="sidebar.item.description"></b-form-input>
                </td>
            </tr>
            <slot></slot>
        </tbody>
    </table>
</template>

<script>
import ChangeButton from '../button/ChangeButton.vue'
import CloneButton from '../button/CloneButton.vue'
import ColorPanel from '../button/ColorPanel.vue'
import DeleteButton from '../button/DeleteButton.vue'

export default {
    name: 'PropertyTable',
    components: {
        ChangeButton,
        CloneButton,
        ColorPanel,
        DeleteButton,
    },
    props: {
        sidebar: {
            type: Object,
            required: true,
        },
    },
    methods: {
        save(ok, text) {
            if (ok) {
                this.item.script = text
            }
        },
    },
}
</script>
