export default function PdfPage({base64Image, pageNumber, height, width, zoomLevel = 1}) {
    const handleClick = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left);
        const y = (event.clientY - rect.top);

        console.log(`Clicked Coordinates: X: ${x/zoomLevel}, Y: ${y/zoomLevel}`);
    };

    return (
        <div>
            <p>{pageNumber + 1}</p>
            <div>
                <img onClick={handleClick} src={'data:image/png;base64,'+base64Image} alt={`Page ${pageNumber}`}
                     height={height} width={width} style={{zoom: zoomLevel}}/>
            </div>
        </div>
    );
}