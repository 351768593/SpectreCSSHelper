<style scoped>
.output-base
{
	margin-left: 12px;
}
.output-title
{
	text-align: right;
	font-size: 16px;
	line-height: 16px;
}
.output-title-text
{
	vertical-align: top;
}
.output-display
{
	margin: 0 0 20px 0;
	border: 1px dashed #cbcbcb;
}
.output-display:hover
{
	border: 1px dotted #969696;
}

</style>

<template>
<div class="output-base" :class="generator.inline ? 'd-inline-block' : 'd-block'">
	<div class="output-title">
		<span class="output-title-text text-gray text-small">{{generator.ctx}}</span>
		<span class="output-title-operation px-1">
			<span class="ri-code-s-slash-line mx-1 c-hand tooltip tooltip-left"
			      :data-tooltip="$t('msg-view-code')"
			      style="color: #9538f2"></span>
			<span class="ri-file-copy-2-line ml-1 c-hand tooltip tooltip-left"
			      :data-tooltip="$t('msg-copy-code')"
			      style="color: #389bf2"></span>
		</span>
	</div>
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