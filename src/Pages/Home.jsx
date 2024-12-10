// import { useState, useEffect } from 'react'
// import { ImageUpload } from "../components/ImageUpload"
// import { ImageCapture } from "../components/ImageCapture"
// import { ImageProcessing } from '../components/ImageProcessing'

// export function Home() {
//     const [imageSrc, setImageSrc] = useState(null)
//     const [extractedText, setExtractedText] = useState("")
//     const [savedTexts, setSavedTexts] = useState([])
//     const [editingIndex, setEditingIndex] = useState(null)

//     useEffect(() => {
//         const savedTextItems = localStorage.getItem('savedTexts')
//         if (savedTextItems) {
//             setSavedTexts(JSON.parse(savedTextItems))
//         }
//     }, [])

//     const handleTextExtracted = (text) => {
//         setExtractedText(text)
//     }

//     const handleImageChange = (newImageSrc) => {
//         setImageSrc(newImageSrc)
//         setExtractedText("") // Limpiar el texto extraído al cargar una nueva imagen
//     }

//     const handleSaved = () => {
//         if (extractedText.trim() !== "") {
//             let updatedSavedTexts
//             if (editingIndex !== null) {
//                 updatedSavedTexts = [...savedTexts]
//                 updatedSavedTexts[editingIndex] = extractedText
//             } else {
//                 updatedSavedTexts = [...savedTexts, extractedText]
//             }
//             setSavedTexts(updatedSavedTexts)
//             localStorage.setItem('savedTexts', JSON.stringify(updatedSavedTexts))
//             setExtractedText("")
//             setEditingIndex(null)
//             alert('Texto guardado con éxito')
//         } else {
//             alert('No hay texto para guardar')
//         }
//     }

//     const handleDelete = (index) => {
//         const updatedSavedTexts = savedTexts.filter((_, i) => i !== index)
//         setSavedTexts(updatedSavedTexts)
//         localStorage.setItem('savedTexts', JSON.stringify(updatedSavedTexts))
//     }

//     const handleDeleteAll = () => {
//         setImageSrc(null)
//         setExtractedText("")
//         setSavedTexts([])
//         localStorage.removeItem('savedTexts')
//         alert('Todos los textos han sido eliminados')
//     }

//     const handleEdit = (index) => {
//         setExtractedText(savedTexts[index])
//         setEditingIndex(index)
//     }

//     const handleDownload = (text) => {
//         const element = document.createElement("a")
//         const file = new Blob([text], {type: 'text/plain'})
//         element.href = URL.createObjectURL(file)
//         element.download = "texto_guardado.txt"
//         document.body.appendChild(element)
//         element.click()
//         document.body.removeChild(element)
//     }

//     return (
//         <div className="container mx-auto md:px-4 py-8 min-h-screen">
           
//             <header className="text-center">
//                 <h1 className="text-2xl md:text-5xl font-bold text-negro tracking-wide mb-4">
//                     INNOVATE<span className="text-naranjaprincipal">Proweb</span> - Captura
//                 </h1>
//                 <p className="text-gray-600 text-lg md:text-xl">
//                     Simplifica la captura, edición y procesamiento de texto en imágenes
//                 </p>
//             </header>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                
//                 {/* SECCION CAPTURA DE IMAGEN */}
//                 <section className="bg-white shadow-lg rounded-lg p-6">
//                     <h2 className="text-2xl mb-4 text-negro font-secondary font-thin">
//                         Captura de imagen
//                     </h2>
//                     <div className="flex flex-col gap-4 items-center">
//                         <ImageUpload imageUpload={handleImageChange} />
//                         <ImageCapture imageCapture={handleImageChange} />
//                     </div>
//                 </section>

//                 {/* SECCION PARA PROCESAR IMAGEN */}
//                 <section className="bg-white shadow-lg rounded-lg p-6">
//                     <h2 className="text-2xl mb-4 text-negro font-secondary font-thin">
//                         Procesamiento
//                     </h2>
//                     {imageSrc ? (
//                         <>
//                             <ImageProcessing
//                                 imageSrc={imageSrc}
//                                 onTextExtracted={handleTextExtracted}
//                             />
//                             <button
//                                 onClick={() => setImageSrc(null)}
//                                 className="mt-4 bg-coral hover:bg-naranjaprincipal text-white p-2 rounded"
//                             >
//                                 Cargar nueva imagen
//                             </button>
//                         </>
//                     ) : (
//                         <p className="text-gray-500">
//                             Por favor, sube o captura una imagen para procesarla
//                         </p>
//                     )}
//                 </section>
//             </div>

