import PdfPage from "./PdfPage";
import {clearImages, loadImages} from "../script";
import {getImageGetPagePayload} from "./scripts/PayloadManager";
import React, { useState } from 'react';

export default function PdfDocument({images, start, end, numberOfPages, height, width}) {
    const [zoom, setZoom] = useState(2);

    const onInputSubmit = (event) => {
        setZoom(event.target.value);
        console.log(zoom);
    }

    return <div>
        <div><h2>Controls</h2>
            <input id={"zoomLevel"} type={"number"} step={0.1} onChange={onInputSubmit}/>
            <br/>
            <button onClick={clearImages}>Clear</button>
            {numberOfPages - 1 > end ? <button onClick={() => loadNext(start, end)}>Next</button> : ""}
        </div>

        {images.map((image, index) => {
            return <PdfPage base64Image={image} pageNumber={start + (index)} height={height} width={width} zoomLevel={zoom}/>
        })}
    </div>
}

function loadNext(start, end){
    console.log(`loading: ${end} to ${end+5}`);

    clearImages();
    let payload = getImageGetPagePayload();

    if (payload.base64Images){
        delete payload.base64Images; //if we are loading the next set of images, we no longer need the old images.
    }

    loadImages(JSON.stringify(payload), end, end+5);
}