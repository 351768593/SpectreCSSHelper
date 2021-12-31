export async function handleBlob(name, raw, [start, end], type){
    let ret = {};
    let blobPart = raw.slice(start, end);
    let urlPart = window.URL.createObjectURL(blobPart);
    switch (type)
    {
        case 'img':
            let img = new Image();
            img.src = urlPart;
            ret.data = img;
            ret.url = urlPart;
            break;

        case 'audio':
            let audio = new Audio(urlPart);
            ret.data = audio;
            break;

        case 'json':
            ret.data = JSON.parse(await blobPart.text());
            break;
    }
    ret.name = name;
    return ret;
}