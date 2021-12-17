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
const TreePropBool = Symbol('prop-bool');
const TreePropMultiSelect = Symbol('prop-multi-select');
const TreePropSingleSelect = Symbol('prop-single-select');

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
function NodeItemPage(key = '', props = [], generators = []) // 表示一个具体的组件 含有若干可调配置 另外含有若干HTML生成器
{
    checkString(key, 'error item-page key');
    checkArray(props, [TreePropString,TreePropNumber,TreePropSlider,TreePropBool,TreePropMultiSelect,TreePropSingleSelect], 'error contents props');
    return { tt: TreeItemPage, key, props, generators };
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
    NodeGroup('p-components'),
    NodeGroup('p-utilities'),
    NodeGroup('p-experimentals'),
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
    TreePropBool,
    TreePropMultiSelect,
    TreePropSingleSelect,
};