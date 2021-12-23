<style>
@import '~remixicon/fonts/remixicon.css';
@import '~spectre.css/dist/spectre.min.css';
@import '~spectre.css/dist/spectre-exp.min.css';
@import '~spectre.css/dist/spectre-icons.min.css';

.scroll-y
{
	height: 100%;
	overflow-y: auto;
}

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
	height: 100%;

	display: flex;
	flex-wrap: nowrap;
	flex-direction: column;
	justify-content: space-between;
	align-items: stretch;
}
/*#panel-operation-header*/
/*{*/
/*	flex-grow: 0;*/
/*	flex-shrink: 1;*/

/*	width: 100%;*/
/*}*/
#panel-operation-body
{
	flex-grow: 1;

	overflow-y: hidden;
}

#panel-list-component-base
{
	width: 200px;
}

#panel-operation-component
{
	display: flex;
	flex-wrap: nowrap;
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;

	height: 100%;
}
#panel-content-base
{
	flex-grow: 0;
	width: 300px;
}
#panel-output-base
{
	flex-grow: 1;
}

</style>

<template>
	<div id="body-base">
		<div id="panel-list-component-base"
		     class="bg-gray scroll-y" v-show="isShowLeftListComponent">
			<list-component :current-component="currentPage"
			                @click-node="clickNode($event)"/>
		</div>

		<div id="panel-operation-base">
			<div>
				<ul class="tab">
					<li class="tab-item active" v-if="currentPage.type === 'empty'">
						<a>
							<span class="text-gray">
								empty page
							</span>
						</a>
					</li>

					<li class="tab-item active" v-if="currentPage.type === 'about-installation'">
						<a>
							installation
						</a>
					</li>

					<li class="tab-item"
					    :class="currentPage === page ? ' active' : ''"
					    v-for="(page,indexPage) in listPages">
						<a href="#">
							<span @click="currentPage = page">{{page.key}}</span>
							<button class="btn btn-clear" @click="closePage(indexPage)"></button>
						</a>
					</li>

					<li class="tab-item tab-action">
						<span>
							<span class="ri-list-unordered" @click="isShowLeftListComponent = !isShowLeftListComponent"></span>
							<span class="ri-delete-bin-3-line" @click="closeAllPages()"></span>
						</span>
					</li>
				</ul>
			</div>

			<div id="panel-operation-body">
				<div v-if="currentPage.type === 'component'" id="panel-operation-component">
					<div id="panel-content-base" class="scroll-y">
						<div v-if="currentPage.url !== ''">
							<a :href="url.url" target="_blank" v-for="url in currentPage.listUrl">
								<button class="btn">
									{{ url.key }}
									<span class="ri-external-link-line"></span>
								</button>
							</a>
						</div>
						<div style="user-select: none">
							<div v-if="currentPage.props?.length === 0">
								无配置项
							</div>
							<div v-for="(prop,indexProp) in currentPage.props" :key="prop.ctx">
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
									       v-model.number="prop.currentValue" :data-tooltip="prop.currentValue">
									<div class="text-gray text-small text-right">
										{{ prop.minText }} ~ {{ prop.maxText }}
									</div>
								</div>
								<div class="form-group" v-else-if="prop.tt === TreePropColor">
									<label class="form-label" :for="'PROP-' + prop.ctx">{{ prop.ctx }}</label>
									<input type="color" class="form-input" :id="'PROP-' + prop.ctx" v-model="prop.currentValue">
									<div class="text-right mt-1">{{ prop.currentValue }}</div>
								</div>
								<!-- 单选 -->
								<div class="form-group" v-else-if="prop.tt === TreePropSingleSelect">
									<label class="form-label">{{prop.ctx}}</label>
									<label class="form-radio form-inline"
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
									<label class="form-checkbox  form-inline"
									       v-for="option in prop.options"
									       @click.prevent="prop.currentValue.indexOf(option) >= 0 ? prop.currentValue.splice(prop.currentValue.indexOf(option),1) : prop.currentValue.push(option)">
										<input type="checkbox"
										       :name="'PROP-' + prop.ctx + '-' + option"
										       :checked="prop.currentValue.indexOf(option) >= 0">
										<i class="form-icon"></i> {{ option }}
									</label>
								</div>
								<!-- 注释 -->
								<div class="form-group" v-else-if="prop.tt === TreePropAnnotation">
									<div class="">{{prop.defaultValue}}</div>
								</div>

							</div>
						</div>
					</div>

					<div id="panel-output-base" class="scroll-y">
						<div v-if="currentComponentOutput?.length" style="margin: 14px 14px 0 14px">
							<component-output v-for="output in currentComponentOutput"
							                  :generator="output.generator"
							                  :html="output.html"/>
						</div>
						<div v-else-if="currentComponentOutput?.length === 0">
							无输出项
						</div>
					</div>
				</div>
				<div v-else-if="currentPage.type === 'about-installation'" id="panel-operation-homepage" class="scroll-y">
