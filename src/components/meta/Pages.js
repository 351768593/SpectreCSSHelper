import {
    TreeGroup,
    TreePage,
    TreeProp,
    TreePropBool,
    TreePropMultiSelect,
    TreePropNumber,
    TreePropSingleSelect,
    TreePropSlider,
    TreePropString,
} from './Consts';
import {
    Group,
    PageComponent, PageSingle,
    PropAnnotation,
    PropBool,
    PropColor,
    PropMultiSelect,
    PropNumber,
    PropSingleSelect,
    PropSlider,
    PropString,
} from './Props';
import {PLACEHOLDER_GIF} from './Placeholders';

function setContext(node, contextParent)
{
    // node.key 翻译键 整理完成之后会删掉这个
    // node.ctx 真正使用的翻译键
    // node.tt 节点类型
    // node.type 详细类型
    const contextCurrent = (contextParent == null ? '' : contextParent + '.') + node.key;
    delete node.key;
    node.ctx = contextCurrent + '.#title';
    switch(node.tt)
    {
        case TreeGroup:
        {
            for(let child of (node.children ?? []))
            {
                setContext(child, contextCurrent);
            }
            break;
        }
        case TreePage:
        {
            for(let prop of (node.props ?? []))
            {
                setContext(prop, contextCurrent);
            }
            break;
        }
        case TreeProp:
        {
            if(node.type === TreePropSingleSelect || node.type === TreePropMultiSelect)
            {
                const options = node.options ??= [];
                const optionsNew = [];
                for(const option of options)
                {
                    optionsNew.push({
                        ctx: contextCurrent + '.' + option,
                        value: option,
                    });
                }
                node.options = optionsNew;
            }
            break;
        }
    }
}

