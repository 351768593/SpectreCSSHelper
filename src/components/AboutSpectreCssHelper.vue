<!--suppress JSIncompatibleTypesComparison -->
<style scoped>
#ee-controller
{
	user-select: none;
	margin: 100px auto 0 auto;
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
#tm
{
	position: absolute;
	left: 115px;
	top: 35px;
	width: 180px;
	font-weight: bold;
	font-family: Minecraft;
	color: #141b94;
}
#led {
	position: absolute;
	left: 165px;
	top: 35px;
	width: 180px;
	font-weight: bold;

	color: #f62222;
}
@keyframes led-on {
	0% { color: lawngreen; }

	25% { color: dodgerblue; }

	50% { color: yellow; }

	75% { color: hotpink; }

	100% { color: lawngreen; }
}
.on
{
	animation: led-on 2s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
	animation-fill-mode: both;
}

</style>

<template>
<div style="user-select: none" class="text-center">
	<div class="text-center" style="padding-top: 50px">

		<h3>
			Spectre.css Helper
		</h3>
		<h5>
			0.0.14 by Firok
		</h5>

		<p style="margin: 40px 0">
			<a href="https://github.com/351768593/SpectreCSSHelper" target="_blank">
				<span class="btn">
					<span class="ri-github-line"></span>
					View on GitHub
				</span>
			</a>
		</p>

	</div>
	<div id="ee-controller">
		<div class="p-absolute">
			<span class="btn btn-action ri-arrow-up-line" id="btn-up" @click="c('↑')"></span>
			<span class="btn btn-action ri-arrow-down-line" id="btn-down" @click="c('↓')"></span>
			<span class="btn btn-action ri-arrow-left-line" id="btn-left" @click="c('←')"></span>
			<span class="btn btn-action ri-arrow-right-line" id="btn-right" @click="c('→')"></span>

			<span class="btn btn-action s-circle" id="btn-b" @click="c('B')">B</span>
			<span class="btn btn-action s-circle" id="btn-a" @click="c('A')">A</span>

			<span id="tm">PlayU ™</span>
			<span id="led" class="ri-checkbox-blank-circle-fill" :class="isLedOn ? 'on' : ''"></span>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: "AboutSpectreCssHelper",
	props: {
		isLedOn: { type: Boolean, default: false },
	},
	data() {
		return {
			keys: [0,0,0,0, 0,0,0,0, 0,0,0,0],
			step: 0,

		};
	},
	emits: [ 'cheat' ],
	methods: {
		c(key) {
			this.keys[this.step] = key;
			this.step = (this.step + 1) % 12;

			let arr = ['↑','↑','↓','↓', '←','→','←','→', 'B','A','B','A'];
			let pass = true;
			for(let s = 0; s < 12; s++)
			{
				if(this.keys[(s + this.step) % 12] !== arr[s])
				{
					pass = false;
					break;
				}
			}

			if(pass) this.t();
		},
		t(){
			for(let step = 0; step < 12; step ++)
				this.keys[step] = 0;
			this.$emit('cheat');
		},
	},
}
</script>