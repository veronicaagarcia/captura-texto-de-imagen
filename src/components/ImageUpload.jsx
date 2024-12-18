/* eslint-disable react/prop-types */

import { useState } from "react";

export default function ImageUpload({ imageUpload }) {
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setIsLoading(true)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
        console.log('Uploaded img:', reader.result);
        imageUpload(reader.result)
        setIsLoading(false)
      };
      reader.readAsDataURL(file)
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative inline-block"> 
        <label className="bg-white border-2 border-coral hover:border-none hover:bg-naranjaprincipal hover:text-white text-coral p-2 rounded cursor-pointer">
          Subir imagen 
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            aria-label="Upload an image" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          /> 
        </label> 
      </div>
      {isLoading && <p>Cargando imagen...</p>}
      {image && <img src={image} alt="uploaded" className="mt-4 max-w-xs" />}
    </div>
  );
}