//             {/* SECCION PARA EDITAR TEXTO */}
//             <section className="bg-gray-50 shadow-md rounded-lg mt-12 p-6">
//                 <h2 className="text-2xl mb-4 text-negro font-secondary font-thin">
//                     Edición de texto
//                 </h2>
//                 <textarea
//                     className="w-full h-64 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-naranjaprincipal"
//                     value={extractedText}
//                     onChange={(e) => setExtractedText(e.target.value)}
//                     placeholder="El texto extraído aparecerá aquí para su edición"
//                 />
//                 <button
//                     onClick={handleSaved}
//                     className="mt-4 bg-coral hover:bg-naranjaprincipal text-white p-2 rounded">
//                     {editingIndex !== null ? 'Actualizar' : 'Guardar'}
//                 </button>     
//             </section>

//              {/* SECCION DE CONTENIDO GUARDADO */}
//             <section className="bg-gray-50 shadow-md rounded-lg mt-12 p-6">
//                 <div className="mt-4 flex justify-between items-center">
//                     <h2 className="text-2xl mb-4 text-negro font-secondary font-thin">
//                         Textos guardados
//                     </h2>
//                     <button
//                         onClick={handleDeleteAll}
//                         className="bg-red-900 hover:bg-naranjaprincipal text-white p-2 rounded ">
//                         Eliminar todo
//                     </button>
//                 </div>
//                 <div className='w-full h-64 md:h-[500px] p-4 border border-gray-300 rounded-md overflow-y-auto'>
//                     {savedTexts.length > 0 ? (
//                         savedTexts.map((text, index) => (
//                             <div key={index} className="mb-2 p-2 bg-white rounded shadow flex justify-between items-center">
//                                 <p className="truncate mx-4 w-3/4">{text}</p>
//                                 <div className='flex flex-wrap justify-end w-1/4'>
//                                     <button
//                                         onClick={() => handleEdit(index)}
//                                         className="bg-white border-2 border-coral hover:border-transparent hover:bg-naranjaprincipal hover:text-white text-coral p-1 rounded text-sm mr-2"
//                                     >
//                                         Editar
//                                     </button>
//                                     <button
//                                         onClick={() => handleDownload(text)}
//                                         className="bg-coral hover:bg-naranjaprincipal text-white p-1 rounded text-sm mr-2"
//                                     >
//                                         Descargar
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(index)}
//                                         className="bg-red-900 hover:bg-naranjaprincipal text-white p-1 rounded text-sm"
//                                     >
//                                         Eliminar
//                                     </button>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-500">No hay textos guardados</p>
//                     )}
//                 </div>
//             </section>
//         </div>
//     )
// }

import { useState, useEffect } from 'react'
import ImageUpload from '../components/ImageUpload'
import { ImageCapture } from "../components/ImageCapture"
import { ImageProcessing } from '../components/ImageProcessing'

