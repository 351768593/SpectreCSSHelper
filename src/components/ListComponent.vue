<style scoped>
</style>

<template>
	<div v-for="nodeRoot in Metas" :key="nodeRoot.ctx" style="user-select: none">
		<list-component-node :node="nodeRoot" :highlighted="currentComponent" @click-node="clickNode($event)"/>
	</div>
</template>

<script>
// import { TypePages, MetaPages } from './meta/Consts';
import {
	TreeGroup,
	TreeItemPageSingle,
	TreePage,
	TreePropString,
	TreePropNumber,
	TreePropSlider,
	TreePropColor,
	TreePropBool,
	TreePropMultiSelect,
	TreePropSingleSelect,
	TreePropAnnotation,
} from "@/components/meta/Consts";
import MetaPages from "@/components/meta/Pages";
import ListComponentNode from "@/components/ListComponentNode";

// console.log('list-component', Pages, MetaPages);

export default {
	name: "ListComponent",
	components: {ListComponentNode},
	props: {
		currentComponent: { type: Object, default: {} },
	},
	emits: ['clickNode'],
	data() {
		return {
			Pages: {
				TreeGroup,
				TreeItemPageSingle,
				TreeItemPage: TreePage,
				TreePropString,
				TreePropNumber,
				TreePropSlider,
				TreePropColor,
				TreePropBool,
				TreePropMultiSelect,
				TreePropSingleSelect,
				TreePropAnnotation,
			},
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