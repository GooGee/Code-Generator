<template>
    <div>
        <template v-if="editing">
            <table class="table table-borderless">
                <caption>
                    <b-button @click="editing = false" variant="outline-primary"> OK </b-button>
                </caption>
                <thead>
                    <tr>
                        <th style="width: 244px;"></th>
                        <th></th>
                    </tr>
                </thead>
                <draggable v-model="manager.list" group="rule" tag="tbody">
                    <Rule
                        v-for="rule in manager.list"
                        :key="rule.name"
                        :rule="rule"
                        :rexx="rexx"
                        :manager="manager"
                    ></Rule>
                </draggable>
            </table>

            <b-card no-body>
                <b-tabs pills vertical>
                    <b-tab
                        v-for="kind in tabxx"
                        :key="kind"
                        :title="kind"
                        @click="tab = kind"
                        :class="{ active: kind === tab }"
                    >
                        <ul class="list-unstyled">
                            <li v-for="rule in list" :key="rule.name" class="mt11">
                                <b-button @click="add(rule)" variant="outline-primary" class="mr11">
                                    +
                                </b-button>
                                <OpenButton :file="link(rule)">{{ rule.name }}</OpenButton>
                            </li>
                        </ul>
                    </b-tab>
                </b-tabs>
            </b-card>
        </template>

        <template v-else>
            <div v-if="manager.list.length === 0" @click="editing = true" class="pointer">....</div>

            <ul v-else @click="editing = true" class="list-unstyled pointer">
                <li v-for="rule in manager.list" :key="rule.name">
                    {{ rule.value ? `${rule.name}:${rule.value}` : rule.name }}
                </li>
            </ul>
        </template>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import OpenButton from '../button/OpenButton.vue'
import Rule from './Rule.vue'

export default {
    name: 'RuleTab',
    components: {
        draggable,
        OpenButton,
        Rule,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        rexx: {
            type: Array,
            required: true,
        },
        rulexx: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            editing: false,
            tab: 'WWW',
            tabxx: [],
        }
    },
    computed: {
        list() {
            return this.rulexx.filter(rule => rule.tag === this.tab)
        },
    },
    created() {
        const sss = new Set()
        this.rulexx.forEach(rule => {
            sss.add(rule.tag)
        })
        this.tabxx = Array.from(sss.keys())
    },
    methods: {
        add(rule) {
            try {
                const rrr = this.manager.make(rule.name)
                this.manager.add(rrr)
            } catch (error) {
                this.$root.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        link(rule) {
            const map = new Map([
                ['sometimes', '#validating-when-present'],
                ['multiple_of', '#multiple-of'],
            ])
            const uri = 'https://laravel.com/docs/9.x/validation'
            const found = map.get(rule.name)
            if (found) {
                return uri + found
            }
            const name = rule.name.replace('_', '-')
            return `${uri}#rule-${name}`
        },
    },
}
</script>
