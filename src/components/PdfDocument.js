import PdfPage from "./PdfPage";

export default function PdfDocument({images, start, end, numberOfPages}) {
    return <div>
        {images.forEach((image, index) => {
            return <PdfPage base64Image={image} pageNumber={start + (index + 1)}/>
        })}
    </div>
}