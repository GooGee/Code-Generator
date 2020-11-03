<template>
    <b-button @click="remove" variant="outline-danger">
        -
    </b-button>
</template>

<script>
export default {
    name: 'DeleteButton',
    props: {
        manager: {
            type: Object,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
    },
    methods: {
        remove() {
            this.$bvModal
                .msgBoxConfirm('Are you sure?', {
                    title: 'Delete',
                    headerClass: 'border-bottom-0',
                    footerClass: 'border-top-0',
                    centered: true,
                })
                .then(value => {
                    if (value) {
                        this.manager.remove(this.item)
                        this.$emit('deleted')
                    }
                })
                .catch(error => {
                    this.$root.$bvToast.toast(error.message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                })
        },
    },
}
</script>
