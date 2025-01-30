import {useEffect, useState} from "react";
import {
    getBottomRightCoordinates,
    getCoordsAsUpperLeftAndLowerRight, getGlobalPosition, globalToRelativeCoordinates
} from "./scripts/coordinateUtils";

export default function Selection({index, top, left, y1, x1, y2, x2, zoomLevel, pageNumber, onUpdatePosition}) {
    const [position, setPosition] = useState({y1, x1, y2, x2});
    let width = Math.abs(x2 - x1);
    let height = Math.abs(y2 - y1);

    const updatePosition = (newValues) => {
        setPosition(prevPosition => ({...prevPosition, ...newValues}));

        if (onUpdatePosition){
            onUpdatePosition(newValues);
        }
    };

    useEffect(() => {
        dragElement(document.getElementById(`selection-${index}`), index); //Make the DIV element draggable
    })

    let coords = getCoordsAsUpperLeftAndLowerRight(position.x1, position.y1, position.x2, position.y2);
    return (<div onClick={onClickHandle} id={`selection-${index}`} className={"selections"} style={{
        top: `${top + (coords.y1 * zoomLevel)}px`,
        left: `${left + (coords.x1 * zoomLevel)}px`,
        width: `${(coords.x2 - coords.x1) * zoomLevel}px`,
        height: `${(coords.y2 - coords.y1) * zoomLevel}px`,
    }}></div>);

    function onClickHandle(e) {
        let element = e.target;
        let elementPosGlobal = getGlobalPosition(element);
        let point1 = globalToRelativeCoordinates(elementPosGlobal.left, elementPosGlobal.top, document.getElementById(`image-${pageNumber}`));
        let point2 = getBottomRightCoordinates(point1.x, point1.y, width, height);

        updatePosition({ //we need to update the data.
            "x1": point1.x / zoomLevel,
            "y1": point1.y / zoomLevel,
            "x2": point2.bottomX / zoomLevel,
            "y2": point2.bottomY / zoomLevel
        })
    }
}

function dragElement(elmnt, index) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement(e) {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}