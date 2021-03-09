<template>
    <div>
        <div>
            <span @click="expandAll" class="btn-expand">
                {{ expanded ? '-' : '+' }}
            </span>
            <AddButton :manager="root.folderManager" class="btn-outline-warning btn-sm"></AddButton>
        </div>

        <Tree :value="root.folderManager.list">
            <span slot-scope="{ node, path, tree }" class="node-item">
                <span :class="node.isLayer ? 'node-layer' : 'node-folder'"> | </span>
                <span @click="expand(node, path, tree)" class="pointer mr11">{{ node.name }}</span>

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
        expand(node, path, tree) {
            if (node.isLayer) {
                //
            } else {
                tree.toggleFold(node, path)
            }
            this.$emit('show', node)
        },
        expandAll() {
            this.expanded = !this.expanded
            if (this.expanded) {
                unfoldAll(this.root.folderManager.list)
            } else {
                foldAll(this.root.folderManager.list)
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
    height: 44px;
    text-align: center;
    width: 33px;
}

.node-folder {
    color: orange;
}

.node-item {
    display: inline-block;
    height: 44px;
}

.node-layer {
    color: dodgerblue;
}
</style>
