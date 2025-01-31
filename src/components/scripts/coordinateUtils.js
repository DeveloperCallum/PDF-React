export function getCoordsAsUpperLeftAndLowerRight(x1, y1, x2, y2) {
    let xc = (x1 + x2) / 2;
    let yc = (y1 + y2) / 2;
    let xs = Math.abs(x1 - x2) / 2;
    let ys = Math.abs(y1 - y2) / 2

    let upperLeft = {x: xc - xs, y: yc - ys}
    let lowerRight = {x: xc + xs, y: yc + ys}

    //upperLeft = x1,y1, lowerRight = x2,y2
    return {"x1": upperLeft.x, "y1": upperLeft.y, "x2": lowerRight.x, "y2": lowerRight.y}
}

export function getGlobalPosition(element) {
    const rect = element.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
        top: rect.top + scrollTop, left: rect.left + scrollLeft
    };
}

export function getBottomRightCoordinates(x, y, width, height) {
    const bottomX = x + width;
    const bottomY = y + height;
    return {bottomX, bottomY};
}

export function getPosition(element) {
    var clientRect = element.getBoundingClientRect();
    return {
        left: clientRect.left + window.pageXOffset,
        top: clientRect.top + window.pageYOffset
    };
}

export function getRelativeCoords(element, relativeTo) {
    var elementRect = element.getBoundingClientRect();
    var relativeToRect = relativeTo.getBoundingClientRect();

    return {
        left: elementRect.left - relativeToRect.left,
        top: elementRect.top - relativeToRect.top
    };
}

export function getXYRelativeCoords(x,y, relativeTo) {
    var relativeToRect = relativeTo.getBoundingClientRect();

    return {
        left: x - relativeToRect.left,
        top: y - relativeToRect.top
    };
}