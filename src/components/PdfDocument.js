import PdfPage from "./PdfPage";
import {loadImages} from "./scripts/PdfHandler";
import {getImageGetPagePayload} from "./scripts/PayloadManager";
import React, {useState} from 'react';
import {getZoomLevel} from "./scripts/zoom";

export default function PdfDocument({images, start, end, numberOfPages, height, width}) {
    const [zoom, setZoom] = useState(getZoomLevel());

    const onInputSubmit = (event) => {
        let zoomLevel = event.target.value;
        setZoom(zoomLevel);
        sessionStorage.setItem('zoomLevel', zoomLevel);
    }

    return <div>
        <div><h2>Controls</h2>
            <input style={{width: "40px"}} id={"zoomLevel"} value={zoom} type={"number"} step={0.1} onChange={onInputSubmit}/>
            <br/>
            <button onClick={clearImages}>Clear</button>
            <br/>
            {start - 5 >= 0 ? <button onClick={() => loadPrevious(start, end)}>Previous</button> : <button disabled={true} onClick={() => loadPrevious(start, end)}>Previous</button>}
            {numberOfPages > end ? <button onClick={() => loadNext(start, end)}>Next</button> : <button disabled={true} onClick={() => loadNext(start, end)}>Next</button>}
        </div>

        {images.map((image, index) => {
            return <PdfPage base64Image={image} pageNumber={start + (index)} height={height} width={width}
                            zoomLevel={zoom}/>
        })}
    </div>
}

function loadNext(start, end) {
    console.log(`loading: ${end} to ${end + 5}`);

    clearImages();
    let payload = getImageGetPagePayload();

    if (payload.base64Images) {
        delete payload.base64Images; //if we are loading the next set of images, we no longer need the old images.
    }

    loadImages(JSON.stringify(payload), end, end + 5);
}

function loadPrevious(start, end) {
    console.log(`loading: ${start - 5} to ${start}`);

    clearImages();
    let payload = getImageGetPagePayload();

    if (payload.base64Images) {
        delete payload.base64Images; //if we are loading the next set of images, we no longer need the old images.
    }

    loadImages(JSON.stringify(payload), start - 5, start);
}

export function clearImages(){
    let images = document.getElementById("images");
    images.innerHTML = "";
}