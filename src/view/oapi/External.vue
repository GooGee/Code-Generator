<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right" width="222px">description</td>
                <td>
                    <b-form-input v-model="item.description"></b-form-input>
                </td>
            </tr>
            <tr>
                <td class="text-right">url</td>
                <td>
                    <b-form-input v-model="item.url"></b-form-input>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'External',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
}
</script>
