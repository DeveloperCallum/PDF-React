import PdfPage from "./PdfPage";
import {clearImages, loadImages} from "../script";
import {getImageGetPagePayload} from "./scripts/PayloadManager";

export default function PdfDocument({images, start, end, numberOfPages}) {
    return <div>
        <div><h2>Controls</h2>
            <button onClick={clearImages}>Clear</button>
            {numberOfPages - 1 > end ? <button onClick={() => loadNext(start, end)}>Next</button> : ""}
        </div>

        {images.map((image, index) => {
            return <PdfPage base64Image={image} pageNumber={start + (index)}/>
        })}
    </div>
}

function loadNext(start, end){
    console.log(`loading: ${end} to ${end+5}`);

    clearImages();
    let payload = getImageGetPagePayload();

    console.log(payload);
    if (payload.base64Images){
        delete payload.base64Images; //if we are loading the next set of images, we no longer need the old images.
    }
    console.log(payload);

    loadImages(JSON.stringify(payload), end, end+5);
}