import {useEffect, useState} from "react";
import {
    getBottomRightCoordinates, getCoordsAsUpperLeftAndLowerRight, getGlobalPosition, globalToRelativeCoordinates
} from "./scripts/coordinateUtils";

export default function Selection({index, top, left, selections, zoomLevel, onDelete, onUpdateSelectionsEvent}) {
    let coords = getCoordsAsUpperLeftAndLowerRight(selections.x1, selections.y1, selections.x2, selections.y2);
    return (<div id={`selection-${index}`} className={"selections"} style={{
        top: `${top + (coords.y1 * zoomLevel)}px`,
        left: `${left + (coords.x1 * zoomLevel)}px`,
        width: `${(coords.x2 - coords.x1) * zoomLevel}px`,
        height: `${(coords.y2 - coords.y1) * zoomLevel}px`,
    }}>

        <div className={"selection-controls"}>
            <select className={"clean"} defaultValue={"column"} name={"type"} id={`selection-${index}-type`}>
                <option value="table">Table</option>
                <option value="column">Column</option>
                <option value="entry">Entry</option>
            </select>
            <button className={"clean"} style={{color: "red"}} onClick={onDelete}><strong>x</strong></button>
        </div>
    </div>);
}