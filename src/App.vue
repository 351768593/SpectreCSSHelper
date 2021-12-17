<style>
@import '~remixicon/fonts/remixicon.css';
@import '~spectre.css/dist/spectre.min.css';
@import '~spectre.css/dist/spectre-exp.min.css';
@import '~spectre.css/dist/spectre-icons.min.css';

</style>
<style scoped>
#body-base {
	display: flex;
	flex-wrap: nowrap;
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;

	height: 100vh;
}
#panel-operation-base
{
	flex-grow: 1;
	flex-shrink: 0;

	width: 200px;

	display: flex;
	flex-wrap: nowrap;
	flex-direction: column;
	justify-content: space-between;
	align-items: stretch;
}
#panel-operation-header
{
	flex-grow: 0;
	flex-shrink: 1;

	width: 100%;
}
#panel-operation-body
{
	flex-grow: 1;
}

#panel-list-component-base
{
	width: 200px;
}
#header-chips-base
{
	overflow: hidden;

	width: 100%;
	height: 28px;
}
#header-chips-inner
{
	overflow-y: hidden;
	overflow-x: scroll;
	width: 100%;
	height: calc(100% + 17px);
	position: relative;
	top: 8px;

	white-space: nowrap;
}

.navbar-section .chip
{
	background-color: #727272;
}

.chip
{
	cursor: pointer;
}
.chip-close:hover
{
	color: #9494d0;
}

#panel-operation-body
{
	overflow-y: scroll;
}
#panel-operation-component
{
	display: flex;
	flex-wrap: nowrap;
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;

}
#panel-content-base
{
	flex-grow: 0;
	min-width: 250px;
}
#panel-output-base
{
	flex-grow: 1;
}

</style>

<template>
	<div id="body-base">
		<div id="panel-list-component-base" class="bg-gray">
			<list-component :current-component="currentPage" @click-node="clickNode($event)"/>
		</div>

		<div id="panel-operation-base">
			<header class="navbar bg-dark px-2" id="panel-operation-header">
				<section class="navbar-section" id="header-chips-base">
					<!-- 隐藏内部滚动条 -->
					<div id="header-chips-inner">
						<span class="chip">
							<span class="ri-home-4-line mr-1"></span>
							home
						</span>
						<template v-for="(objComponent, indexComponent) in listPages">
						<span class="chip">
							<span @click="currentPage = objComponent">{{ objComponent.key }}</span>
							<span class="ri-close-line ml-1 chip-close" @click="closePage(indexComponent)"></span>
						</span>
						</template>
					</div>
				</section>
			</header>

			<div id="panel-operation-body">
				<div v-if="currentPage != null" id="panel-operation-component">
					<div id="panel-content-base">
						<div>
							{{ currentPage.key }} /
							{{ currentPage.ctx }}
						</div>
						<div style="user-select: none">
							<div v-for="(prop,indexProp) in currentPage.props">
								<!-- 文本输入框 -->
								<div class="form-group" v-if="prop.tt === TreePropString">
									<label class="form-label" :for="'PROP-' + prop.ctx">{{ prop.ctx }}</label>
									<input type="text" class="form-input"
									       :id="'PROP-' + prop.ctx"
									       v-model="prop.currentValue">
								</div>
								<!-- 数字输入框 -->
								<div class="form-group" v-else-if="prop.tt === TreePropNumber">
									<label class="form-label" :for="'PROP-' + prop.ctx">{{ prop.ctx }}</label>
									<input type="number" class="form-input"
									       :step="prop.stepValue" :min="prop.minValue" :max="prop.maxValue"
									       :id="'PROP-' + prop.ctx"
									       v-model="prop.currentValue">
									<div class="text-gray text-small text-right">
										{{ prop.minValue }} ~ {{ prop.maxValue }}, {{ prop.stepValue }}
									</div>
								</div>
								<!-- 布尔型 -->
								<div class="form-group" v-else-if="prop.tt === TreePropBool">
									<label class="form-switch">
										<input type="checkbox" v-model="prop.currentValue">
										<i class="form-icon"></i> {{ prop.ctx }}
									</label>
								</div>
								<!-- 滑动条 -->
								<div class="form-group" v-else-if="prop.tt === TreePropSlider">
									<label class="form-label" :for="'PROP-' + prop.ctx">{{ prop.ctx }}</label>
									<input type="range" class="slider px-2 tooltip"
									       :step="prop.stepValue" :min="prop.minValue" :max="prop.maxValue"
									       :id="'PROP-' + prop.ctx"
									       v-model="prop.currentValue" :data-tooltip="prop.currentValue">
									<div class="text-gray text-small text-right">
										{{ prop.minText }} ~ {{ prop.maxText }}
									</div>
								</div>
								<!-- 单选 -->
								<div class="form-group" v-else-if="prop.tt === TreePropSingleSelect">
									<label class="form-label">{{prop.ctx}}</label>
									<label class="form-radio"
									       v-for="option in prop.options"
									       @click.prevent="prop.currentValue = option">
										<input type="radio" :name="'PROP-' + prop.ctx"
										       :checked="prop.currentValue === option">
										<i class="form-icon"></i> {{option}}
									</label>
								</div>
								<!-- 多选 -->
								<div class="form-group" v-else-if="prop.tt === TreePropMultiSelect">
									<label class="form-label" :for="'PROP-' + prop.ctx">{{prop.ctx}}</label>
									<label class="form-checkbox"
									       v-for="option in prop.options"
									       @click.prevent="prop.currentValue.indexOf(option) >= 0 ? prop.currentValue.splice(prop.currentValue.indexOf(option),1) : prop.currentValue.push(option)">
										<input type="checkbox"
										       :name="'PROP-' + prop.ctx + '-' + option"
										       :checked="prop.currentValue.indexOf(option) >= 0">
										<i class="form-icon"></i> {{ option }}
									</label>
								</div>

							</div>
						</div>
					</div>

					<div id="panel-output-base">
						<div v-if="currentComponentOutput?.length">
							<component-output v-for="output in currentComponentOutput"
							                  :generator="output.generator"
							                  :html="output.html"/>
						</div>
						<div v-else>
							无输出项
						</div>
					</div>
				</div>
				<div v-else id="panel-operation-homepage">
					homepage
				</div>
			</div>

		</div>
	</div>
