<style>
@import '~remixicon/fonts/remixicon.css';
@import '~spectre.css/dist/spectre.min.css';
@import '~spectre.css/dist/spectre-exp.min.css';
@import '~spectre.css/dist/spectre-icons.min.css';
@import '~highlight.js/styles/xcode.css';

.scroll-y
{
	height: 100%;
	overflow-y: auto;
}
.hljs
{
	font-family: "JetBrains Mono";
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
	flex-shrink: 0;
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
				<ul class="tab"
				    style="user-select: none">
					<li class="tab-item active" v-if="currentPage.type === 'empty'">
						<a class="px-2">
							<span class="text-gray">
								{{ $t('p-others.empty.#title') }}
							</span>
						</a>
					</li>

					<li class="tab-item pl-1"
					    :class="currentPage === page ? ' active' : ''"
					    v-for="(page,indexPage) in listPages">
						<a>
							<span @click="currentPage = page" @click.middle.prevent="page.pinned = !page.pinned">
								{{ $t(page.ctx) }}
							</span>
							<button v-if="!page.pinned" class="btn btn-clear" @click="closePage(indexPage)"></button>
							<span v-else class="ri-pushpin-fill d-inline-block" style="margin-left: 8px; line-height: 12px; width: 14px;"></span>
						</a>
					</li>

					<li class="tab-item tab-action">
						<span>
<!--							<span class="ri-translate mr-2 c-hand tooltip tooltip-left"-->
<!--							      :data-tooltip="$t('msg-switch-translation')"-->
<!--							      style="color: #6786b0"-->
<!--							      @click="void(0)"></span>-->
							<span class="ri-list-unordered mr-2 c-hand tooltip tooltip-left"
							      :data-tooltip="$t('msg-show-list-component')"
							      :style="{color: isShowLeftListComponent ? '#ee8e13' : '' }"
							      @click="isShowLeftListComponent = !isShowLeftListComponent"></span>
							<span class="ri-delete-bin-3-line mr-2 c-hand tooltip tooltip-left"
							      :data-tooltip="$t('msg-close-all-pages')"
							      :style="{color: listPages.length ? '#da157e' : '#a6a6a6' }"
							      @click="closeAllPages()"></span>
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
								{{ $t('msg-no-config-item') }}
							</div>
							<div v-else class="px-2">
								<div v-for="(prop,indexProp) in currentPage.props" :key="prop.ctx">
									<!-- 文本输入框 -->
									<div class="form-group" v-if="prop.type === TreePropString">
										<label class="form-label" :for="'PROP-' + prop.ctx">{{ $t(prop.ctx) }}</label>
										<input type="text" class="form-input"
										       :id="'PROP-' + prop.ctx"
										       v-model="prop.currentValue">
									</div>
									<!-- 数字输入框 -->
									<div class="form-group" v-else-if="prop.type === TreePropNumber">
										<label class="form-label" :for="'PROP-' + prop.ctx">{{ $t(prop.ctx) }}</label>
										<input type="number" class="form-input"
										       :step="prop.stepValue" :min="prop.minValue" :max="prop.maxValue"
										       :id="'PROP-' + prop.ctx"
										       v-model="prop.currentValue">
										<div class="text-gray text-small text-right">
											{{ prop.minValue }} ~ {{ prop.maxValue }}, {{ prop.stepValue }}
										</div>
									</div>
									<!-- 布尔型 -->
									<div class="form-group" v-else-if="prop.type === TreePropBool">
										<label class="form-switch">
											<input type="checkbox" v-model="prop.currentValue">
											<i class="form-icon"></i> {{ $t(prop.ctx) }}
										</label>
									</div>
									<!-- 滑动条 -->
									<div class="form-group" v-else-if="prop.type === TreePropSlider">
										<label class="form-label" :for="'PROP-' + prop.ctx">{{ $t(prop.ctx) }}</label>
										<input type="range" class="slider px-2 tooltip"
										       :step="prop.stepValue" :min="prop.minValue" :max="prop.maxValue"
										       :id="'PROP-' + prop.ctx"
										       v-model.number="prop.currentValue" :data-tooltip="prop.currentValue">
										<div class="text-gray text-small text-right">
											{{ prop.minText }} ~ {{ prop.maxText }}
										</div>
									</div>
									<div class="form-group" v-else-if="prop.type === TreePropColor">
										<label class="form-label" :for="'PROP-' + prop.ctx">{{ $t(prop.ctx) }}</label>
										<input type="color" class="form-input" :id="'PROP-' + prop.ctx" v-model="prop.currentValue">
										<div class="text-right mt-1">{{ prop.currentValue }}</div>
									</div>
									<!-- 单选 -->
									<div class="form-group" v-else-if="prop.type === TreePropSingleSelect">
										<label class="form-label">{{$t(prop.ctx)}}</label>

										<label class="form-radio form-inline"
										       v-for="option in prop.options"
										       @click.prevent="prop.currentValue = option.value">

											<input type="radio" :name="'PROP-' + prop.ctx"
											       :checked="prop.currentValue === option.value">
											<i class="form-icon"></i> {{ $t(option.ctx) }}
										</label>
									</div>
									<!-- 多选 -->
									<div class="form-group" v-else-if="prop.type === TreePropMultiSelect">
										<label class="form-label" :for="'PROP-' + prop.ctx">{{$t(prop.ctx)}}</label>
										<label class="form-checkbox  form-inline"
										       v-for="option in prop.options"
										       @click.prevent="prop.currentValue.indexOf(option.value) >= 0 ? prop.currentValue.splice(prop.currentValue.indexOf(option.value),1) : prop.currentValue.push(option.value)">
											<input type="checkbox"
											       :name="'PROP-' + prop.ctx "
											       :checked="prop.currentValue.indexOf(option.value) >= 0">
											<i class="form-icon"></i> {{ $t(option.ctx) }}
										</label>
									</div>
									<!-- 注释 -->
									<div class="form-group" v-else-if="prop.type === TreePropAnnotation">
										<div class="">{{$t(prop.ctx)}}</div>
									</div>

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
							{{ $t('msg-no-out-item') }}
						</div>
					</div>
				</div>
				<div v-else-if="currentPage.type === 'about-installation'" id="panel-operation-homepage" class="scroll-y">
					<about-installation-spectre-css />
				</div>
				<div v-else-if="currentPage.type === 'about-spectre-css-helper'">
					<about-spectre-css-helper @cheat="ee" :is-led-on="eeState !== 0"/>
				</div>
				<div v-else-if="currentPage.type === 'empty'" style="height: 100%">
					<div class="empty" style="height: 100%">
						<div class="empty-icon">
							<i class="ri-bubble-chart-line ri-3x"></i>
						</div>
						<p class="empty-title h5">{{$t('p-others.empty.msg')}}</p>
					</div>
				</div>
			</div>

		</div>

		<e-e-compo v-if="eeState !== 0" />
	</div>
</template>

<script>

import ListComponent from "@/components/ListComponent";
import {
	TreeProp,
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

import AboutInstallationSpectreCss from "@/components/AboutInstallationSpectreCss";
import AboutSpectreCssHelper from "@/components/AboutSpectreCssHelper";
import EECompo from "@/components/EECompo";

export default {

	mounted() {
		// this.clickNode(MetaPages[3].children[1]);
		window.ee = this.ee;
	},

	name: 'App',
	components: {
		EECompo,
		AboutSpectreCssHelper,
		AboutInstallationSpectreCss,
		ComponentOutput,
		ListComponent
	},
	data() {
		return {
			TreeProp,
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

			eeState: 0,
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
					case TreeProp:
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
		ee() {
			if(this.eeState !== 0) return;
			this.eeState = 1;
		},
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
			let isCurrentPagePinned = this.currentPage.pinned;
			this.listPages = this.listPages.filter(page => page.pinned);
			if(!isCurrentPagePinned) // 当前页面被关闭了
			{
				const len = this.listPages.length;
				this.currentPage = len ? this.listPages[len - 1] : EMPTY_PAGE;
			}
		},
		clickNode(node) // 左侧树单击某个节点 准备创建一个新的页面
		{
			// console.log('node',node);
			const objPage = {
				tt: node.tt,
				type: node.type,
				ctx: node.ctx,
				props: [],
				generators: node.generators,
				listUrl: node.listUrl,
				listUnimplemented: node.listUnimplemented,
			};

			for(let metaProp of (node.props ?? []))
			{
				const objValue = Object.assign({}, metaProp, { currentValue: metaProp.defaultValue, pinned: false });
				objPage.props.push(objValue);
			}

			this.listPages.push(objPage);
			this.currentPage = objPage;
		},

	},
}
</script>
