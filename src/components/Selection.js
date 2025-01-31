import {useEffect} from "react";
import {
    getBottomRightCoordinates,
    getCoordsAsUpperLeftAndLowerRight, getGlobalPosition, globalToRelativeCoordinates
} from "./scripts/coordinateUtils";

export default function Selection({index, top, left, y1, x1, y2, x2, zoomLevel, pageNumber, onUpdatePosition}) {
    let coords = getCoordsAsUpperLeftAndLowerRight(x1, y1, x2, y2);
    return (<div id={`selection-${index}`} className={"selections"} style={{
        top: `${top + (coords.y1 * zoomLevel)}px`,
        left: `${left + (coords.x1 * zoomLevel)}px`,
        width: `${(coords.x2 - coords.x1) * zoomLevel}px`,
        height: `${(coords.y2 - coords.y1) * zoomLevel}px`,
    }}></div>);
}