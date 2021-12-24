<style scoped>
.list-group
{
	color: #66758c;
	cursor: pointer;
	font-weight: 700;
}
.list-group:hover
{
	color: #5755d9;
}
.list-item
{
	color: #66758c;
	cursor: pointer;
}
.list-item:hover
{
	color: #5755d9;
}
</style>

<template>
	<div>
		<div v-if="tt === TreeGroup">
			<div @click="isShowChildren = ! isShowChildren" class="list-group">
				<span class="ri-arrow-down-s-line" v-if="isShowChildren"></span>
				<span class="ri-arrow-right-s-line" v-else></span>
				{{ $t(node.ctx) }}
			</div>
			<div v-if="isShowChildren" style="padding-left: 28px">
				<list-component-node :node="child" v-for="child in node.children" @click-node="clickNode($event)"/>
			</div>
		</div>

		<div v-else-if="tt === TreePage" class="list-item" @click="clickNode(node)">
			{{ $t(node.ctx) }}
		</div>
	</div>
</template>

<script>
import { TreeGroup, TreePage } from './meta/Consts';

export default {
	name: "ListComponentNode",
	props: {
		node: { type: Object },
		highlighted: { type: Object, default: null },
	},
	data() {
		return {
			TreeGroup, TreePage,
			isShowChildren: true,
		};
	},
	computed: {
		tt() {
			return this.node.tt;
		},
	},
	methods: {
		clickNode(node) {
			this.$emit('clickNode',node);
		},
	},
}
</script>