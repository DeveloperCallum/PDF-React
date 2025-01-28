export function getZoomLevel() {
    const sessionZoom = sessionStorage.getItem('zoomLevel');
    return sessionZoom !== null ? parseFloat(sessionZoom) : 2;
}

