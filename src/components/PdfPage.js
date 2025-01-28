import ReactDOM from "react-dom/client";
import {useEffect, useState} from "react";
import './selections.css';

export default function PdfPage({base64Image, pageNumber, height, width, zoomLevel = 1}) {
    const [selections, setSelections] = useState([]);

    const addSelection = (selection) => {
        if (selections === undefined) {
            return setSelections(selection);
        }

        setSelections(prevState => [...prevState, selection]);
    }

    const handleClick = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left);
        const y = (event.clientY - rect.top);

        addSelection({x: x / zoomLevel, y: y / zoomLevel});
        console.log(selections);
        console.log(`Clicked Coordinates: X: ${x / zoomLevel}, Y: ${y / zoomLevel}`);
    };

    function getGlobalPosition(element) {
        const rect = element.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        };
    }

    useEffect(() => {
        selections.map((value, index) => {
            const imageElement = document.getElementById(`image-${pageNumber}`);
            if (imageElement) {
                let imagePos = getGlobalPosition(document.getElementById(`image-${pageNumber}`));
                let selections = document.getElementById(`selections-${pageNumber}`);
                let root = ReactDOM.createRoot(selections);
                root.render(<div id={`selections-${index}`} className={"selections"}
                                 style={{
                                     top: `${imagePos.top +   (value.y * zoomLevel)}px`,
                                     left: `${imagePos.left + (value.x  * zoomLevel)}px`,
                                     width: `100px`, height: `100px`, backgroundColor: `red`
                                 }}></div>);
            }

            return '';
        });
    }, [selections, zoomLevel])

    return (<>
            <div id={`container-${pageNumber}`}>
                <p>{pageNumber + 1}</p>
                <div id={`selections-${pageNumber}`}></div>
                <div style={{zoom: zoomLevel}}>
                    <img id={`image-${pageNumber}`} onClick={handleClick} src={'data:image/png;base64,' + base64Image}
                         alt={`Page ${pageNumber}`}
                         height={height} width={width}/>
                </div>
            </div>
        </>
    );
}