import './App.css';
import {convertUploadedFileToBase64, loadImages} from './script'

function App() {
    return (
        <div className="App">
            <h2>Select a file to convert to Base64</h2>
            <input type="file" id="fileInput"/>
            <button onClick={() => {convertUploadedFileToBase64().then(rawData => loadImages(JSON.stringify({"base64PDF": `${rawData}`})))}}>Convert</button>
            <div id="loading-message" style={{display: "none"}}>LOADING IMAGES</div>
            <div id="images"></div>
        </div>
    );
}

export default App;
