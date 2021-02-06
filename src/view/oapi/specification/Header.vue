<template>
    <table class="table">
        <tbody>
            <tr>
                <td width="111px"></td>
                <td>
                    <b-button-group>
                        <DeleteButton :manager="manager" :item="item"></DeleteButton>
                        <ChangeButton :item="item" name="name"></ChangeButton>
                    </b-button-group>
                </td>
            </tr>
            <slot></slot>
            <tr>
                <td class="text-right">description</td>
                <td>
                    <b-form-input v-model="item.description"></b-form-input>
                </td>
            </tr>
            <tr>
                <td class="text-right">schema</td>
                <td>
                    <Reference :reference="item.schema"></Reference>
                </td>
            </tr>
            <tr>
                <td class="text-right">allowEmptyValue</td>
                <td>
                    <b-form-radio-group v-model="item.allowEmptyValue">
                        <b-form-radio :value="true">true</b-form-radio>
                        <b-form-radio :value="false">false</b-form-radio>
                    </b-form-radio-group>
                </td>
            </tr>
            <tr>
                <td class="text-right">deprecated</td>
                <td>
                    <b-form-radio-group v-model="item.deprecated">
                        <b-form-radio :value="true">true</b-form-radio>
                        <b-form-radio :value="false">false</b-form-radio>
                    </b-form-radio-group>
                </td>
            </tr>
            <tr>
                <td class="text-right">required</td>
                <td>
                    <b-form-radio-group v-model="item.required">
                        <b-form-radio :value="true">true</b-form-radio>
                        <b-form-radio :value="false">false</b-form-radio>
                    </b-form-radio-group>
                </td>
            </tr>
            <tr>
                <td class="text-right">example</td>
                <td>
                    <textarea v-model="item.example" class="form-control" spellcheck="false" rows="4"></textarea>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import ChangeButton from '@/view/button/ChangeButton.vue'
import DeleteButton from '@/view/button/DeleteButton.vue'
import Reference from './Reference.vue'

export default {
    name: 'Header',
    components: {
        ChangeButton,
        DeleteButton,
        Reference,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
        manager: {
            type: Object,
            required: true,
        },
    },
}
</script>