</template>

<script>

import ListComponent from "@/components/ListComponent";
import { TreePropString,TreePropNumber,TreePropSlider,TreePropBool,TreeGroup,TreePropMultiSelect,TreePropSingleSelect, MetaPages } from "@/components/Consts";
import ComponentOutput from "@/components/ComponentOutput";

export default {
	name: 'App',
	components: {
		ComponentOutput,
		ListComponent
	},
	data() {
		return {
			TreePropString,
			TreePropNumber,
			TreePropSlider,
			TreePropBool,
			TreeGroup,
			TreePropMultiSelect,
			TreePropSingleSelect,
			MetaPages,

			// 打开的组件列表
			listPages: [

			],
			// 当前的组件
			currentPage: null,
			// 是否展示左侧组件目录
			isShowLeftListComponent: true,
			// 是否展示代码
		};
	},
	computed: {
		currentComponentOutput()
		{
			if(!this.currentPage?.generators) return null;

			const values = []; // 所有的props当前的值
			for(let prop of this.currentPage.props)
				values.push(prop.currentValue);

			const retOutputs = [];
			for(let generator of this.currentPage.generators)
			{
				retOutputs.push({
					generator,
					html: generator.func(values),
				});
			}
			return retOutputs;
		},
	},
	methods: {
		closePage(indexComponent)
		{
			this.listPages.splice(indexComponent, 1);
		},
		clickNode(node) // 左侧树单击某个节点 准备创建一个新的页面
		{
			console.log('node',node);
			const objPage = {
				tt: node.tt,
				key: node.key,
				props: [],
				generators: node.generators,
			};

			for(let metaProp of node.props)
			{
				const objValue = Object.assign({}, metaProp, { currentValue: metaProp.defaultValue });
				objPage.props.push(objValue);
			}

			this.listPages.push(objPage);
			this.currentPage = objPage;
		}
	},
	mounted() {
		this.clickNode(MetaPages[0].children[2]);
	}
}
</script>
