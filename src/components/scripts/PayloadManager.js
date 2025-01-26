let getPageImagePayload;

export function setImageGetPagePayload(payload){
    getPageImagePayload = payload;
}

export function getImageGetPagePayload(){
    let payload = {};

    if (getPageImagePayload.base64PDF){
        payload.base64PDF = getPageImagePayload.base64PDF
    }

    if (getPageImagePayload.tokens){
        payload.tokens = getPageImagePayload.tokens
    }

    if (getPageImagePayload.numberOfPages){
        payload.numberOfPages = getPageImagePayload.numberOfPages
    }

    if (getPageImagePayload.base64Images){
        payload.base64Images = getPageImagePayload.base64Images
    }

    return payload;
}