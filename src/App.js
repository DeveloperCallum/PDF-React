import './App.css';
import {convertUploadedFileToBase64, loadImages} from './components/scripts/pdfHandler'
import {clearImages} from "./components/PdfDocument";
import {setImageGetPageBase64PDF} from "./components/scripts/payloadManager";

function App() {
    function onClick(){
        clearImages();
        convertUploadedFileToBase64().then(rawData =>{
            setImageGetPageBase64PDF(rawData);
            loadImages(JSON.stringify({"base64PDF": `${rawData}`}))
        })
    }

    return (
        <div className="App">
            <h2>PDF Extractor</h2>
            <input type="file" id="fileInput"/>
            <button onClick={onClick}>Convert</button>
            <div id="loading-message" style={{display: "none"}}>LOADING IMAGES</div>
            <div id="images"></div>
        </div>
    );
}

export default App;
