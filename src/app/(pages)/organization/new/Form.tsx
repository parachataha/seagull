"use client"
import createOrganization from "@/lib/auth/organization/createOrganization"
import { useState } from "react"
import ImageDropzone from "@/app/components/inputs/ImageDropzone/ImageDropzone"

// Redux
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { startLoading, stopLoading } from "@/app/redux/slices/uiSlice"

// Types
import { RootState } from "@/app/redux/store"

export default function Form() {

    const [name, setName] = useState<string>("")
    const [slug, setSlug] = useState<string>("")

    const [logo, setLogo] = useState<{ src: any, type: string, size: number, name: string } | null>(null)
    const [uploadState, setUploadState] = useState<{state: null | "loading" | "error" | "dragging" | "selected" | "locked", msg: string}>({state: null, msg: ""})

    const ui = useSelector((state: RootState) => state.ui)
    const dispatch = useDispatch()
    const [error, setError] = useState<{isError: Boolean, msg: string}>({isError: false, msg: "An error occurred"})

    async function handleSubmit(e : React.FormEvent) {
        e.preventDefault()

        if (ui.loading) { setError({isError: true, msg: "Please wait, loading"}); return; }
 
        setUploadState({state: "locked", msg: "Uploading"})
        dispatch(startLoading())
        
        // Validate form values
        if (!name || name.trim().length < 2) { setError({isError: true, msg: "Please enter a valid organization name"}); dispatch(stopLoading()); return; }
        if (name.length > 99) { setError({isError: true, msg: "Organization name is too long"}); dispatch(stopLoading()); return; }
        if (!slug || slug.trim().length < 2) { setError({isError: true, msg: "Please enter a valid organization slug"}); dispatch(stopLoading()); return; }
        if (slug.trim().length > 99) { setError({isError: true, msg: "Organization slug is too long"}); dispatch(stopLoading()); return; }

        if (logo && logo.size > 5 * 1024 * 1024) { setError({isError: true, msg: "Logo file size too large"}); dispatch(stopLoading()); return; }
        if (logo && logo.name.length > 99) { setError({isError: true, msg: "Logo file name too long"}); dispatch(stopLoading()); return; }

        const result = await createOrganization({ 
            name: name, 
            slug: slug, 
            logo: logo
        })

        console.log(result)
        if (!result) { setError({isError: true, msg: "Could not create organization"}); dispatch(stopLoading()); return; }
        if (!result.success) { setError({isError: true, msg: result.msg}); dispatch(stopLoading()); return; }
        
        dispatch(stopLoading())
    }

    return ( <div> 

        <form onSubmit={handleSubmit} className='flex flex-col my-10 w-full'>

            <label htmlFor="name" className="font-semibold mb-1"> Name <span className='text-red-500'>*</span> </label>
            <input required value={name} onChange={(e) => { setName(e.target.value); setSlug(e.target.value.toLowerCase().trim()); }} type="text" name="name" placeholder="My New Organization"/>

            <label htmlFor="name" className="font-semibold mb-1 mt-5"> Vanity URL <span className='text-red-500'>*</span> </label>
            <div className="flex w-full">
                <div className="bg-secondary-bg border-l-2 border-t-2 border-b-2 border-tertiary-bg rounded-l-lg p-1 px-2"> seagull.com/ </div>
                <input required value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().trim())} type="text" name="name" placeholder="vanity" className="rounded-l-[0px] flex-grow"/>
            </div>

            <label className='font-semibold mt-5 mb-1'>Upload Logo</label>
            <ImageDropzone
                img={logo} 
                setImg={setLogo}
                uploadState={uploadState}
                setUploadState={setUploadState}
                customizations={{
                    uploadText: "Upload logo"
                }}
                restrictions={{
                    acceptedTypes: ["png", "jpg", "jpeg", "gif", "webp", "bmp", "svg", "apng", "ico", "tiff", "avif"],
                    acceptedFormats: ["image"],
                    maxSize: 5 * 1024 * 1024
                }}
                />
            <p className="grey text-[12px] mt-2"> If no logo is uploaded, we'll use a default logo for now </p>

            {error.isError && <p className='text-red-500 font-semibold mt-3'> {error.msg} </p>}

            <button disabled={ui.loading} type="submit" className="button red mt-5"> Create </button>

        </form>

    </div> )
}