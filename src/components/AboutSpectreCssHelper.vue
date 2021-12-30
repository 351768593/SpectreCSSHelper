<style scoped>
#ee-controller
{
	user-select: none;
	position: absolute;
	border: 1px solid #0b3ecc;
	border-radius: 20px;
	width: 320px;
	height: 160px;
}
#btn-up { position: absolute; left: 60px; top: 20px; }
#btn-down { position: absolute; left: 60px; top: 100px; }
#btn-left { position: absolute; left: 20px; top: 60px; }
#btn-right { position: absolute; left: 100px; top: 60px; }
#btn-b { position: absolute; left: 200px; top: 95px; }
#btn-a { position: absolute; left: 250px; top: 95px; }
#title
{
	position: absolute;
	left: 165px;
	top: 20px;
	width: 180px;
	font-weight: bold;
	font-family: Minecraft;
	color: #141b94;
}
#subtitle
{
	position: absolute;
	left: 205px;
	top: 40px;
	font-family: Minecraft;
	color: #282f8f;
}
</style>

<template>
<div>
	<div style="margin: 40px">
		<div id="ee-controller">
			<div class="p-absolute">
				<span class="btn btn-action ri-arrow-up-line" id="btn-up"></span>
				<span class="btn btn-action ri-arrow-down-line" id="btn-down"></span>
				<span class="btn btn-action ri-arrow-left-line" id="btn-left"></span>
				<span class="btn btn-action ri-arrow-right-line" id="btn-right"></span>

				<span class="btn btn-action s-circle" id="btn-b">B</span>
				<span class="btn btn-action s-circle" id="btn-a">A</span>

				<span id="title">
					The Controller
				</span>
				<span id="subtitle">
					Firok
				</span>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: "AboutSpectreCssHelper"
}
</script>