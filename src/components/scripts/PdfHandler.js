import React from 'react';
import ReactDOM from 'react-dom/client';
import PdfDocument from "../PdfDocument";
import {setImageGetPageBase64PDF, setImageGetPagePayload} from "./PayloadManager";

export async function convertUploadedFileToBase64() {
    return new Promise((resolve, reject) => {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];
        console.log("STARTING TO CONVERT");

        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                resolve(event.target.result.split(',')[1]);
            };

            reader.readAsDataURL(file);
        } else {
            reject('Please select a file.');
        }
    })
}

function sendBase64ToServer(bodyPayload, start = 0, end = 5) {
    return new Promise( (resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: bodyPayload,
            redirect: "follow"
        };

        fetch(`/pdf/convert/image/getPage?start=${start}&end=${end}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                //Result is JSON as a string not an object!
                let payload = JSON.parse(result);
                setImageGetPagePayload(payload);
                console.log(payload);
                resolve(payload);
            }).catch((error) => console.error(error));
    })
}

export function loadImages(payload, start = 0, end = 5) {
    document.getElementById('loading-message').style.display = 'block';
    sendBase64ToServer(payload,start, end).then(value => {
        document.getElementById('loading-message').style.display = 'none';
        let images = document.getElementById("images");
        let container = document.createElement("div");
        images.appendChild(container);
        const root = ReactDOM.createRoot(container);
        root.render(<PdfDocument images={value.base64Images} start={start} end={end} numberOfPages={value.numberOfPages} width={value.width} height={value.height}/>)
    });
}