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
    return { bottomX, bottomY };
}

export function globalToRelativeCoordinates(x, y, element) {
    const rect = element.getBoundingClientRect();
    const relativeX = x - rect.left;
    const relativeY = y - rect.top;
    console.log(`${x} - ${rect.left}`);
    console.log(`${y} - ${rect.top}`);

    return { "x": relativeX, "y": relativeY };
}