const TypePages = {
    Home: Symbol('home'),
    EasterEgg: Symbol('easter-egg'),
    // 行内元素
    Typography: Symbol('typography'),
    Tables: Symbol('tables'),
    Buttons: Symbol('buttons'),
    Forms: Symbol('forms'),
    Icons: Symbol('icons'),
    Labels: Symbol('labels'),
    Code: Symbol('code'),
    Media: Symbol('media'),
    // 布局
    FlexboxGrid: Symbol('flexbox-grid'),
    Responsive: Symbol('responsive'),
    Hero: Symbol('hero'),
    Navbar: Symbol('navbar'),
    // 组件
    Accordions: Symbol('accordions'),
    Avatars: Symbol('avatars'),
    Badges: Symbol('badges'),
    Bars: Symbol('bars'),
    Breadcrumbs: Symbol('breadcrumbs'),
    Cards: Symbol('cards'),
    Chips: Symbol('chips'),
    EmptyStates: Symbol('empty-states'),
    Menu: Symbol('menu'),
    Modals: Symbol('modals'),
    Nav: Symbol('nav'),
    Pagination: Symbol('pagination'),
    Panels: Symbol('panels'),
    Popovers: Symbol('popovers'),
    Steps: Symbol('steps'),
    Tabs: Symbol('tabs'),
    Tiles: Symbol('tiles'),
    Toasts: Symbol('toasts'),
    Tooltips: Symbol('tooltips'),
    // 工具类
    Colors: Symbol('colors'),
    Cursors: Symbol('cursors'),
    Display: Symbol('display'),
    Divider: Symbol('divider'),
    Loading: Symbol('loading'),
    Position: Symbol('position'),
    Shapes: Symbol('shapes'),
    Text: Symbol('text'),
    // 实验特性


}

const TreeGroup = Symbol('group');
const TreeItemPageSingle = Symbol('item-page-single');
const TreeItemPage = Symbol('item-page');
const TreePropString = Symbol('prop-string');
const TreePropNumber = Symbol('prop-number');
const TreePropSlider = Symbol('prop-slider');
const TreePropColor = Symbol('prop-color');
const TreePropBool = Symbol('prop-bool');
const TreePropMultiSelect = Symbol('prop-multi-select');
const TreePropSingleSelect = Symbol('prop-single-select');
const TreePropAnnotation = Symbol('prop-annotation');

function checkString(key, msg)
{
    if(typeof(key) !== 'string' || '' === key) throw msg;
}
function checkArray(arr, types, msg)
{
    if(arr == null || arr.length <= 0) return;
    for(const { tt } of arr) // tt means tree-type
    {
        for(const typeAva of types)
        {
            if(tt === typeAva) return;
        }
    }
    console.log(arr,types);
    throw msg;
}

function NodeItemPageSingle(key = '', icon = '') // 表示一个单独的页面
{
    checkString(key, 'error item-page key');
    return { tt: TreeItemPageSingle, key, icon };
}
function NodeGroup(key = '', children = []) // 表示一个组 点击之后控制组的展开和关闭
{
    checkString(key, 'error group key');
    checkArray(children, [TreeGroup, TreeItemPageSingle, TreeItemPage], 'error group child type');
    return { tt: TreeGroup, key, children };
}
function NodeItemPage(key = '',
                      props = [],
                      generators = [],
                      listUrl = [],
                      listUnimplemented = []
) // 表示一个具体的组件 含有若干可调配置 另外含有若干HTML生成器
{
    checkString(key, 'error item-page key');
    checkArray(props, [
        TreePropString,TreePropNumber,
        TreePropSlider,TreePropColor,
        TreePropBool,TreePropMultiSelect,
        TreePropSingleSelect
    ], 'error contents props');
    return { tt: TreeItemPage, key, props, generators, listUrl, listUnimplemented };
}
function NodeProps(key = '', type, defaultValue ) // 表示一个可配置项 这个function不能直接使用 只能给子function使用
{
    checkString(key, 'error props key');
    return { key, tt: type, defaultValue };
}
function NodePropsString(key, defaultValue = '')
{
    return NodeProps(key, TreePropString, defaultValue);
}
function NodePropsNumber(key, defaultValue = '', minValue = 0, maxValue = 0, stepValue = 0)
{
    return Object.assign(NodeProps(key, TreePropNumber, defaultValue), { minValue, maxValue, stepValue });
}
function NodePropsSlider(key, defaultValue, minValue, maxValue, stepValue, minText, maxText)
{
    return Object.assign(NodeProps(key, TreePropSlider, defaultValue), { minValue, maxValue, stepValue, minText, maxText })
}
function NodePropsColor(key, defaultValue)
{
    return Object.assign(NodeProps(key, TreePropColor, defaultValue));
}
function NodePropsBool(key, defaultValue = false)
{
    return NodeProps(key, TreePropBool, defaultValue);
}
function NodePropsMultiSelect(key, defaultValue = '', options = [])
{
    return Object.assign(NodeProps(key, TreePropMultiSelect, defaultValue), { options });
}
function NodePropsSingleSelect(key, defaultValue = '', options = [])
{
    return Object.assign(NodeProps(key, TreePropSingleSelect, defaultValue), { options });
}
function NodePropsAnnotation(key, i18nKey = '', style = '')
{
    return Object.assign(NodeProps(key, TreePropAnnotation, i18nKey), { style });
}

