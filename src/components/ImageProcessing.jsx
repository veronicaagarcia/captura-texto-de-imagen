/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */

// import { useRef, useEffect, useState } from 'react';
// import { OcrProcessing } from './OcrProcessing';

// export function ImageProcessing({ imageSrc, onTextExtracted }) {
//   const canvasRef = useRef(null);
//   const imageRef = useRef(null);
//   const [isImageLoaded, setIsImageLoaded] = useState(false);
//   const [scale, setScale] = useState(2);
//   const [threshold, setThreshold] = useState(127);
//   const [ocrText, setOcrText] = useState('');

//   useEffect(() => {
//     const processImage = async () => {
//       try {
//         const imgElement = imageRef.current;
//         if (!imgElement) return;

//         const src = cv.imread(imgElement);
//         let dst = new cv.Mat();
//         let dsize = new cv.Size(src.cols * scale, src.rows * scale);

//         cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);
//         cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY);
//         cv.threshold(dst, dst, threshold, 255, cv.THRESH_BINARY);
//         cv.imshow(canvasRef.current, dst);

//         // Aquí pasas el canvas a OcrProcessing para hacer el OCR
//         setOcrText(''); // Limpiar el texto anterior antes de realizar OCR
//       } catch (error) {
//         console.error("Error durante el procesamiento de la imagen:", error);
//       }
//     };

//     if (isImageLoaded && typeof cv !== "undefined") {
//       processImage();
//     }
    
//   }, [imageSrc, isImageLoaded, scale, threshold]);

//   return (
//     <div className="space-y-4">
//       <img
//         ref={imageRef}
//         src={imageSrc}
//         alt="Procesando imagen"
//         className="hidden"
//         onLoad={() => setIsImageLoaded(true)}
//       />

//       <div className="flex flex-col gap-4 md:flex-row md:justify-between">
//         <label className="flex flex-col text-gray-700">
//           Escala:
//           <input
//             type="range"
//             min="1"
//             max="4"
//             step="0.5"
//             value={scale}
//             onChange={(e) => setScale(parseFloat(e.target.value))}
//             className="mt-1"
//           />
//           <span className="text-sm">Valor: {scale.toFixed(1)}</span>
//         </label>

//         <label className="flex flex-col text-gray-700">
//           Umbral:
//           <input
//             type="range"
//             min="0"
//             max="255"
//             step="1"
//             value={threshold}
//             onChange={(e) => setThreshold(parseInt(e.target.value))}
//             className="mt-1"
//           />
//           <span className="text-sm">Valor: {threshold}</span>
//         </label>
//       </div>
//       <canvas
//         ref={canvasRef}
//         className="w-full h-auto border border-gray-300 shadow-md rounded-lg"
//       ></canvas>

//       {/* Aquí se pasa el canvas a OcrProcessing para hacer OCR */}
//       <OcrProcessing imageData={canvasRef.current} onTextExtracted={onTextExtracted} />
//     </div>
//   );
// }
import { useRef, useEffect, useState } from 'react'; 
import { OcrProcessing } from './OcrProcessing'; 

export function ImageProcessing({ imageSrc, onTextExtracted }) { 
  const canvasRef = useRef(null); 
  const imageRef = useRef(null); 
  const [isImageLoaded, setIsImageLoaded] = useState(false); 
  const [scale, setScale] = useState(2); 
  const [threshold, setThreshold] = useState(127); 
  const [ocrText, setOcrText] = useState(''); 
  
  useEffect(() => { 
    const processImage = async () => { 
      try { 
        const imgElement = imageRef.current; 
        if (!imgElement) return; 
        
        const src = cv.imread(imgElement); 
        let dst = new cv.Mat(); 
        let dsize = new cv.Size(src.cols * scale, src.rows * scale); 
        cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA); 
        cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY); 
        cv.threshold(dst, dst, threshold, 255, cv.THRESH_BINARY); 
        cv.imshow(canvasRef.current, dst); // Aquí pasas el canvas a OcrProcessing para hacer el OCR 
        setOcrText(''); // Limpiar el texto anterior antes de realizar OCR
      } catch (error) { 
        console.error("Error durante el procesamiento de la imagen:", error); 
      } 
    }; 
    
    if (isImageLoaded && typeof cv !== "undefined") { 
      processImage(); 
    } 
  }, [imageSrc, isImageLoaded, scale, threshold]); 
  
  return ( 
  <div className="space-y-4"> 
    <img 
    ref={imageRef} 
    src={imageSrc} 
    alt="Procesando imagen" 
    className="hidden" 
    onLoad={() => setIsImageLoaded(true)} /> 
    <div className="flex flex-col gap-4 md:flex-row md:justify-between"> 
      <label className="flex flex-col text-gray-700"> 
        Escala: 
        <input 
        type="range" 
        min="1" 
        max="4" 
        step="0.5" 
        value={scale} 
        onChange={(e) => setScale(parseFloat(e.target.value))} 
        className="mt-1" /> 
        <span className="text-sm">
          Valor: {scale.toFixed(1)}
        </span> 
        </label> 
        <label className="flex flex-col text-gray-700"> 
          Umbral: 
          <input 
          type="range" 
          min="0" 
          max="255" 
          step="1" 
          value={threshold} 
          onChange={(e) => setThreshold(parseInt(e.target.value))} 
          className="mt-1" /> 
          <span className="text-sm">
            Valor: {threshold}
          </span> 
        </label> 
      </div> 
      <canvas ref={canvasRef} className="w-full h-auto border border-gray-300 shadow-md rounded-lg" ></canvas> {/* Aquí se pasa el canvas a OcrProcessing para hacer OCR */} 
      <OcrProcessing imageData={canvasRef.current} onTextExtracted={onTextExtracted} /> 
    </div>  
  ); 
}