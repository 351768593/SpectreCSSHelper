<style scoped>

#ee {
	position: fixed;
	bottom: 0;
	right: 80px;
	width: 64px;
	height: 64px;
}
@keyframes ees-drop {
	0% { opacity: 0; top: -1500px; }
	50% { opacity: 1; top: -750px; }
	100% { opacity: 1; top: 0; }
}
@keyframes ees-wave {
	0% { transform: rotate(135deg); left: 0; }
	20% { transform: rotate(133deg); left: -2px; }
	40% { transform: rotate(137deg); left: 2px; }
	60% { transform: rotate(133deg); left: -2px; }
	80% { transform: rotate(137deg); left: 2px; }
	0% { transform: rotate(135deg); left: 0; }
}
#ees {
	position: absolute;
	transform: rotate(135deg);
	image-rendering: pixelated;
	height: 64px;

	animation: ees-drop 0.55s, ees-wave 0.3s;
	animation-delay: 0s, 0.55s;
	animation-timing-function: linear, linear;

	z-index: 0;
}
@keyframes eef-appear {
	from { opacity: 0; }
	to { opacity: 0.85; }
}
#eef {
	position: absolute;
	bottom: 0;
	left: 25%;

	height: 32px;
	opacity: 0;

	animation: eef-appear 0.5s;
	animation-delay: 0.9s;
	animation-fill-mode: both;

	z-index: 1;
}
#eett
{
	position: absolute;
	top: -130px;
	left: -77px;
	display: none;

	width: 215px;
	height: 110px;
	padding: 6px;
	border: 2px solid #2e0a65;
	border-radius: 2px;
	box-shadow: 0 0 0 3px #170817;
	background-color: #08082a;
	opacity: 0.9;

	font-family: "Minecraft";
}
#ee #ees:hover+#eett
{
	display: block;
}
#eettt
{
	color: #f3a;
	font-weight: bold;
}
#eette
{
	color: #aeabb0;
}
#eettst
{
	color: #21ff21;
}
</style>

<template>
	<div>
		<div id="ee" v-if="eeResources !== null">
			<img id="eef" :src="eeResources?.F?.url" v-show="processAnimation > 95" alt="fire"/>
			<img id="ees" :src="eeResources?.ES?.url" v-show="processAnimation > 95" alt="diamond-sword" ref="ees"/>
			<div id="eett">
				<div id="eettt">
					{{eeResources.T.data.t}}
				</div>
				<div id="eette">
					{{eeResources.T.data.e}}
				</div>
				<div id="eettst">
					{{eeResources.T.data.st}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {handleBlob} from "@/components/meta/Methods";
import {toByteArray} from 'base64-js'

export default {
	name: "EECompo",
	data() {
		return {
			eeResources: null,
			processAnimation: 0,
		};
	},
	async mounted() {
		let b64 = require('raw-loader!@/assets/resource/ee-pack.b64').default;
		let ui18a = toByteArray(b64);
		let blob = new Blob([ui18a]);
		let res = {
			"ES": await handleBlob('ES', blob, [0, 721], 'img'),
			"EDD": await handleBlob('EDD', blob, [721, 257823], 'audio'),
			"EDH1": await handleBlob('EDH1', blob, [257823, 268879], 'audio'),
			"EDH2": await handleBlob('EDH2', blob, [268879, 279759], 'audio'),
			"EDH3": await handleBlob('EDH3', blob, [279759, 290917], 'audio'),
			"EDH4": await handleBlob('EDH4', blob, [290917, 301729], 'audio'),
			"EDW1": await handleBlob('EDW1', blob, [301729, 312346], 'audio'),
			"EDW2": await handleBlob('EDW2', blob, [312346, 322827], 'audio'),
			"EDW3": await handleBlob('EDW3', blob, [322827, 333200], 'audio'),
			"E1": await handleBlob('E1', blob, [333200, 352932], 'audio'),
			"E2": await handleBlob('E2', blob, [352932, 378178], 'audio'),
			"E3": await handleBlob('E3', blob, [378178, 403476], 'audio'),
			"F": await handleBlob('F', blob, [403476, 418045], 'img'),
			"E4": await handleBlob("E4", blob, [418045, 443135], 'audio'),
			"GD": await handleBlob("GD", blob, [443135, 450040], 'audio'),
			"T": await handleBlob('T', blob, [450040, 450171], 'json'),
		};
		this.eeResources = res;
		this.eeResources.E1.data.play();

		let threadAnimation = setInterval(() => {
			this.processAnimation++;
			let processAnimation = this.processAnimation;

			if (processAnimation === 10) {
				this.$refs.ees.addEventListener('animationend', (e) => {
					if (e.animationName.startsWith('ees-drop')) {
						this.eeResources.GD.data.play();
					}
				});
			}

			if (processAnimation < 95 && processAnimation % 16 === 0) {
				[res.EDW1, res.EDW2, res.EDW3]
						[Math.floor(3 * Math.random())]
						.data.play();
			}

			if (processAnimation < 95 && processAnimation % 12 === 0) {
				[res.E1, res.E2, res.E3,]
						[Math.floor(3 * Math.random())]
						.data.play();
			}
			if (processAnimation > 10 && processAnimation < 75 && processAnimation % 23 === 2) {
				[res.EDH1, res.EDH2, res.EDH3, res.EDH4]
						[Math.floor(4 * Math.random())]
						.data.play();
			}

			if (processAnimation > 95) {
				res.E4.data.play();
				res.EDD.data.play();
				clearInterval(threadAnimation);
			}
		}, 100);
	},
}
</script>