function setContext(node, contextParent)
{
    const contextCurrent = (contextParent == null ? '' : contextParent + '-') + node.key;
    node.ctx = contextCurrent;
    switch(node.tt)
    {
        case TreeGroup:
        {
            for(let child of node.children)
            {
                setContext(child, contextCurrent);
            }
            break;
        }
        case TreeItemPage:
        {
            for(let prop of node.props)
            {
                setContext(prop, contextCurrent);
            }
            break;
        }
        case TreeItemPageSingle:
        {
            // 暂时不处理
            break;
        }
        case TreePropString:
        case TreePropNumber:
        case TreePropBool:
        case TreePropSlider:
        case TreePropSingleSelect:
        case TreePropMultiSelect:
        {
            // 没什么需要处理的
            break;
        }
    }
}

// elements
const PAGE_TABLES = NodeItemPage('tables', [
    NodePropsBool('striped', true),
    NodePropsBool('hover', true),
    NodePropsBool('scroll', false),
], [
    {
        ctx: 'gen-table',
        inline: false,
        style: null,
        func: ([striped,hover,scroll])=>{
            const body =
`<thead><tr>
    <td>col1</td><td>col2</td><td>col3</td><td>col4</td><td>col5</td>
</tr></thead><tbody>
<tr><td>1-1</td><td>1-2</td><td>1-3</td><td>1-4</td><td>1-5</td></tr>
<tr><td>2-1</td><td>2-2</td><td>2-3</td><td>2-4</td><td>2-5</td></tr>
<tr><td>3-1</td><td>3-2</td><td>3-3</td><td>3-4</td><td>3-5</td></tr>
<tr><td>4-1</td><td>4-2</td><td>4-3</td><td>4-4</td><td>4-5</td></tr>
<tr><td>5-1</td><td>5-2</td><td>5-3</td><td>5-4</td><td>5-5</td></tr>
</tbody>`;
            let textClass = 'table';
            if(striped) textClass += ' table-striped';
            if(hover) textClass += ' table-hover';
            if(scroll) textClass += ' table-scroll';
            return `<table class="${textClass}">${body}</table>`;
        },
    }
]);
function BTN_CSS(css, active = false, loading = false, disabled = false, size = 'normal')
{
    if(active) css += ' active';
    if(loading) css += ' loading';
    if(disabled) css += ' disabled';
    if(size === 'large') css += ' btn-lg';
    else if(size === 'small') css += ' btn-sm';
    return css;
}
const PAGE_BUTTONS = NodeItemPage('buttons',[
    NodePropsString('text', 'button'),
    NodePropsBool('active', false),
    NodePropsBool('loading', false),
    NodePropsBool('disabled', false),
    NodePropsSingleSelect('size','normal',['small','normal','large']),
    NodePropsSingleSelect('dom','button',['button','div']),
],[
    {
        ctx: 'gen-button-default', inline: true,
        func: ([text,active,loading,disabled,size,dom])=>{
            return `<${dom} class="${BTN_CSS('btn',active,loading,disabled,size)}">${text}</${dom}>`;
        },
    },
    {
        ctx: 'gen-button-primary', inline: true,
        func: ([text,active,loading,disabled,size,dom])=>{
            return `<${dom} class="${BTN_CSS('btn btn-primary',active,loading,disabled,size)}">${text}</${dom}>`;
        },
    },
    {
        ctx: 'gen-button-link', inline: true,
        func: ([text,active,loading,disabled,size,dom])=>{
            return `<${dom} class="${BTN_CSS('btn btn-link',active,loading,disabled,size)}">${text}</${dom}>`;
        },
    },
    {
        ctx: 'gen-button-success', inline: true,
        func: ([text,active,loading,disabled,size,dom])=>{
            return `<${dom} class="${BTN_CSS('btn btn-success',active,loading,disabled,size)}">${text}</${dom}>`;
        },
    },
    {
        ctx: 'gen-button-error', inline: true,
        func: ([text,active,loading,disabled,size,dom])=>{
            return `<${dom} class="${BTN_CSS('btn btn-error',active,loading,disabled,size)}">${text}</${dom}>`;
        },
    },
    {
        ctx: 'gen-button-default-block', inline: false,
        func: ([text,active,loading,disabled,size,dom])=>{
            return `<${dom} class="${BTN_CSS('btn btn-block',active,loading,disabled,size)}">${text}</${dom}>`;
        },
    },
    {
        ctx: 'gen-button-primary-block', inline: false,
        func: ([text,active,loading,disabled,size,dom])=>{
            return `<${dom} class="${BTN_CSS('btn btn-primary btn-block',active,loading,disabled,size)}">${text}</${dom}>`;
        },
    },
    {
        ctx: 'gen-button-link-block', inline: false,
        func: ([text,active,loading,disabled,size,dom])=>{
            return `<${dom} class="${BTN_CSS('btn btn-link btn-block',active,loading,disabled,size)}">${text}</${dom}>`;
        },
    },
    {
        ctx: 'gen-button-success-block', inline: false,
        func: ([text,active,loading,disabled,size,dom])=>{
            return `<${dom} class="${BTN_CSS('btn btn-success btn-block',active,loading,disabled,size)}">${text}</${dom}>`;
        },
    },
    {
        ctx: 'gen-button-error-block', inline: false,
        func: ([text,active,loading,disabled,size,dom])=>{
            return `<${dom} class="${BTN_CSS('btn btn-error btn-block',active,loading,disabled,size)}">${text}</${dom}>`;
        },
    },
]);

