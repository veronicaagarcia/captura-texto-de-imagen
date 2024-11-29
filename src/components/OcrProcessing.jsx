/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import { createWorker } from 'tesseract.js';

export function OcrProcessing({ imageData, onTextExtracted }) {
  const [ocrText, setOcrText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const performOcr = async () => {
    setIsProcessing(true);
    const worker = await createWorker();
    try {
      await worker.loadLanguage('spa');
      await worker.initialize('spa');
      await worker.setParameters({
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789¿?¡!.,;: ',
        tessedit_pageseg_mode: '1',  // Automatic page segmentation with OSD
        tessedit_ocr_engine_mode: '2',  // Use LSTM neural network
        preserve_interword_spaces: '1',
      });
      const { data: { text } } = await worker.recognize(imageData);
      setOcrText(text);
      // Pasa el texto extraído a Home
      onTextExtracted(text);
    } catch (error) {
      console.error('Error durante OCR:', error);
    } finally {
      await worker.terminate();
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-4">
        <button
        onClick={performOcr}
        className="mt-4 bg-coral hover:bg-naranjaprincipal text-white p-2 rounded"
        >
            Extraer texto
        </button>
      {isProcessing ? (
        <p>Procesando...</p>
      ) : (
        <p></p>
      )}
    </div>
  );
}
