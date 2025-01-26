import logo from './logo.svg';
import './App.css';
import {loadImages} from './script'

function App() {
    return (
        <div className="App">
            <h2>Select a file to convert to Base64</h2>
            <input type="file" id="fileInput"/>
            <button onClick={loadImages}>Convert</button>
            <div id="loading-message" style={{display: "none"}}>LOADING IMAGES</div>
            <div id="images"></div>
        </div>
    );
}

export default App;
