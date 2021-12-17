<style scoped>
.nav
{
	padding: 4px 6px;
}

</style>

<template>
	<div v-for="nodeRoot in Metas">
		<list-component-node :node="nodeRoot" :highlighted="currentComponent" @click-node="clickNode($event)"/>
	</div>
</template>

<script>
import { TypePages, MetaPages } from './Consts';
import ListComponentNode from "@/components/ListComponentNode";
export default {
	name: "ListComponent",
	components: {ListComponentNode},
	props: {
		currentComponent: { type: Object, default: {} },
	},
	emits: ['clickNode'],
	data() {
		return {
			Pages: TypePages,
			Metas: MetaPages,
			isOpenElement: true,
			isOpenLayout: true,
			isOpenComponent: true,
			isOpenUtility: true,
			isOpenExperimental: true,
		};
	},
	methods: {
		clickNode(node) {
			this.$emit('clickNode', node);
		},
	},
}
</script>