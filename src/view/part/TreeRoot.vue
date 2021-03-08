<template>
    <div>
        <div>
            <span @click="expand" class="btn-expand">
                {{ expanded ? '+' : '-' }}
            </span>
            <AddButton :manager="root.folderManager" class="btn-outline-warning btn-sm"></AddButton>
        </div>

        <Tree :value="root.folderManager.list">
            <span slot-scope="{ node, path, tree }">
                <span v-if="node.isLayer" class="btn-layer"> | </span>
                <span v-else @click="tree.toggleFold(node, path)" class="btn-expand">
                    {{ node.$folded ? '+' : '-' }}
                </span>
                <span @click="$emit('show', node)" class="pointer mr11">{{ node.name }}</span>

                <span v-if="node.isLayer"></span>
                <b-button-group v-else>
                    <AddButton :manager="node.folderManager" class="btn-outline-warning btn-sm"></AddButton>
                    <AddButton :manager="node.layerManager" class="btn-sm"></AddButton>
                </b-button-group>
            </span>
        </Tree>
    </div>
</template>

<script>
import { Tree, Fold, foldAll, unfoldAll } from 'he-tree-vue'
import AddButton from '../button/AddButton.vue'

export default {
    name: 'TreeRoot',
    components: {
        AddButton,
        Tree: Tree.mixPlugins([Fold]),
    },
    props: {
        root: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            expanded: true,
        }
    },
    methods: {
        expand() {
            this.expanded = !this.expanded
            if (this.expanded) {
                foldAll(this.root.folderManager.list)
            } else {
                unfoldAll(this.root.folderManager.list)
            }
        },
    },
}
</script>

<style>
.btn-expand {
    color: gray;
    cursor: pointer;
    display: inline-block;
    font-size: x-large;
    font-weight: bold;
    height: 33px;
    text-align: center;
    width: 33px;
}

.btn-expand:hover {
    color: orange;
}

.btn-layer {
    color: dodgerblue;
    margin-left: 25px;
}
</style>
