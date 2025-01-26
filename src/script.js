import React from 'react';
import ReactDOM from 'react-dom/client';
import PdfPage from './components/PdfPage';

export async function convertToBase64() {
    return new Promise((resolve, reject) => {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];

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

function sendBase64ToServer(data) {
    return new Promise( (resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "base64": `${data}`
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        document.getElementById('loading-message').style.display = 'block';

        fetch("/pdf/convert/image?start=0&end=10", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                document.getElementById('loading-message').style.display = 'none';
                resolve(JSON.parse(result));
            })
            .catch((error) => console.error(error));
    })
}

export async function loadImages() {
    let data = await convertToBase64().catch(reason => alert(reason));

    sendBase64ToServer(data).then(value => {
        console.log(value);
        let images = document.getElementById("images");

        for (let i = 0; i < value.base64Images.length; i++) {
            let container = document.createElement("div");
            images.appendChild(container);
            container.id = `page_${i}`;

            let base64Image = value.base64Images[i];
            if (images){
                const root = ReactDOM.createRoot(container);
                root.render(<PdfPage base64Image={base64Image} pageNumber={i}></PdfPage>)
            }else{
                console.error("Container for images not found!")
            }
        }
    });
}