<!--					<home-page/>-->
					主页
				</div>
				<div v-else-if="currentPage.type === 'empty'" style="height: 100%">
					<div class="empty" style="height: 100%">
						<div class="empty-icon">
							<i class="ri-loader-2-line ri-3x"></i>
						</div>
						<p class="empty-title h5">no pages</p>
					</div>
				</div>
			</div>

		</div>


	</div>
</template>

<script>

import ListComponent from "@/components/ListComponent";
import {
	TreePropString,
	TreePropNumber,
	TreePropSlider,
	TreePropColor,
	TreePropBool,
	TreeGroup,
	TreePropMultiSelect,
	TreePropSingleSelect,
	TreePropAnnotation,
} from "@/components/meta/Consts";
import MetaPages from "@/components/meta/Pages.js";
import ComponentOutput from "@/components/ComponentOutput";

const EMPTY_PAGE = { type: 'empty' };
const INSTALLATION_PAGE = { type: 'about-installation' };

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
			TreePropColor,
			TreePropBool,
			TreeGroup,
			TreePropMultiSelect,
			TreePropSingleSelect,
			TreePropAnnotation,
			MetaPages,

			EMPTY_PAGE,
			INSTALLATION_PAGE,

			// 打开的组件列表
			listPages: [
			],
			// 当前的组件
			currentPage: EMPTY_PAGE,
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
			for(let prop of this.currentPage.props) // 这里会忽略注释
			{
				switch(prop.tt)
				{
					case TreePropString:
					case TreePropNumber:
					case TreePropSlider:
					case TreePropColor:
					case TreePropBool:
					case TreeGroup:
					case TreePropMultiSelect:
					case TreePropSingleSelect:
						values.push(prop.currentValue);
				}
			}

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

			if(this.listPages.length <= 0)
				this.currentPage = this.EMPTY_PAGE;
			else
				this.currentPage = this.listPages[Math.min(this.listPages.length - 1, indexComponent)];
		},
		closeAllPages()
		{
			this.listPages.splice(0,this.listPages.length);
			this.currentPage = this.EMPTY_PAGE;
		},
		clickNode(node) // 左侧树单击某个节点 准备创建一个新的页面
		{
			// console.log('node',node);
			const objPage = {
				tt: node.tt,
				type: 'component',
				key: node.key,
				props: [],
				generators: node.generators,
				listUrl: node.listUrl,
				listUnimplemented: node.listUnimplemented,
			};

			for(let metaProp of node.props)
			{
				const objValue = Object.assign({}, metaProp, { currentValue: metaProp.defaultValue });
				objPage.props.push(objValue);
			}

			this.listPages.push(objPage);
			this.currentPage = objPage;
		},

	},
	mounted() {
		// this.clickNode(MetaPages[0].children[4]);
	}
}
</script>
