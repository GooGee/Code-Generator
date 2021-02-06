<template>
    <div>
        <select v-model="schema.type" class="form-control inline wa mr11">
            <option v-for="type in typexx" :value="type.name" :key="type.name"> {{ type.name }} </option>
        </select>

        <Reference v-if="schema.type === 'reference'" :reference="schema.reference"></Reference>

        <template v-else>
            <select v-if="schema.type !== 'boolean'" v-model="schema.format" class="form-control inline wa">
                <option value=""> ---- </option>
                <option v-for="format in formatxx" :value="format.name" :key="format.name">
                    {{ format.name }}
                </option>
            </select>
        </template>
    </div>
</template>

<script>
import sss from '@/state.js'
import Reference from './Reference.vue'

export default {
    name: 'SimpleType',
    components: {
        Reference,
    },
    props: {
        schema: {
            type: Object,
            required: true,
        },
    },
    created() {
        this.formatxx = sss.project.getPreset('DataFormat').propertyManager.list
    },
    computed: {
        typexx() {
            return sss.project.document.simpleTypeList
        },
    },
    data() {
        return {
            formatxx: [],
        }
    },
}
</script>
