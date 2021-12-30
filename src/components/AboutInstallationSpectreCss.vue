<style scoped>
#t-a-i-m .btn-oper
{
	cursor: pointer;
	font-size: 24px;
	line-height: 8px;
	height: 16px;
}
</style>

<template>
<div class="p-2">
	<h3 v-t="'p-others.about-installation.official'"></h3>

	<p>
		<a target="_blank" class="btn btn-link"
		   href="https://picturepan2.github.io/spectre/index.html">
			<span class="ri-external-link-line"></span>
			Official Doc
		</a>

		<br>
		
		<a target="_blank" class="btn btn-link"
		   href="https://github.com/picturepan2/spectre">
			<span class="ri-github-line"></span>
			GitHub
		</a>
	</p>

	<h3 v-t="'p-others.about-installation.manually'"></h3>

	<table class="table" id="t-a-i-m">
		<thead>
		<tr>
			<td></td>
			<td>.css</td>
			<td>.min.css</td>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>
				spectre
			</td>
			<td>
				<a href="spectre.css" target="_blank" class="ri-share-box-line btn-oper btn btn-link"></a>
<!--				<a class="ri-file-copy-2-line btn-oper btn btn-link"></a>-->
			</td>
			<td>
				<a href="spectre.min.css" target="_blank" class="ri-share-box-line btn-oper btn btn-link"></a>
<!--				<a class="ri-file-copy-2-line btn-oper btn btn-link"></a>-->
			</td>
		</tr>
		<tr>
			<td>
				spectre-exp
			</td>
			<td>
				<a href="spectre-exp.css" target="_blank" class="ri-share-box-line btn-oper btn btn-link"></a>
<!--				<a class="ri-file-copy-2-line btn-oper btn btn-link"></a>-->
			</td>
			<td>
				<a href="spectre-exp.min.css" target="_blank" class="ri-share-box-line btn-oper btn btn-link"></a>
<!--				<a class="ri-file-copy-2-line btn-oper btn btn-link"></a>-->
			</td>
		</tr>
		<tr>
			<td>
				spectre-icon
			</td>
			<td>
				<a href="spectre-icons.css" target="_blank" class="ri-share-box-line btn-oper btn btn-link"></a>
<!--				<a class="ri-file-copy-2-line btn-oper btn btn-link"></a>-->
			</td>
			<td>
				<a href="spectre-icons.min.css" target="_blank" class="ri-share-box-line btn-oper btn btn-link"></a>
<!--				<a class="ri-file-copy-2-line btn-oper btn btn-link"></a>-->
			</td>
		</tr>
		<tr>
			<td class="text-bold">
				all.zip
			</td>
			<td>
				<a href="spectre.css.zip" class="ri-folder-zip-line btn-oper btn btn-link"></a>
			</td>
			<td>
				<a href="spectre.css.min.zip" class="ri-folder-zip-line btn-oper btn btn-link"></a>
			</td>
		</tr>
		</tbody>
	</table>

	<highlightjs class="code" data-lang="HTML" language="xml" :code="manuallyHtml"/>

	<h3 v-t="'p-others.about-installation.cdn'"></h3>

	<h4>unpkg (*.min.css)</h4>

	<highlightjs class="code" data-lang="HTML" language="xml" :code="cdnUnpkgHtml"/>

	<h4>cdnjs (*.min.css)</h4>

	<highlightjs class="code" data-lang="HTML" language="xml" :code="cdnCdnjsHtml"/>

	<h4>cdnjs (*.css)</h4>

	<highlightjs class="code" data-lang="HTML" language="xml" :code="cdnCdnjsFullHtml"/>

	<h3 v-t="'p-others.about-installation.npm'"></h3>

	<highlightjs class="code" data-lang="Bash" language="bash" :code="npmBatch"/>

	<h3 v-t="'p-others.about-installation.yarn'"></h3>

	<highlightjs class="code" data-lang="Bash" language="bash" :code="yarnBatch"/>

	<h3 v-t="'p-others.about-installation.bower'"></h3>

	<highlightjs class="code" data-lang="Bash" language="bash" :code="bowerBatch"/>

</div>
</template>

<script>
export default {
	name: "AboutInstallationSpectreCss",
	computed: {
		manuallyHtml: () => `<link rel="stylesheet" href="spectre.min.css">
<link rel="stylesheet" href="spectre-exp.min.css">
<link rel="stylesheet" href="spectre-icons.min.css">`,
		cdnUnpkgHtml: () => `<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css">
<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css">
<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css">`,

		cdnCdnjsHtml: () => `<link ref="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/spectre.css/0.5.9/spectre.css">
<link ref="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/spectre.css/0.5.9/spectre-exp.css">
<link ref="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/spectre.css/0.5.9/spectre-icons.css">`,

		cdnCdnjsFullHtml: () => `<link ref="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/spectre.css/0.5.9/spectre.min.css">
<link ref="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/spectre.css/0.5.9/spectre-exp.min.css">
<link ref="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/spectre.css/0.5.9/spectre-icons.min.css">`,

		npmBatch: () => `npm install spectre.css --save`,

		yarnBatch: () => `yarn add spectre.css`,

		bowerBatch: () => `bower install spectre.css --save`,
	},
}
</script>