// components
const PAGE_AVATARS = NodeItemPage('avatars',[
    NodePropsString('avatar-url',''),
    NodePropsString('avatar-text','Fi'),
    NodePropsSingleSelect('size','default',['xl','lg','default','sm','xs']),
    NodePropsSingleSelect('presence','none',['none','online','busy','away','offline']),
],[
    {
        ctx: 'gen-avatars', inline: 'true',
        func: ([url,text,size,presence])=>{
            let strClassSize = 'avatar';
            switch (size)
            {
                case 'xl': strClassSize += ' avatar-xl'; break;
                case 'lg': strClassSize += ' avatar-lg'; break;
                case 'sm': strClassSize += ' avatar-sm'; break;
                case 'xs': strClassSize += ' avatar-xs'; break;
            }
            let domPresence = '';
            const domPresenceOnline = `<i class="avatar-presence online"></i>`;
            const domPresenceBusy = `<i class="avatar-presence busy"></i>`;
            const domPresenceAway = `<i class="avatar-presence away"></i>`;
            const domPresenceOffline = `<i class="avatar-presence offline"></i>`;
            switch (presence)
            {
                case 'online': domPresence = domPresenceOnline; break;
                case 'busy': domPresence = domPresenceBusy; break;
                case 'away': domPresence = domPresenceAway; break;
                case 'offline': domPresence = domPresenceOffline; break;
            }
            return `<figure class="${strClassSize}" 
${text !== '' ? 'data-initial="'+text+'"' : ''}>
${url !== '' ? `<img src="${url}">` : ''}
${domPresence}
</figure>`;
        },
    }
],[
    { key: 'document', url: 'https://picturepan2.github.io/spectre/components/avatars.html' },
],[
    { key: 'avatar-icons' }
]);
const PAGE_BADGES = NodeItemPage('badges',[
    NodePropsString('text','inner text'),
    NodePropsString('data-badge','1'),
    NodePropsString('data-avatar-url',''),
    NodePropsString('data-avatar-text','Fi'),
],[
    {
        ctx: 'gen-badges-span', inline: true,
        func: ([text,dataBadge,avatarUrl,avatarText])=>{
            return `<span class="badge" ${dataBadge !== '' ? 'data-badge="'+dataBadge+'"' : ''}>${text}</span>`;
        },
    },
    {
        ctx: 'gen-badges-button', inline: true,
        func: ([text,dataBadge,avatarUrl,avatarText])=>{
            return `<button class="btn badge" ${dataBadge !== '' ? 'data-badge="'+dataBadge+'"' : ''}>${text}</button>`;
        },
    },
    {
        ctx: 'gen-badges-button', inline: true,
        func: ([text,dataBadge,avatarUrl,avatarText])=>{
            return `<figure class="avatar badge"
${dataBadge !== '' ? 'data-badge="'+dataBadge+'"' : ''}
${avatarText !== '' ? 'data-initial="'+avatarText+'"' : ''}
><img src="${avatarUrl}"/></figure>`;
        },
    },
]);
const PAGE_BARS = NodeItemPage('bars',[
    NodePropsSingleSelect('size','default',['default','sm']),
    NodePropsSlider('percentage',50,0,100,1,'0','100%'),
    NodePropsColor('color','#818bd5'),
    NodePropsBool('has-Text',true),
    NodePropsBool('has-tooltip',true),
],[
    {
        ctx: 'gen-bars', inline: false,
        func: ([size,percentage,color,hasText,hasTooltip])=>{
            const isSm = size === 'sm';
            return `<div class="bar${isSm ? ' bar-sm':''}">
  <div class="bar-item${hasTooltip ? ' tooltip' : ''}"${hasTooltip ? ' data-tooltip="' + percentage + '%"' : ''} role="progressbar"
  style="width:${percentage}%;background: ${color}"
  aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100" >
  ${hasText && !isSm && percentage > 0 ? percentage + '%' : ''}
</div>
</div>`;
        },
    }
],[
    { key: 'document', url: 'https://picturepan2.github.io/spectre/components/bars.html' },
],);
// const PAGE_BARS_SILDER = NodeItemPage();
const PAGE_BREADCRUMBS = NodeItemPage('breadcrumbs',[
    NodePropsSlider('count-step',3,2,5,1,'2','5'),
    NodePropsBool('has-tooltip',false),
],[
    {
        ctx: 'gen-breadcrumbs', inline: false,
        func: ([countStep,hasTooltip])=>{

            let crumbs = '';
            for(let step = 0; step < countStep; step++)
            {
                let crumbInner = hasTooltip ? `<a href="#" class="tooltip" data-tooltip="${step + 1}">${step + 1}</a>` : `<a href="#">${step + 1}</a>`;
                crumbs += `<li class="breadcrumb-item">`+crumbInner+`</li>`;
            }

            return `<ul class="breadcrumb">\n${crumbs}\n</ul>`;
        },
    }
]);
const PAGE_CHIPS = NodeItemPage('chips',[
    NodePropsString('text','chip text'),
    NodePropsBool('has-avatar',true),
    NodePropsString('avatar-url',''),
    NodePropsBool('has-close',true),
],[
    {
        ctx: 'gen-chips', inline: true,
        func: ([text,hasAvatar,avatarUrl,hasClose])=>{
            return `<span class="chip">
${hasAvatar ? '<img src="'+avatarUrl+'" class="avatar avatar-sm" alt=""/>\n' : ''}${text}${hasClose ? '\n<a href="#" class="btn btn-clear" aria-label="close" role="button"></a>' : ''}
</span>`;
        },
    }
]);
const PAGE_EMPTY_STATES = NodeItemPage('empty-states',[
    NodePropsString('icon-class','icon icon-3x icon-people'),
    NodePropsString('title','title text'),
    NodePropsString('subtitle','subtitle text'),
    NodePropsBool('has-action',false),
],[
    {
        ctx: 'gen-empty-states', inline: false,
        func: ([iconClass,title,subtitle,hasAction])=>{
            return `<div class="empty">
  <div class="empty-icon">
    <i class="${iconClass}"></i>
  </div>
  <p class="empty-title h5">${title}</p>
  <p class="empty-subtitle">${subtitle}</p>${hasAction ? '\n<div class="empty-action">\naction container</div>':''}
</div>`;
        },
    }
]);
const PAGE_STEPS = NodeItemPage('steps',[
    NodePropsSlider('count-step',3,2,5,1,'2','5'),
    NodePropsSlider('active-step',3,2,5,1,'2','5'),
    NodePropsBool('has-tooltip',true),
    NodePropsBool('has-text',true),
],[
    {
        ctx: 'gen-steps', inline: false,
        func: ([countStep,activeStep,hasTooltip,hasText])=>{
            let steps = ``;
            for(let step = 0; step < countStep; step++)
            {
                let stepInner = hasTooltip ? `<a href="#" class="tooltip" data-tooltip="tooltip ${step + 1}">${hasText ? 'step ' + (step + 1) : ''}</a>` : `<a href="#">${hasText ? 'step ' + (step + 1) : ''}</a>`;
                steps += `\n<li class="step-item${activeStep === step + 1 ? ' active' : ''}">\n${stepInner}\n</li>\n`;
            }
            return `<ul class="step">${steps}</ul>`;
        },
    }
]);

