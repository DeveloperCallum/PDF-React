import ReactDOM from "react-dom/client";
import {useEffect, useState} from "react";
import './selections.css';
import Selection from "./Selection";
import {
    getGlobalPosition, getOffset, getPosition, getXYRelativeCoords, globalToRelativeCoordinates
} from "./scripts/coordinateUtils";

export default function PdfPage({base64Image, pageNumber, height, width, zoomLevel = 1}) {
    const [selections, setSelections] = useState([]);

    const addSelection = (selection) => {
        if (selections === undefined) {
            return setSelections(selection);
        }

        setSelections(prevState => [...prevState, selection]);
        console.log(selection);
    }

    let firstPosition;
    const handleClick = (event) => {
        let image = document.getElementById(`image-${pageNumber}`)
        let cursorX = event.pageX; //get cursorX relative to whole page.
        let cursorY = event.pageY; //get cursorY relative to whole page.

        //Convert to coordinates relative to the element.
        let imagePos = getPosition(image);
        console.log(`image: ${imagePos.left}, ${imagePos.top}`);
        console.log(`cursor: ${cursorX}, ${cursorY}`);
        console.log(`difference: ${(cursorX - imagePos.left) / zoomLevel}, ${(cursorY - imagePos.top) / zoomLevel}`);

        if (!firstPosition) {
            return firstPosition = {
                "x": (cursorX - imagePos.left) / zoomLevel, "y": (cursorY - imagePos.top) / zoomLevel
            }
        }

        addSelection({
            "x1": firstPosition.x,
            "y1": firstPosition.y,
            "x2": (cursorX - imagePos.left) / zoomLevel,
            "y2": (cursorY - imagePos.top) / zoomLevel
        })

        firstPosition = undefined;
    }

    function onUpdate(e) {
        console.log(e);
    }

    useEffect(() => {
        let selectionsElement = [];
        selections.map((value, index) => {
            let imagePos = getGlobalPosition(document.getElementById(`image-${pageNumber}`));

            let div = <Selection left={imagePos.left} top={imagePos.top} y1={value.y1} x1={value.x1} x2={value.x2}
                                 y2={value.y2} index={index} pageNumber={pageNumber} zoomLevel={zoomLevel}
                                 onUpdatePosition={onUpdate}/>;

            selectionsElement.push(div);
            return ''
        });

        let container = document.getElementById(`selections-${pageNumber}`);
        let root = ReactDOM.createRoot(container);
        root.render(<>{selectionsElement}</>);
    }, [pageNumber, selections, zoomLevel])

    return (<>
        <div id={`container-${pageNumber}`}>
            <p>{pageNumber + 1}</p>
            <button onClick={() => {
                setSelections([])
            }}>Clear Selections
            </button>

            <div id={`selections-${pageNumber}`}></div>
            <div style={{zoom: zoomLevel}}>
                <img id={`image-${pageNumber}`} onClick={handleClick} src={'data:image/png;base64,' + base64Image}
                     alt={`Page ${pageNumber}`}
                     height={height} width={width}/>
            </div>
        </div>
    </>);
}