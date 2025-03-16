"use client"
import React, { useCallback, useState } from "react"
import Dropzone from "react-dropzone"

// Icons
import { FaImage, FaUpload } from "react-icons/fa6";

// Styles
import styles from "./ImageDropzone.module.css"

// Types
interface Props {
    img: { src: any, type: string, size: number, name: string } | null,
    setImg: (arg: any) => void,

    uploadState: {state: null | "loading" | "error" | "dragging" | "selected" | "locked", msg: string},
    setUploadState: (arg: {state: null | "loading" | "error" | "dragging" | "selected" | "locked", msg: string}) => void,

    customizations?: {
        className?: string,
        uploadText?: string | null,
    }
    restrictions: { 
        acceptedTypes: string[],
        acceptedFormats: string[],
        maxSize: number
    }
}

export default function ImageDropzone( {img, setImg, uploadState, setUploadState, customizations, restrictions} : Props ) {

    const onDrop = useCallback((acceptedFiles: File[]) => {

        setUploadState({state: null, msg: ""})
        setUploadState({state: "loading", msg: "Loading"})
        
        acceptedFiles.forEach((file: File) => {
            const reader = new FileReader()
            
            reader.onabort = () => setUploadState({state: "error", msg: "File reading was aborted"})

            reader.onerror = () => setUploadState({state: "error", msg: "Could not read file"})

            // Check format
            let acceptedFormat : boolean = false;
            restrictions.acceptedFormats.forEach((format) => {
                if (file.type.split("/")[0] === format) acceptedFormat = true;
            })
            if (!acceptedFormat) { setUploadState({state: "error", msg: "Invalid file"}); return; }

            // Check types
            let acceptedType : boolean = false;
            restrictions.acceptedTypes.forEach((type) => {
                if (file.type.split("/")[1] === type) acceptedType = true;
            })
            if (!acceptedType) { setUploadState({state: "error", msg: "Invalid file type"}); return; }

            // Check file size
            if (file.size > restrictions.maxSize) { setUploadState({state: "error", msg: "File too large"}); return; }

            reader.onload = () => {
                const binaryStr = reader.result;

                // console.log("Binary string: ", binaryStr);
                // console.log(file.name)
                // console.log(file.size)
                // console.log(file.type)
                // console.log(new Date(file.lastModified))

                setImg({ src: binaryStr, type: file.type, size: file.size, name: file.name })
                setUploadState({ state: "selected", msg: "Image selected" })
            }

            reader.readAsDataURL(file)

        })
        
    }, [])

    if (uploadState.state !== "locked") { return ( <Dropzone 
                onDrop={onDrop} 
                onDragEnter={() => setUploadState({state: "dragging", msg: ""}) }
                onDragLeave={() =>  setUploadState({state: null, msg: ""}) }
                onDropRejected={() => setUploadState({state: "error", msg: ""}) }
                onFileDialogCancel={() => setUploadState({state: "error", msg: "Upload canceled"}) }
                onFileDialogOpen={() =>  setUploadState({state: "loading", msg: "Selecting file"}) }
            >
        
            {({getRootProps, getInputProps}) => (

                <section className={`${customizations?.className && customizations.className}`} >
                    <div className={`flex flex-col items-center justify-center cursor-pointer h-[300px] p-5 ${uploadState.state === "dragging" ? "bg-white/10" : `${uploadState.state === "error" ? "bg-red-400/10" : `${uploadState.state === "loading" ? "bg-white/5 border-dashed border-2 border-white/20" : "bg-white/5"}`}`} rounded-xl relative`} {...getRootProps()}>

                        <div className={`${uploadState.state === "dragging" ? "scale-110" : ""} transition-all duration-200 ease-in-out flex flex-col items-center text-center`}>


                            <input {...getInputProps()}/>

                            {/* Image preview */}
                            {img && uploadState.state === "selected" ? (
                                <img src={img.src} alt={`${img}`} className="w-[200px] h-[200px] object-contain bg-secondary-bg rounded-xl" />
                            ) : (
                                <FaImage className={`text-[100px] ${uploadState.state === "error" ? `text-red-500/60 ${styles.error}` : "text-white/20"}`} />
                            )}

                            {/* Bottom text */}
                            {uploadState.state === null && customizations?.uploadText !== null && <p className={`mt-1 font-semibold text-white/30`}> {customizations?.uploadText ? customizations.uploadText : "Upload image"} </p> }

                            {(uploadState.state === "selected" && img) && <p className='mt-2 mb-[2px] text-[16px]'> {img.name} </p>}

                            {(uploadState.state === "selected" && img) && <p className='text-sm grey'> Simply drag/select a new image to replace this </p>}
                            {uploadState.state === "error" && <p className="mt-1 text-red-500/80 font-semibold"> {uploadState.msg} </p> }
                            {uploadState.state === "loading" && <p className="mt-1 text-white/50 font-semibold"> {uploadState.msg} </p> }

                        </div>

                    </div>
                </section>

            )}

        </Dropzone> ) } else return ( <div >

                <section className={`${customizations?.className && customizations?.className}`} >
                    <div className={`flex flex-col items-center justify-center cursor-pointer h-[300px] p-5 bg-white/5 rounded-xl`} >

                        <div className={`transition-all duration-200 ease-in-out flex flex-col items-center text-center`}>
                            <FaUpload className={`text-[100px] text-white/60`}/>
                            <p className="mt-2 font-semibold text-white/70"> Uploading image </p>
                        </div>

                    </div>
                </section>

        </div> ) 
}