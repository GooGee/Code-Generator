<template>
    <b-button @click="render" variant="outline-success"> ▼ </b-button>
</template>

<script>
import sss from '@/state.js'

export default {
    name: 'WriteButton',
    props: {
        layer: {
            type: Object,
            required: true,
        },
        entity: {
            type: Object,
            required: false,
            default: null,
        },
    },
    methods: {
        render() {
            if (this.entity === null) {
                if (this.layer.requireName === false) {
                    const entity = sss.project.entityManager.make('NoName')
                    this.write(entity)
                    return
                }
                sss.nameDialogue.showInput(`Please input the name`, '', (ok, text) => {
                    if (ok) {
                        if (text === '') {
                            this.$root.$bvToast.toast('name cannot be empty', {
                                title: 'i',
                                variant: 'danger',
                                solid: true,
                            })
                        } else {
                            const entity = sss.project.entityManager.make(text)
                            this.write(entity)
                        }
                    }
                })
            } else {
                this.write(this.entity)
            }
        },
        write(entity) {
            try {
                const file = this.layer.getFilePath(sss.project, entity)
                const text = sss.render(this.layer, entity)
                sss.route.write(file, text, (response) => {
                    if (response.status === 200) {
                        this.$root.$bvToast.toast(file, {
                            title: 'Saved',
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
                })
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