// experimentals
const PAGE_PARALLAX = NodeItemPage('parallax',[
    NodePropsString('text','parallax text'),
    NodePropsSingleSelect('dom','h2',['h1','h2','h3','h4','h5','h6','div']),
    NodePropsString('img-url','https://via.placeholder.com/250.gif/2db38a/4a22c0?text=placeholder+picture'),
],[
    {
        ctx: 'gen-parallax', inline: false,
        func: ([text,dom,imgUrl])=>{
            return `<div class="parallax">
  <div class="parallax-top-left" tabindex="1"></div>
  <div class="parallax-top-right" tabindex="2"></div>
  <div class="parallax-bottom-left" tabindex="3"></div>
  <div class="parallax-bottom-right" tabindex="4"></div>
  <div class="parallax-content">
    <div class="parallax-front">
      <${dom}>${text}</${dom}>
    </div>
    <div class="parallax-back">
      <img src="${imgUrl}" class="img-responsive rounded" alt=""/>
    </div>
  </div>
</div>`;
        },
    }
]);
const PAGE_PROGRESS = NodeItemPage('progress',[
    NodePropsNumber('max',100,'','',1),
    NodePropsBool('loading',false),
    NodePropsNumber('value',50,'','',1),
],[
    {
        ctx: 'gen-progress', inline: true,
        func: ([max, loading, value])=>{
            return `<progress class="progress" max="${max}" ${loading ? '' : 'value="' + value + '"'}></progress>`;
        },
    },
]);
const PAGE_SLIDER = NodeItemPage('sliders',[
    NodePropsNumber('min',0,'',''),
    NodePropsNumber('max',100,'',''),
    NodePropsNumber('value',50,'',''),
    NodePropsBool('tooltip',true),
    NodePropsAnnotation('about-tooltip','page-slider-about-tooltip'),
],[
    {
        ctx: 'gen-slider', inline: true,
        func: ([min,max,value,tooltip])=>{
            return `<input class="${tooltip ? 'slider tooltip' : 'slider'}" type="range" min="${min}" max="${max}" value="${value}"/>`;
        },
    }
]);

