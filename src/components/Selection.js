import {useEffect} from "react";
import {
    getBottomRightCoordinates,
    getCoordsAsUpperLeftAndLowerRight, getGlobalPosition, globalToRelativeCoordinates
} from "./scripts/coordinateUtils";

export default function Selection({index, top, left, y1, x1, y2, x2, zoomLevel, pageNumber, onUpdatePosition}) {
    let width = Math.abs(x2 - x1);
    let height = Math.abs(y2 - y1);

    useEffect(() => {
        dragElement(document.getElementById(`selection-${index}`), index); //Make the DIV element draggable
    })

    let coords = getCoordsAsUpperLeftAndLowerRight(x1, y1, x2, y2);
    return (<div onClick={onClickHandle} id={`selection-${index}`} className={"selections"} style={{
        top: `${top + (coords.y1 * zoomLevel)}px`,
        left: `${left + (coords.x1 * zoomLevel)}px`,
        width: `${(coords.x2 - coords.x1) * zoomLevel}px`,
        height: `${(coords.y2 - coords.y1) * zoomLevel}px`,
    }}></div>);

    function onClickHandle(e){
        let element = e.target;
        let elementPosGlobal = getGlobalPosition(element);
        let point1 = globalToRelativeCoordinates(elementPosGlobal.left, elementPosGlobal.top, document.getElementById(`image-${pageNumber}`));
        let point2 = getBottomRightCoordinates(point1.x, point1.y, width, height);

        onUpdatePosition({"newX1": point1.x / zoomLevel, "newY1": point1.y / zoomLevel, "newX2": point2.bottomX / zoomLevel, "newY2": point2.bottomY / zoomLevel})
    }
}

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let isResizing = false;

    // Add resize handles to the element
    addResizeHandles(elmnt);

    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // Check if the target is a resize handle
        if (e.target.classList.contains('resize-handle')) {
            isResizing = true;
            document.onmousemove = resizeElement;
        } else {
            isResizing = false;
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmousemove = elementDrag;
        }
        document.onmouseup = closeDragElement;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function resizeElement(e) {
        e = e || window.event;
        e.preventDefault();
        let rect = elmnt.getBoundingClientRect();
        elmnt.style.width = (e.clientX - rect.left) + "px";
        elmnt.style.height = (e.clientY - rect.top) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        isResizing = false;
    }

    function addResizeHandles(elmnt) {
        const resizeHandle = document.createElement('div');
        resizeHandle.className = 'resize-handle';
        resizeHandle.style.position = 'absolute';
        resizeHandle.style.width = '10px';
        resizeHandle.style.height = '10px';
        resizeHandle.style.backgroundColor = 'red';
        resizeHandle.style.right = '0';
        resizeHandle.style.bottom = '0';
        resizeHandle.style.cursor = 'se-resize';
        elmnt.appendChild(resizeHandle);
    }
}