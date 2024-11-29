/* eslint-disable react/prop-types */
// Componente que utiliza la cámara del dispositivo para capturar una imagen y luego la procesa.
import { useRef, useState } from 'react'

export function ImageCapture({ imageCapture }) {
  const videoRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false); // Estado para indicar que se está procesando
  const [isCaptured, setIsCaptured] = useState(false); // Estado para saber si la captura fue realizada

  const handleCapture = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;

    setIsProcessing(true); // Mostrar la animación de carga

    // Tomar una foto con un tiempo de espera
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL();

      imageCapture(dataUrl); // Pasar la imagen capturada al componente padre
      setIsProcessing(false); // Terminar el proceso de captura
      setIsCaptured(true); // Indicar que la imagen fue capturada

      stream.getTracks().forEach(track => track.stop()); // Detener el stream de la cámara
    }, 5000); // Espera de 5 segundos antes de capturar la imagen
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <button
        onClick={handleCapture}
        className="bg-coral hover:bg-naranjaprincipal text-white p-2 rounded"
        disabled={isProcessing} // Deshabilitar el botón mientras se procesa
      >
        {isProcessing ? 'Capturando...' : 'Utilizar la cámara'}
      </button>

      {isProcessing && (
        <div className="mt-4 text-lg text-gray-700">Procesando... Espere un momento</div>
      )}

      <video ref={videoRef} autoPlay className="max-w-xs mt-4" />
      
      {isCaptured && !isProcessing && (
        <div className="mt-4 text-green-500">¡Imagen capturada correctamente!</div>
      )}
    </div>
  );
}

