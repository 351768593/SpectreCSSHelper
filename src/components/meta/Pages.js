import {
    TreeGroup,
    TreeItemPage,
    TreeItemPageSingle,
    TreePropBool,
    TreePropMultiSelect,
    TreePropNumber,
    TreePropSingleSelect,
    TreePropSlider,
    TreePropString,
} from './Consts';
import {
    NodeGroup,
    NodePage,
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
const PAGE_TYPOGRAPHY = NodePage('typography', [
    PropString('text','demo text'),
    PropSingleSelect('dom', 'none',[
        'div', 'span', 'h6', 'h5', 'h4', 'h3', 'h2', 'h1',
        'label', 'abbr', 'strong', 'b', 'cite', 'code', 'del', 'em',
        'i', 'ins', 'kbd', 'mark', 'ruby', 's', 'samp', 'sub',
        'sup', 'time', 'u', 'var', 'blockquote',
    ]),
    PropSingleSelect('language','none',[
        'none', 'zh-hans', 'zh-hant', 'ja', 'ko',
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
],[
    {
        ctx: 'gen-typography', inline: false,
        func: ([text,dom,language,fgc,bgc,cursors,extraStyle])=>{
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
const PAGE_FORM_INPUT = NodePage('form-input',[],[]);
const PAGE_FORM_TEXTAREA = NodePage('form-textarea',[
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
const PAGE_FORM_SELECT = NodePage('form-select',[
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
const PAGE_FORM_RADIO = NodePage('form-radio',[
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
const PAGE_SWITCH = NodePage('form-switch',[
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
const PAGE_CHECKBOX = NodePage('form-checkbox',[
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
const PAGE_CODE = NodePage('code',[
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
const PAGE_MEDIA_IMAGE = NodePage('media-image',[
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
const PAGE_MEDIA_VIDEO = NodePage('media-video',[
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

const PAGE_TABLES = NodePage('tables', [
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
const PAGE_BUTTONS = NodePage('buttons',[
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
const PAGE_HERO = NodePage('hero',[
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
const PAGE_NAVBAR = NodePage('navbar',[
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
// components
const PAGE_AVATARS = NodePage('avatars',[
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
const PAGE_BADGES = NodePage('badges',[
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
const PAGE_BARS = NodePage('bars',[
    PropSingleSelect('size','default',['default','sm']),
    PropSlider('percentage',50,0,100,1,'0','100%'),
    PropColor('color','#818bd5'),
    PropBool('has-Text',true),
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
const PAGE_BREADCRUMBS = NodePage('breadcrumbs',[
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
const PAGE_CHIPS = NodePage('chips',[
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
const PAGE_EMPTY_STATES = NodePage('empty-states',[
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
const PAGE_POPOVERS = NodePage('popovers',[
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
const PAGE_STEPS = NodePage('steps',[
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
const PAGE_TABS = NodePage('tabs',[
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
const PAGE_TOASTS = NodePage('toasts',[
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
const PAGE_TOOLTIPS = NodePage('tooltips',[
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
const PAGE_PARALLAX = NodePage('parallax',[
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
const PAGE_PROGRESS = NodePage('progress',[
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
const PAGE_SLIDER = NodePage('sliders',[
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

const MetaPages = [
    // NodeItemPageSingle('home', 'ri-home-line'),
    NodeGroup('p-elements',[
        PAGE_TYPOGRAPHY,
        PAGE_TABLES,
        PAGE_BUTTONS,
        PAGE_FORM_INPUT,
        PAGE_FORM_TEXTAREA,
        PAGE_FORM_SELECT,
        PAGE_FORM_RADIO,
        PAGE_SWITCH,
        PAGE_CHECKBOX,

        NodePage('icons',[
            PropSingleSelect('dom-type','span',['span','i','div']),
            PropSingleSelect('size','multiply',['multiply','px']),
            PropSlider('size-multiply',1,1,4,'1x','4x'),
            PropSlider('size-px',16,1,128,'1px','128px'),
        ]),

        PAGE_CODE,
        PAGE_MEDIA_IMAGE,
        PAGE_MEDIA_VIDEO,
    ]),
    NodeGroup('p-components',[
        PAGE_HERO,
        PAGE_NAVBAR,
        PAGE_AVATARS,
        PAGE_BADGES,
        PAGE_BARS,
        PAGE_BREADCRUMBS,
        PAGE_EMPTY_STATES,
        PAGE_CHIPS,
        PAGE_POPOVERS,
        PAGE_STEPS,
        PAGE_TABS,
        PAGE_TOASTS,
        PAGE_TOOLTIPS,
    ]),
    NodeGroup('p-utilities'),
    NodeGroup('p-experimentals',[
        PAGE_PARALLAX,
        PAGE_PROGRESS,
        PAGE_SLIDER,
    ]),
    NodeGroup('p-others',[
        // {
        //     key: 'about-installation',
        // }
    ]),
];
for(let meta of MetaPages)
{
    setContext(meta,null);
}

export default MetaPages;