// elements
const PAGE_TYPOGRAPHY = PageComponent('typography', [
    PropString('text','demo text'),
    PropSingleSelect('dom', 'none',[
        'div', 'span', 'h6', 'h5', 'h4', 'h3', 'h2', 'h1',
        'label', 'abbr', 'strong', 'b', 'cite', 'code', 'del', 'em',
        'i', 'ins', 'kbd', 'mark', 'ruby', 's', 'samp', 'sub',
        'sup', 'time', 'u', 'var', 'blockquote',
    ]),
    PropSingleSelect('foreground-color','default',[
        'default', 'primary', 'secondary', 'dark', 'gray', 'light', 'success', 'warning', 'error',
    ]),
    PropSingleSelect('background-color','default',[
        'default', 'primary', 'secondary', 'dark', 'gray', 'success', 'warning', 'error',
    ]),
    PropSingleSelect('cursors','default',[
        'default', 'hand', 'move', 'zoom-in', 'zoom-out', 'not-allowed', 'auto',
    ]),
    PropMultiSelect('extra-style',[],[
        'text-left', 'text-right', 'text-center', 'text-justify',
        'text-lowercase', 'text-uppercase', 'text-capitalize',
        'text-normal', 'text-bold', 'text-italic', 'text-muted',
        'text-small', 'text-large', 'text-tiny',
        'text-ellipsis', 'text-clip', 'text-break',
    ]),
    PropSingleSelect('language','none',[
        'none', 'zh-hans', 'zh-hant', 'ja', 'ko',
    ]),
],[
    {
        ctx: 'gen-typography', inline: false,
        func: ([text,dom,fgc,bgc,cursors,extraStyle,language])=>{
            let strClass = ' class="';
            switch (language)
            {
                case 'zh-hans': strClass += 'lang-zh-hans'; break;
                case 'zh-hant': strClass += 'lang-zh-hant'; break;
                case 'ja': strClass += 'lang-ja'; break;
                case 'ko': strClass += 'lang-ko'; break;
            }
            switch (fgc)
            {
                case 'primary': strClass += ' text-primary'; break;
                case 'secondary': strClass += ' text-secondary'; break;
                case 'dark': strClass += ' text-dark'; break;
                case 'gray': strClass += ' text-gray'; break;
                case 'success': strClass += ' text-success'; break;
                case 'warning': strClass += ' text-warning'; break;
                case 'error': strClass += ' text-error'; break;
            }
            switch (bgc)
            {
                case 'primary': strClass += ' bg-primary'; break;
                case 'secondary': strClass += ' bg-secondary'; break;
                case 'dark': strClass += ' bg-dark'; break;
                case 'gray': strClass += ' bg-gray'; break;
                case 'success': strClass += ' bg-success'; break;
                case 'warning': strClass += ' bg-warning'; break;
                case 'error': strClass += ' bg-error'; break;
            }
            switch (cursors)
            {
                case 'hand': strClass += ' c-hand'; break;
                case 'move': strClass += ' c-move'; break;
                case 'zoom-in': strClass += ' c-zoom-in'; break;
                case 'zoom-out': strClass += ' c-zoom-out'; break;
                case 'not-allowed': strClass += ' c-not-allowed'; break;
                case 'auto': strClass += ' c-auto'; break;
            }
            if(extraStyle.length > 0)
            {
                for(let es of extraStyle)
                {
                    strClass += ' ' + es;
                }
            }
            strClass += '"';
            return `<${dom}${strClass}>${text}</${dom}>`;
        },
    }
],[
    { key: 'document', url: 'https://picturepan2.github.io/spectre/elements/typography.html' },
],[]);
const PAGE_FORM_INPUT = PageComponent('form-input',[],[]);
const PAGE_FORM_TEXTAREA = PageComponent('form-textarea',[
    PropString('label-text','label text'),
    PropString('placeholder','placeholder'),
    PropSlider('rows',3,2,10,1,'2','10'),
],[
    {
        ctx: 'gen-textarea', inline: false,
        func: ([label,placeholder,rows])=>{
            return `<div class="form-group">
  <label class="form-label" for="textarea_demo">${label}</label>
  <textarea class="form-input" id="textarea_demo" placeholder="${placeholder}" rows="${rows}"></textarea>
</div>`;
        },
    },
]);
function SELECT_BODY(count)
{
    let body = '';
    for(let step = 0; step < count; step++)
    {
        body += `<option>option ${step + 1}</option>`;
    }

    return body;
}
const PAGE_FORM_SELECT = PageComponent('form-select',[
    PropSlider('count-option',3,2,6,1,'2','6'),
],[
    {
        ctx: 'gen-select', inline: true,
        func: ([count])=>{
            let body = SELECT_BODY(count);
            return `<div class="form-group">
  <select class="form-select">
    ${body}
  </select>
</div>`;
        },
    },
    {
        ctx: 'gen-select-multiple', inline: true,
        func: ([count])=>{
            let body = SELECT_BODY(count);
            return `<div class="form-group">
  <select class="form-select" multiple>
    ${body}
  </select>
</div>`;
        },
    },
]);
const PAGE_FORM_RADIO = PageComponent('form-radio',[
    PropSlider('count-item',2,2,5,1,'2','5'),
    PropBool('inline',false),
],[
    {
        ctx: 'gen-radio', inline: true,
        func: ([count,inline])=>{
            let body = ``;
            for(let step = 0; step < count; step++)
            {
                body += `<label class="form-radio${inline ? ' form-inline' : ''}">
    <input type="radio" name="radio_group"${step === 0 ? ' checked' : ''}>
    <i class="form-icon"></i> radio-item-${step + 1}
  </label>`;
            }

            return `<div class="form-group">
  <label class="form-label">radio text</label>
  ${body}
</div>`;
        },
    }
]);
const PAGE_SWITCH = PageComponent('form-switch',[
    PropString('text','label text'),
    PropBool('inline',false),
],[
    {
        ctx: 'gen-switch', inline: true,
        func: ([text,inline])=>{
            return `<div class="form-group">
  <label class="form-switch${inline ? ' form-inline':''}">
    <input type="checkbox">
    <i class="form-icon"></i> ${text}
  </label>
</div>`;
        },
    }
]);
const PAGE_CHECKBOX = PageComponent('form-checkbox',[
    PropString('label-text','label text'),
    PropSingleSelect('state','unchecked',['unchecked','checked','indeterminate']),
    PropBool('inline',false),
    PropAnnotation('about-indeterminate'),
],[
    {
        ctx: 'gen-checkbox', inline: false,
        func: ([label,state,inline])=>{
            let strChecked = state === 'checked' ? `checked` : ``;
            let strInline = inline ? ' form-inline' : '';
            return `<div class="form-group">
<label class="form-checkbox">
<input type="checkbox" ${strChecked} />
<span class="form-icon${strInline}"></span> ${label}
</label>
</div>`;
        },
    }
]);
function BODY_ICON(type,shape,size,px,color)
{
    let setClass = new Set(), setStyle = new Set();
    switch (size)
    {
        case '1x': break;
        case '2x': setClass.add('icon-2x'); break;
        case '3x': setClass.add('icon-3x'); break;
        case '4x': setClass.add('icon-4x'); break;
        case 'custom': setStyle.add(`font-size: ${px}px`); break;
    }
    setClass.add(type);
    setStyle.add(`color: ${color}`);
    const strClass = [...setClass].join(' ');
    const strStyle = [...setStyle].join('; ');

    let strProp = `${strClass.length ? ' ' + strClass : ''}`;

    switch (shape)
    {
        case 'span':
            return `<span class="${type}${paramSize}"></span>`;
    }
}
const PAGE_ICONS = PageComponent('icons',[
    PropSingleSelect('shape','span',[
        'span','i','button-rect','button-circle',
    ]),
    PropSingleSelect('size','1x',[
        '1x','2x','3x','4x','custom',
    ]),
    PropSlider('size-px',16,4,128,1,'4px','128px'),
    PropColor('color-icon','#000000'),
],[]);
const PAGE_CODE = PageComponent('code',[
    PropString('lang','HTML'),
    PropString('content','container text'),
],[
    {
        ctx: 'gen-code', inline: false,
        func: ([lang,content])=>{
            return `<pre class="code" data-lang="${lang}"><code>${content}</code></pre>`;
        },
    }
]);
const PAGE_MEDIA_IMAGE = PageComponent('media-image',[
    PropSingleSelect('style','responsive',['responsive','fit-contain','fit-cover']),
    PropSingleSelect('figure-caption','none',['none','text']),
],[
    {
        ctx: 'gen-media-image', inline: false,
        func: ([style,caption])=>{
            let domImage = `<img class="img-${style}" src="${PLACEHOLDER_GIF}" alt=""/>`;

            if(caption === 'text')
            {
                return `<figure class="figure">
${domImage}
  <figcaption class="figure-caption text-center">caption text</figcaption>
</figure>`;
            }
            else return `${domImage}`;
        },
    }
]);
const PAGE_MEDIA_VIDEO = PageComponent('media-video',[
    PropSingleSelect('style','responsive',['responsive','4-3','1-1']),
    PropSingleSelect('type','video',['video','iframe']),
],[
    {
        ctx: 'gen-video', inline: false,
        func: ([style,type])=>{
            let strClass = 'video-responsive';
            if(style === '4-3') strClass += ' video-responsive-4-3';
            else if(style === '1-1') strClass += ' video-responsive-1-1';

            if(type === 'video')
            {
                return `<video class="${strClass}" src="..."></video>`;
            }
            else if(type === 'iframe')
            {
                return `<div class="${strClass}">
  <iframe src="//player.bilibili.com/player.html?aid=80433022&bvid=BV1GJ411x7h7&cid=137649199&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</div>`;
            }
        },
    }
]);

