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
.modal-code-container
{
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: stretch;
	align-content: stretch;
}
.modal-code-body
{
	flex-grow: 0;
	overflow-y: scroll;
	border: 1px gray solid;
}
.modal-code-operation
{
	flex-grow: 0;
}

</style>

<template>
<div class="output-base" :class="generator.inline ? 'd-inline-block' : 'd-block'">
	<div class="output-title">
<!--		<span class="output-title-text text-gray text-small">{{generator.ctx}}</span>-->
		<span class="output-title-operation px-1">
			<span class="ri-information-line mr-1 tooltip tooltip-left"
			      :data-tooltip="generator.ctx" style="color: #b8cc6c"></span>
			<span class="ri-code-s-slash-line mx-1 c-hand tooltip tooltip-left"
			      :data-tooltip="$t('msg-view-code')"
			      @click="isShowModalCode = true"
			      style="color: #9538f2"></span>
			<span class="ri-file-copy-2-line ml-1 c-hand tooltip tooltip-left"
			      :data-tooltip="$t('msg-copy-code')"
			      @click="clickCopyCode(html)"
			      style="color: #389bf2"></span>
		</span>
	</div>
	<div class="output-display" :style="styleDisplay">
		<div v-html="html"></div>
	</div>

	<div class="modal modal-lg" :class="isShowModalCode ? 'active' : ''">
		<a class="modal-overlay c-hand" aria-label="Close" @click="isShowModalCode = false"></a>
		<div class="modal-container modal-code-container">

			<div class="modal-code-operation">
				<span data-clipboard-action="copy"
				      :data-clipboard-text="html"
				      :id="'for-line-height-and-copy' + generator.ctx">&ensp;</span>
				<span class="float-left">
					{{generator.ctx}}
				</span>
				<span class="float-right" style="font-size: 24px">
					<span class="ri-file-copy-2-line c-hand tooltip tooltip-left"
					      :data-tooltip="$t('msg-copy-code')"
					      @click="clickCopyCode(html)"
					      style="color: #389bf2; font-size: 24px"></span>
					<span class="ri-close-line ml-2 c-hand"
					      @click="isShowModalCode = false"
					      style="color: #0739ef;"></span>
				</span>
			</div>

			<div class="modal-code-body">
				<highlightjs
						v-if="isShowModalCode"
						language="xml"
						:code="html"
				/>
			</div>

		</div>
	</div>
</div>
</template>

<script>
import jsb from 'js-beautify';

export default {
	name: "ComponentOutput",
	props: {
		html: { type: String },
		generator: { type: Object },
	},
	data(){

		return {
			isShowModalCode: false,
		};
	},
	computed: {
		styleDisplay() {
			let style = this.generator.style ?? {};
			style.minWidth ??= '80px';
			style.minHeight ??= '40px';
			return style;
		},
	},
	methods: {
		clickCopyCode(raw) {

			navigator.clipboard.writeText(jsb.html(raw))
			.then(r=>{
				this.isShowModalCode = false;
			})
			.catch(e=>{
				alert('复制失败\n'+e);
			});

			console.log('finished');
			// this.isShowModalCode = false;
		},
	},
}
</script>