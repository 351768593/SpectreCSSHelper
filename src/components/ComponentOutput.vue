<style scoped>
.output-base
{
}
.output-info
{
	float: right;
	margin-right: 20px;
}
.output-ctx
{
	;
}
.output-display
{
	margin: 20px;
	border: 1px dashed #cbcbcb;
}
.output-display:hover
{
	border: 1px dotted #969696;
}

</style>

<template>
<div class="output-base" :class="generator.inline ? 'd-inline-block' : 'd-block'">
	<div class="output-info">{{generator.ctx}}</div>
	<div class="output-display" :style="styleDisplay">
		<div v-html="html"></div>
	</div>
</div>
</template>

<script>
export default {
	name: "ComponentOutput",
	props: {
		html: { type: String },
		generator: { type: Object },
	},
	computed: {
		styleDisplay() {
			let style = this.generator.style ?? {};
			style.minWidth ??= '160px';
			style.minHeight ??= '80px';
			return style;
		},
	},
}
</script>