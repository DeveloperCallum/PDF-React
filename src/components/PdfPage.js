export default function PdfPage({base64Image, pageNumber}) {
    return (
        <div>
            <p>{pageNumber + 1}</p>
            <img src={'data:image/png;base64,'+base64Image} alt={`Page ${pageNumber}`} height="1200px" />
        </div>
    );
}