const MetaPages = [
    // NodeItemPageSingle('home', 'ri-home-line'),
    NodeGroup('p-elements',[
        NodeItemPage('typography', [
            NodePropsString('headings', 'Heading'),
            NodePropsString('semantic','semantic text'),
            NodePropsSingleSelect('label-type','default',['default','primary']),
            NodePropsBool('label-rounded',false),
        ],[]),
        PAGE_TABLES,
        PAGE_BUTTONS,
        NodeItemPage('forms-input', [
            NodePropsString('value', 'input'),
            NodePropsString('placeholder', 'placeholder'),
        ]),
        NodeItemPage('forms-textarea', [
            NodePropsString('value', 'input'),
            NodePropsString('placeholder', 'placeholder'),
        ]),
        NodeItemPage('form-select',[

        ]),
        NodeItemPage('form-radio',[
            NodePropsString('text', 'radio text'),
        ]),
        NodeItemPage('form-switch',[]),
        NodeItemPage('form-checkbox',[
            NodePropsString('text', 'checkbox text'),
        ]),

        NodeItemPage('icons',[
            NodePropsSingleSelect('dom-type','span',['span','i','div']),
            NodePropsSingleSelect('size','multiply',['multiply','px']),
            NodePropsSlider('size-multiply',1,1,4,'1x','4x'),
            NodePropsSlider('size-px',16,1,128,'1px','128px'),
        ]),
    ]),
    NodeGroup('p-layout'),
    NodeGroup('p-components',[
        PAGE_AVATARS,
        PAGE_BADGES,
        PAGE_BARS,
        PAGE_BREADCRUMBS,
        PAGE_EMPTY_STATES,
        PAGE_CHIPS,
        PAGE_STEPS,
    ]),
    NodeGroup('p-utilities'),
    NodeGroup('p-experimentals',[
        PAGE_PARALLAX,
        PAGE_PROGRESS,
        PAGE_SLIDER,
    ]),
];
for(let meta of MetaPages)
{
    setContext(meta,null);
}

export {
    TypePages,
    MetaPages,

    TreeGroup,
    TreeItemPageSingle,
    TreeItemPage,
    TreePropString,
    TreePropNumber,
    TreePropSlider,
    TreePropColor,
    TreePropBool,
    TreePropMultiSelect,
    TreePropSingleSelect,
    TreePropAnnotation,
};