export function Home() {
    const [imageSrc, setImageSrc] = useState(null)
    const [extractedText, setExtractedText] = useState("")
    const [savedTexts, setSavedTexts] = useState([])
    const [editingIndex, setEditingIndex] = useState(null)

    useEffect(() => {
        const savedTextItems = localStorage.getItem('savedTexts')
        if (savedTextItems) {
            setSavedTexts(JSON.parse(savedTextItems))
        }
    }, [])

    const handleTextExtracted = (text) => {
        setExtractedText(text)
    }

    const handleImageChange = (newImageSrc) => {
        setImageSrc(newImageSrc)
        setExtractedText("") // Limpiar el texto extraído al cargar una nueva imagen
    }

    const handleSaved = () => {
        if (extractedText.trim() !== "") {
            let updatedSavedTexts
            const newTextItem = {
                text: extractedText,
                date: new Date().toISOString()
            }
            if (editingIndex !== null) {
                updatedSavedTexts = [...savedTexts]
                updatedSavedTexts[editingIndex] = newTextItem
            } else {
                updatedSavedTexts = [...savedTexts, newTextItem]
            }
            setSavedTexts(updatedSavedTexts)
            localStorage.setItem('savedTexts', JSON.stringify(updatedSavedTexts))
            setExtractedText("")
            setEditingIndex(null)
            alert('Texto guardado con éxito')
        } else {
            alert('No hay texto para guardar')
        }
    }

    const handleDelete = (index) => {
        const updatedSavedTexts = savedTexts.filter((_, i) => i !== index)
        setSavedTexts(updatedSavedTexts)
        localStorage.setItem('savedTexts', JSON.stringify(updatedSavedTexts))
    }

    const handleDeleteAll = () => {
        setImageSrc(null)
        setExtractedText("")
        setSavedTexts([])
        localStorage.removeItem('savedTexts')
        alert('Todos los textos han sido eliminados')
    }

    const handleEdit = (index) => {
        setExtractedText(savedTexts[index].text)
        setEditingIndex(index)
    }

    const handleDownload = (text) => {
        const element = document.createElement("a")
        const file = new Blob([text], {type: 'text/plain'})
        element.href = URL.createObjectURL(file)
        element.download = "texto_guardado.txt"
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    return (
        <div className="container mx-auto md:px-4 py-8 min-h-screen">
           
            <header className="text-center">
                <h1 className="text-2xl md:text-5xl font-bold text-negro tracking-wide mb-4">
                    INNOVATE<span className="text-naranjaprincipal">Proweb</span> - Captura
                </h1>
                <p className="text-gray-600 text-lg md:text-xl">
                    Simplifica la captura, edición y procesamiento de texto en imágenes
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                
                {/* SECCION CAPTURA DE IMAGEN */}
                <section className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl mb-4 text-negro font-secondary font-thin">
                        Captura de imagen
                    </h2>
                    <div className="flex flex-col gap-4 items-center">
                        <ImageUpload imageUpload={handleImageChange} />
                        <ImageCapture imageCapture={handleImageChange} />
                    </div>
                </section>

                {/* SECCION PARA PROCESAR IMAGEN */}
                <section className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl mb-4 text-negro font-secondary font-thin">
                        Procesamiento
                    </h2>
                    {imageSrc ? (
                        <>
                            <ImageProcessing
                                imageSrc={imageSrc}
                                onTextExtracted={handleTextExtracted}
                            />
                        </>
                    ) : (
                        <p className="text-gray-500">
                            Por favor, sube o captura una imagen para procesarla
                        </p>
                    )}
                </section>
            </div>

            {/* SECCION PARA EDITAR TEXTO */}
            <section className="bg-gray-50 shadow-md rounded-lg mt-12 p-6">
                <h2 className="text-2xl mb-4 text-negro font-secondary font-thin">
                    Edición de texto
                </h2>
                <textarea
                    className="w-full h-64 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-naranjaprincipal"
                    value={extractedText}
                    onChange={(e) => setExtractedText(e.target.value)}
                    placeholder="El texto extraído aparecerá aquí para su edición"
                />
                <button
                    onClick={handleSaved}
                    className="mt-4 bg-coral hover:bg-naranjaprincipal text-white p-2 rounded">
                    {editingIndex !== null ? 'Actualizar' : 'Guardar'}
                </button>     
            </section>

             {/* SECCION DE CONTENIDO GUARDADO */}
            <section className="bg-gray-50 shadow-md rounded-lg mt-12 p-6">
                <div className="mt-4 flex justify-between items-center">
                    <h2 className="text-2xl mb-4 text-negro font-secondary font-thin">
                        Textos guardados
                    </h2>
                    <button
                        onClick={handleDeleteAll}
                        className="bg-red-900 hover:bg-naranjaprincipal text-white p-2 rounded ">
                        Eliminar todo
                    </button>
                </div>
                <div className='w-full h-64 md:h-[500px] p-4 border border-gray-300 rounded-md overflow-y-auto'>
                    {savedTexts.length > 0 ? (
                        savedTexts.map((item, index) => (
                            <div key={index} className="mb-2 p-2 bg-white rounded shadow flex justify-between items-center">
                                <p className="truncate mx-4 w-3/4">{item.text}</p>
                                <div className='flex flex-wrap justify-end w-1/4'>
                                    <button
                                        onClick={() => handleEdit(index)}
                                        className="bg-white border-2 border-coral hover:border-transparent hover:bg-naranjaprincipal hover:text-white text-coral p-1 rounded text-sm mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDownload(item.text)}
                                        className="bg-coral hover:bg-naranjaprincipal text-white p-1 rounded text-sm mr-2"
                                    >
                                        Descargar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="bg-red-900 hover:bg-naranjaprincipal text-white p-1 rounded text-sm"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No hay textos guardados</p>
                    )}
                </div>
            </section>
        </div>
    )
}

