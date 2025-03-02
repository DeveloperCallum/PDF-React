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
    }

    let firstPosition;
    let secondPosition;
    const handleClick = (event) => {
        let image = document.getElementById(`image-${pageNumber}`)
        let cursorX = event.pageX; //get cursorX relative to whole page.
        let cursorY = event.pageY; //get cursorY relative to whole page.

        //Convert to coordinates relative to the element.
        let imagePos = getPosition(image);

        if (!firstPosition) {
            return firstPosition = {
                "x": (cursorX - imagePos.left) / zoomLevel, "y": (cursorY - imagePos.top) / zoomLevel
            }
        }else{
            secondPosition = {
                "x": (cursorX - imagePos.left) / zoomLevel, "y": (cursorY - imagePos.top) / zoomLevel
            }
        }

        addSelection({
            "x1": firstPosition.x,
            "y1": firstPosition.y,
            "x2": secondPosition.x,
            "y2": secondPosition.y,
        })

        firstPosition = undefined;
    }

    useEffect(() => {
        let selectionsElement = [];
        selections.map((value, index) => {
            let imagePos = getGlobalPosition(document.getElementById(`image-${pageNumber}`));

            let div = <Selection left={imagePos.left} top={imagePos.top} selections={selections[index]} y1={value.y1}
                                 x1={value.x1} x2={value.x2} y2={value.y2} index={index}
                                 pageNumber={pageNumber} zoomLevel={zoomLevel} type={value.type}
                                 onUpdateSelectionsEvent={(e) => {
                                     selections[index] = e;
                                 }}
                                 onDelete={() => {
                                     setSelections(prevSelections => {
                                         const newArr = [...prevSelections];
                                         newArr.splice(index, 1);
                                         return newArr;
                                     });
                                 }}/>;

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