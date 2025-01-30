import ReactDOM from "react-dom/client";
import {useEffect, useState} from "react";
import './selections.css';
import Selection from "./Selection";
import {getGlobalPosition, globalToRelativeCoordinates} from "./scripts/coordinateUtils";

export default function PdfPage({base64Image, pageNumber, height, width, zoomLevel = 1}) {
    const [selections, setSelections] = useState([]);

    const addSelection = (selection) => {
        if (selections === undefined) {
            return setSelections(selection);
        }

        setSelections(prevState => [...prevState, selection]);
        console.log(selection);
    }

    let firstSelection;
    const handleClick = (event) => {
        const relativeCords = globalToRelativeCoordinates(event.clientX, event.clientY, event.currentTarget);

        if (!firstSelection) {
            return firstSelection = {
                x1: relativeCords.x / zoomLevel,
                y1: relativeCords.y / zoomLevel,
                x2: undefined,
                y2: undefined
            };
        }

        firstSelection.x2 = relativeCords.x / zoomLevel;
        firstSelection.y2 = relativeCords.y / zoomLevel;

        addSelection(firstSelection); //if both clicks have happened, save the region.
    };

    function onUpdate(e) {
        console.log(e);
    }

    useEffect(() => {
        let selectionsElement = [];
        selections.map((value, index) => {
            let imagePos = getGlobalPosition(document.getElementById(`image-${pageNumber}`));

            let div = <Selection left={imagePos.left} top={imagePos.top} y1={value.y1} x1={value.x1} x2={value.x2}
                                 y2={value.y2} index={index} pageNumber={pageNumber} zoomLevel={zoomLevel} onUpdatePosition={onUpdate}/>;

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