const PAGE_TABLES = PageComponent('tables', [
    PropBool('striped', true),
    PropBool('hover', true),
    PropBool('scroll', false),
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
const PAGE_BUTTONS = PageComponent('buttons',[
    PropString('text', 'button'),
    PropBool('active', false),
    PropBool('loading', false),
    PropBool('disabled', false),
    PropSingleSelect('size','normal',['small','normal','large']),
    PropSingleSelect('dom','button',['button','div']),
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

// layouts, but show in components
const PAGE_HERO = PageComponent('hero',[
    PropString('title','hero title'),
    PropString('subtitle', 'hero subtitle'),
    PropSingleSelect('bgc', 'gray', [
        'gray', 'primary', 'dark',
    ]),
    PropSingleSelect('size','default',[
        'default', 'sm', 'lg',
    ]),
],[
    {
        ctx: 'gen-hero', inline: false,
        func: ([title,subtitle,bgc,size])=>{
            return `<div class="hero ${size !== 'default' ? 'hero-'+size : ''} bg-${bgc}">
<div class="hero-body">
<h1>${title}</h1>
<p>${subtitle}</p>
</div>
</div>`;
        },
    }
]);
const PAGE_NAVBAR = PageComponent('navbar',[
    PropSingleSelect('left-style','default',['default','brand','none']),
    PropSingleSelect('center-style','none',['icon','none']),
    PropSingleSelect('right-style','default',['default','brand','none']),
],[
    {
        ctx: 'gen-navbar', inline: false,
        func: ([left,center,right])=>{
            let sectionLeft, sectionCenter, sectionRight;
            switch (left)
            {
                case 'default':
                    sectionLeft = `<section class="navbar-section">
    <a href="#" class="btn btn-link">Left1</a>
    <a href="#" class="btn btn-link">Left2</a>
  </section>`;
                    break;
                case 'brand':
                    sectionLeft = `<section class="navbar-section">
    <a href="#" class="navbar-brand mr-2">Left brand</a>
    <a href="#" class="btn btn-link">Left1</a>
    <a href="#" class="btn btn-link">Left2</a>
  </section>`;
                    break;
                case 'none':
                    sectionLeft = ``;
                    break;
            }
            switch (center)
            {
                case 'icon':
                    sectionCenter = `<section class="navbar-center">
    <img src="https://picturepan2.github.io/spectre/img/spectre-logo.svg" alt=""/>
  </section>`;
                    break;
                case 'none':
                    sectionCenter = ``;
                    break;
            }
            switch (right)
            {
                case 'default':
                    sectionRight = `<section class="navbar-section">
    <a href="#" class="btn btn-link">Right1</a>
    <a href="#" class="btn btn-link">Right2</a>
  </section>`;
                    break;
                case 'brand':
                    sectionRight = `<section class="navbar-section">
    <a href="#" class="btn btn-link">Right1</a>
    <a href="#" class="btn btn-link">Right2</a>
    <a href="#" class="navbar-brand mr-2">Right brand</a>
  </section>`;
                    break;
                case 'none':
                    sectionRight = ``;
                    break;
            }

            return `<header class="navbar">${sectionLeft}${sectionCenter}${sectionRight}</header>`;
        },
    }
]);
const PAGE_ACCORDIONS = PageComponent('accordions',[
    PropSlider('count-group',3,1,5,1,'1','5'),
    PropBool('has-icon',true),
    PropSingleSelect('type','input-radio',['input-radio','details-summary']),
],[
    {
        ctx: 'gen-accordions', inline: false,
        func: ([countGroup,hasIcon,type])=>{
            let ret = '';

            for(let step = 0; step < countGroup; step++)
            {
                if(type === 'input-radio') ret += `<div class="accordion">
  <input type="checkbox" id="accordion-none-icon-${step + 1}" name="accordion-checkbox" hidden>
  <label class="accordion-header c-hand" for="accordion-none-icon-${step + 1}">
    ${hasIcon ? '<i class="icon icon-arrow-right mr-1"></i>' : ''}
        accordion title ${step + 1}
  </label>
  <div class="accordion-body">
    accordion body ${step + 1}
  </div>`;
                else
                    ret += `<details class="accordion">
  <summary class="accordion-header c-hand">
    ${hasIcon ? '<i class="icon icon-arrow-right mr-1"></i>' : ''}
    accordion title ${step + 1}
  </summary>
  <div class="accordion-body">
    accordion body ${step + 1}
  </div>
</details>`;
            }

            return ret;
        },
    },
]);
// components
const PAGE_AVATARS = PageComponent('avatars',[
    PropString('avatar-url',''),
    PropString('avatar-text','Fi'),
    PropSingleSelect('size','default',['xl','lg','default','sm','xs']),
    PropSingleSelect('presence','none',['none','online','busy','away','offline']),
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
const PAGE_BADGES = PageComponent('badges',[
    PropString('text','inner text'),
    PropString('data-badge','1'),
    PropString('data-avatar-url',''),
    PropString('data-avatar-text','Fi'),
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
const PAGE_BARS = PageComponent('bars',[
    PropSingleSelect('size','default',['default','sm']),
    PropSlider('percentage',50,0,100,1,'0','100%'),
    PropColor('color','#818bd5'),
    PropBool('has-text',true),
    PropBool('has-tooltip',true),
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
// const PAGE_BARS_SILDER = NodePage();
const PAGE_BREADCRUMBS = PageComponent('breadcrumbs',[
    PropSlider('count-step',3,2,5,1,'2','5'),
    PropBool('has-tooltip',false),
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
const PAGE_CARDS = PageComponent('cards',[
    PropBool('has-image',true),
    PropBool('has-header',true),
    PropBool('has-body',true),
    PropBool('has-footer',true),
],[
    {
        ctx: 'gen-cards', inline: true,
        func: ([image,header,body,footer])=>{
            return `<div class="card">
  ${image ? `<div class="card-image">
    <img src="placeholder-image.gif" class="img-responsive" alt="placeholder"/>
  </div>`: ``}
  ${header ? `<div class="card-header">
    <div class="card-title h5">header title</div>
    <div class="card-subtitle text-gray">header subtitle</div>
  </div>` : ``}
  ${body ? `<div class="card-body">
    card body
  </div>` : ``}
  ${footer ? `<div class="card-footer">
    <button class="btn btn-primary">card footer button</button>
  </div>` : ``}
</div>`;
        },
    }
]);
const PAGE_CHIPS = PageComponent('chips',[
    PropString('text','chip text'),
    PropBool('has-avatar',true),
    PropString('avatar-url',''),
    PropBool('has-close',true),
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
const PAGE_EMPTY_STATES = PageComponent('empty-states',[
    PropString('icon-class','icon icon-3x icon-people'),
    PropString('title','title text'),
    PropString('subtitle','subtitle text'),
    PropBool('has-action',false),
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
const TEMPLATE_MENU_BODY = `<ul class="menu">

  <li class="menu-item">
    <div class="tile tile-centered">
      <div class="tile-icon"><img class="avatar" src="../img/avatar-4.png" alt="Avatar"></div>
      <div class="tile-content">Steve Rogers</div>
    </div>
  </li>
                  
  <li class="divider" data-content="LINKS">
  </li>
  <li class="menu-item">
    <a href="#">
      <i class="icon icon-link"></i> Slack
    </a>
  </li>
  <li class="menu-item">
    <label class="form-checkbox">
      <input type="checkbox">
      <i class="form-icon"></i> form-checkbox
    </label>
  </li>
  <li class="divider"></li>
  <li class="menu-item">
    <a href="#">
      <i class="icon icon-link"></i> Settings
    </a>
    <div class="menu-badge">
      <label class="label label-primary">2</label>
    </div>
  </li>

  <li class="menu-item">
    <a href="#">My profile</a>
    <div class="menu-badge">
      <label class="form-checkbox">
        <input type="checkbox">
        <i class="form-icon"></i> Public
      </label>
    </div>
  </li>
  
  <li class="menu-item">
    <label class="form-checkbox">
      <input type="checkbox" checked=""><i class="form-icon"></i> form-checkbox
    </label>
  </li>
  <li class="menu-item">
    <label class="form-radio">
      <input type="radio" checked=""><i class="form-icon"></i> form-radio
    </label>
  </li>
  <li class="menu-item">
    <label class="form-switch">
      <input type="checkbox" checked=""><i class="form-icon"></i> form-switch
    </label>
  </li>
</ul>`;
const PAGE_MENU = PageComponent('menu',[
],[
    {
        ctx: 'gen-menu-direct', inline: false,
        func: ([])=>{
            return TEMPLATE_MENU_BODY;
        },
    },
    {
        ctx: 'gen-menu-dropdown-split', inline: false,
        func: ([])=>{
            return `<div class="dropdown">
  <a href="#" class="btn btn-link dropdown-toggle" tabindex="0">
    dropdown menu <i class="icon icon-caret"></i>
  </a>
  ${TEMPLATE_MENU_BODY}
</div>`;
        },
    },
    {
        ctx: 'gen-menu-dropdown-combine', inline: false,
        func: ([])=>{
            return `<div class="dropdown">
  <div class="btn-group">
    <a href="#" class="btn">
      dropdown button
    </a>
    <a href="#" class="btn dropdown-toggle" tabindex="0">
      <i class="icon icon-caret"></i>
    </a>

    ${TEMPLATE_MENU_BODY}
  </div>
</div>`;
        },
    },
]);
const PAGE_PANELS = PageComponent('panels',[
    PropBool('has-footer',true),
],[
    {
        ctx: 'gen-panels', inline: true,
        func: ([footer])=>{
            return `<div class="panel" style="height: 400px">
  <div class="panel-header">
    <div class="panel-title">panal header</div>
  </div>
  <div class="panel-nav">
    panel nav
  </div>
  <div class="panel-body">
    <div style="height: 600px; border: dashed green 1px">panel body</div>
  </div>
  ${footer ? `<div class="panel-footer">
    panel footer
  </div>`: ``}
</div>`;
        },
    },
]);
function POPOVER_CONTENT(type,head,body,footer)
{
    let content;
    switch (type)
    {
        case 'card':
        {
            const headContent = head ? `<div class="card-header">
        popover header
      </div>` : ``;
            const bodyContent = body ? `<div class="card-body">
        popover body
      </div>` : ``;
            const footerContent = footer ? `<div class="card-footer">
        popover footer
      </div>` : ``;

            content = `<div class="card">
      ${headContent}
      ${bodyContent}
      ${footerContent}
    </div>`;
            break;
        }
        case 'text':
        {
            content = `popover content text`;
            break;
        }
    }
    return `<div class="popover#POSITION#">
  <button class="btn btn-primary">popover</button>
  <div class="popover-container">
    ${content}
  </div>
</div>`;
}
const PAGE_POPOVERS = PageComponent('popovers',[
    PropSingleSelect('content-type','card',['card','text']),
    PropBool('card-head',true),
    PropBool('card-body',true),
    PropBool('card-footer',true),
],[
    {
        ctx: 'gen-popover-top', inline: true,
        func: ([type,head,body,footer])=>{
            return POPOVER_CONTENT(type, head, body, footer).replace("#POSITION#","");
        },
    },
    {
        ctx: 'gen-popover-right', inline: true,
        func: ([type,head,body,footer])=>{
            return POPOVER_CONTENT(type, head, body, footer).replace("#POSITION#"," popover-right");
        },
    },
    {
        ctx: 'gen-popover-bottom', inline: true,
        func: ([type,head,body,footer])=>{
            return POPOVER_CONTENT(type, head, body, footer).replace("#POSITION#"," popover-bottom");
        },
    },
    {
        ctx: 'gen-popover-left', inline: true,
        func: ([type,head,body,footer])=>{
            return POPOVER_CONTENT(type, head, body, footer).replace("#POSITION#"," popover-left");
        },
    },
]);
const PAGE_STEPS = PageComponent('steps',[
    PropSlider('count-step',3,2,5,1,'2','5'),
    PropSlider('active-step',3,2,5,1,'2','5'),
    PropBool('has-tooltip',true),
    PropBool('has-text',true),
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
const PAGE_TABS = PageComponent('tabs',[
    PropSlider('count-tab',3,2, 5,1,'2','5'),
    PropSlider('active-tab',3,1, 5,1,'1','5'),
    PropBool('block',false),
    PropBool('badge',false),
    PropBool('clear',false),
    PropBool('action',false),
],[
    {
        ctx: 'gen-tabs', inline: false,
        func: ([count, active, block, badge, clear, action])=>{
            let tabContent = '';
            for(let step = 0; step < count; step++)
            {
                tabContent += ` <li class="tab-item${active - 1 === step ? ' active' : ''}">
    <a href="#"${badge ? ' class="badge" data-badge="'+(step+1)+'"' : ''}>
      Tab${step + 1}
      ${clear ? '<span class="btn btn-clear"></span>' : ''}
    </a>
  </li>`;
            }

            if(action) tabContent += `<li class="tab-item tab-action">
    <div class="input-group input-inline">
      <input class="form-input input-sm" type="text">
      <button class="btn btn-primary btn-sm input-group-btn">action button</button>
    </div>
  </li>`;

            return `<ul class="tab${block ? ' tab-block':''}">${tabContent}</ul>`;
        },
    },
]);
const PAGE_TILES = PageComponent('tiles',[
    PropBool('is-compact', false),
],[
    {
        ctx: 'gen-tiles', inline: false,
        func: ([compact])=>{
            return `<div class="tile${compact ? ` tile-centered` : ``}">
  <div class="tile-icon">
    <figure class="avatar avatar-lg" data-initial="Fi"></figure>
  </div>
  <div class="tile-content">
    <p class="tile-title">tile title</p>
    <p class="tile-subtitle">tile subtitle</p>
  </div>
  <div class="tile-action">
    <button class="btn btn-primary">btn1</button>
    <button class="btn">btn2</button>
  </div>
</div>`;
        },
    },
]);
const PAGE_TOASTS = PageComponent('toasts',[
    PropString('text','toast text'),
    PropBool('has-clear',true),
],[
    {
        ctx: 'gen-toasts-primary', inline: true,
        func: ([text,hasClear])=>{
            return `<div class="toast">
${hasClear ? '<button class="btn btn-clear float-right"></button>' : ''}
${text}
</div>`;
        },
    },
    {
        ctx: 'gen-toasts-success', inline: true,
        func: ([text,hasClear])=>{
            return `<div class="toast toast-success">
${hasClear ? '<button class="btn btn-clear float-right"></button>' : ''}
${text}
</div>`;
        },
    },
    {
        ctx: 'gen-toasts-warning', inline: true,
        func: ([text,hasClear])=>{
            return `<div class="toast toast-warning">
${hasClear ? '<button class="btn btn-clear float-right"></button>' : ''}
${text}
</div>`;
        },
    },
    {
        ctx: 'gen-toasts-error', inline: true,
        func: ([text,hasClear])=>{
            return `<div class="toast toast-error">
${hasClear ? '<button class="btn btn-clear float-right"></button>' : ''}
${text}
</div>`;
        },
    },
],[
    { key: 'document', url: 'https://picturepan2.github.io/spectre/components/toasts.html' },
]);
const PAGE_TOOLTIPS = PageComponent('tooltips',[
    PropSingleSelect('dom','button',['button','span']),
    PropSingleSelect('position','top',['top','right','bottom','left']),
    PropString('text-dom','dom text'),
    PropString('text-tooltip','tooltip text'),
],[
    {
        ctx: 'gen-tooltips', inline: true,
        func: ([dom,position,textDom,textTooltip])=>{
            let strPositionTooltip = '';
            switch(position)
            {
                case 'bottom': strPositionTooltip = ' tooltip-bottom'; break;
                case 'left': strPositionTooltip = ' tooltip-left'; break;
                case 'right': strPositionTooltip = ' tooltip-right'; break;
            }
            if(dom === 'button') strPositionTooltip += ' btn';
            return `<${dom} class="tooltip${strPositionTooltip}" data-tooltip="${textTooltip}">${textDom}</${dom}>`;
        },
    }
]);

// experimentals
const PAGE_COMPARISON_SLIDERS = PageComponent('comparison-sliders',[],[
    {
        ctx: 'gen-sliders', inline: false,
        func: ([])=>{
            return `<div class="comparison-slider" style="width: 800px">
  <figure class="comparison-before">
    <img src="placeholder-image.gif" alt="placeholder"/>
    <div class="comparison-label">Placeholder1</div>
  </figure>

  <figure class="comparison-after">
    <img src="placeholder-image-2.gif" alt="placeholder" style="width: 800px"/>
    <div class="comparison-label">Placeholder2</div>
    <textarea class="comparison-resizer" readonly style="margin-left: 0; margin-right: 0"></textarea>
  </figure>
</div>`;
        },
    },
]);
const PAGE_FILTERS = PageComponent('filters',[
    PropSlider('count-group',3,2,8,1,'2','8'),
],[
    {
        ctx: 'gen-filters', inline: false,
        func: ([countGroup])=>{
            let listRadio = `<input type="radio" id="tag-0" class="filter-tag" name="filter-radio" hidden checked>`;
            let listNav = ``;
            let listItem = ``;

            for(let step = 0; step < countGroup; step++)
            {
                listRadio += `<input type="radio" id="tag-${step + 1}" class="filter-tag" name="filter-radio" hidden>`;
                listNav += `<label class="chip" for="tag-${step + 1}">Filter Group ${step + 1}</label>`;
                listItem += `<div class="filter-item card" data-tag="tag-${step + 1}">
  <div class="card">
    <div class="card-header">
      <div class="card-title text-bold">Filter Group ${step + 1}</div>
      <div class="card-subtitle text-gray">Filter Group ${step + 1} Content</div>
    </div>
  </div>
    </div>`;
            }

            return `<div class="filter">
  <input type="radio" id="tag-0" class="filter-tag" name="filter-radio" hidden checked>
  ${listRadio}

  <div class="filter-nav">
    <label class="chip" for="tag-0">All</label>
    ${listNav}
  </div>

  <div class="filter-body">
    ${listItem}
  </div>
</div>`;
        },
    }
]);
const PAGE_PARALLAX = PageComponent('parallax',[
    PropString('text','parallax text'),
    PropSingleSelect('dom','h2',['h1','h2','h3','h4','h5','h6','div']),
    PropString('img-url','https://via.placeholder.com/250.gif/2db38a/4a22c0?text=placeholder+picture'),
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
const PAGE_PROGRESS = PageComponent('progress',[
    PropNumber('max',100,'','',1),
    PropBool('loading',false),
    PropNumber('value',50,'','',1),
],[
    {
        ctx: 'gen-progress', inline: true,
        func: ([max, loading, value])=>{
            return `<progress class="progress" max="${max}" ${loading ? '' : 'value="' + value + '"'}></progress>`;
        },
    },
]);
const PAGE_SLIDER = PageComponent('sliders',[
    PropNumber('min',0,'',''),
    PropNumber('max',100,'',''),
    PropNumber('value',50,'',''),
    PropBool('tooltip',true),
    PropAnnotation('about-tooltip','page-slider-about-tooltip'),
],[
    {
        ctx: 'gen-slider', inline: true,
        func: ([min,max,value,tooltip])=>{
            return `<input class="${tooltip ? 'slider tooltip' : 'slider'}" type="range" min="${min}" max="${max}" value="${value}"/>`;
        },
    }
]);
const PAGE_TIMELINES = PageComponent('timelines',[
    PropSlider('count-step',3,2,5,1,'2','5'),
],[
    {
        ctx: 'gen-timelines', inline: false,
        func: ([countStep])=>{
            let body = '';
            for(let step = 0; step < countStep; step++)
            {
                body += `<div class="timeline-item" id="timeline-demo-${step + 1}">
    <div class="timeline-left">
      <a class="timeline-icon${step % 2 === 0 ? ' icon-lg':''}" href="#timeline-demo-${step + 1}">
        ${step % 2 === 0 ? `<i class="icon icon-check"></i>` : ``}
      </a>
    </div>
    <div class="timeline-content">
      timeline content ${step + 1}
    </div>
  </div>`;
            }
            return `<div class="timeline">
${body}
</div>`;
        },
    },
]);

const MetaPages = [
    // NodeItemPageSingle('home', 'ri-home-line'),
    Group('p-elements',[
        PAGE_TYPOGRAPHY,
        PAGE_TABLES,
        PAGE_BUTTONS,
        PAGE_FORM_INPUT,
        PAGE_FORM_TEXTAREA,
        PAGE_FORM_SELECT,
        PAGE_FORM_RADIO,
        PAGE_SWITCH,
        PAGE_CHECKBOX,
        PAGE_ICONS,
        PAGE_CODE,
        PAGE_MEDIA_IMAGE,
        PAGE_MEDIA_VIDEO,
    ]),
    Group('p-components',[
        PAGE_HERO,
        PAGE_NAVBAR,
        PAGE_ACCORDIONS,
        PAGE_AVATARS,
        PAGE_BADGES,
        PAGE_BARS,
        PAGE_BREADCRUMBS,
        PAGE_EMPTY_STATES,
        PAGE_MENU,
        PAGE_CARDS,
        PAGE_CHIPS,
        PAGE_PANELS,
        PAGE_POPOVERS,
        PAGE_STEPS,
        PAGE_TABS,
        PAGE_TILES,
        PAGE_TOASTS,
        PAGE_TOOLTIPS,
    ]),
    Group('p-utilities'),
    Group('p-experimentals',[
        PAGE_COMPARISON_SLIDERS,
        PAGE_FILTERS,
        PAGE_PARALLAX,
        PAGE_PROGRESS,
        PAGE_SLIDER,
        PAGE_TIMELINES,
    ]),
    Group('p-others',[
        PageSingle('about-installation','about-installation'),
        PageSingle('about-spectre-css-helper','about-spectre-css-helper'),
    ]),
];
for(let meta of MetaPages)
{
    setContext(meta,null);
}


export default MetaPages;