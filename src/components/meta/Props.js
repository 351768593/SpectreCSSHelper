import {
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
} from './Consts';

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

export function NodePageSingle(key = '', icon = '') // 表示一个单独的页面
{
    checkString(key, 'error item-page key');
    return { tt: TreeItemPageSingle, key, icon };
}
export function NodeGroup(key = '', children = []) // 表示一个组 点击之后控制组的展开和关闭
{
    checkString(key, 'error group key');
    checkArray(children, [TreeGroup, TreeItemPageSingle, TreeItemPage], 'error group child type');
    return { tt: TreeGroup, key, children };
}
export function NodePage(key = '',
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
export function PropString(key, defaultValue = '')
{
    return NodeProps(key, TreePropString, defaultValue);
}
export function PropNumber(key, defaultValue = '', minValue = 0, maxValue = 0, stepValue = 0)
{
    return Object.assign(NodeProps(key, TreePropNumber, defaultValue), { minValue, maxValue, stepValue });
}
export function PropSlider(key, defaultValue, minValue, maxValue, stepValue, minText, maxText)
{
    return Object.assign(NodeProps(key, TreePropSlider, defaultValue), { minValue, maxValue, stepValue, minText, maxText })
}
export function PropColor(key, defaultValue)
{
    return Object.assign(NodeProps(key, TreePropColor, defaultValue));
}
export function PropBool(key, defaultValue = false)
{
    return NodeProps(key, TreePropBool, defaultValue);
}
export function PropMultiSelect(key, defaultValue = '', options = [])
{
    return Object.assign(NodeProps(key, TreePropMultiSelect, defaultValue), { options });
}
export function PropSingleSelect(key, defaultValue = '', options = [])
{
    return Object.assign(NodeProps(key, TreePropSingleSelect, defaultValue), { options });
}
export function PropAnnotation(key, i18nKey = '', style = '')
{
    return Object.assign(NodeProps(key, TreePropAnnotation, i18nKey), { style });
}