"use client"
import capitalize from "@/utils/capitalize";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";

// Types
import { User } from "@/types/auth";
import { RootState } from "@/app/redux/store";

export default function CreateExperiencePage() {

    const router = useRouter()
    const user = useSelector((state: RootState) => state.user)

    const [title, setTitle] = useState<string>(`${capitalize(user.firstName)} ${capitalize(user.lastName)}'s Experience`)
    const [description, setDescription] = useState<string>("")
    const [type, setType] = useState<null | "gallery" | "timeline">(null)
    const [visibility, setVisibility] = useState<"public" | "private">("public")

    useEffect(() => {
        setTitle(`${capitalize(user.firstName)} ${capitalize(user.lastName)}'s Experience`)
    }, [user])

    return <div className='full-page'>

        <div className="wrapper py-8">
            <form action="" className="container max-w-[700px_!important] flex flex-col">

                <div className="border-b-[1px] border-b-white/10 mb-4 pb-4">
                    <h3 className='font-bold mb-[2px]'> Create Experience List </h3>
                    <p className="grey italics"> Dedicated experience lists allows you to segment your experience into multiple sections. Learn more how this works <Link href="" className="text-blue-500 underline"> here</Link>. </p>
                </div>
                
                <label className="mb-1 font-semibold" htmlFor="title"> List Title <span className='text-red-500'>*</span> </label>
                <input 
                    className="max-w-[300px]"
                    type="text" 
                    name="title" 
                    placeholder={`${capitalize(user.firstName)} ${capitalize(user.lastName)}'s Experience`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label className="mb-1 mt-3 font-semibold"> Description <span className='text-red-500'>*</span> </label>
                <textarea 
                    className="max-w-[550px] max-h-[200px]"
                    name="title" 
                    placeholder={"A good description on what this experience list is"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label className="mb-1 mt-3 font-semibold" htmlFor="type"> Type  <span className='text-red-500'>*</span>  </label>
                <div className="flex">

                    <button onClick={() => setType(type === "gallery" ? null : "gallery")} className={`button widget ${type === "gallery" && "active"} flex flex-col items-center justify-center mr-3`} type='button'>
                        <p className='mb-2'> Gallery </p>
                        <img width={130} src="/images/icons/experience_gallery.svg" alt="" />
                    </button>

                    <button onClick={() => setType(type === "timeline" ? null : "timeline")} className={`button widget ${type === "timeline" && "active"} flex flex-col items-center justify-center`} type='button'>
                        <p className='mb-2'> Timeline </p>
                        <img width={130} src="/images/icons/experience_timeline.svg" alt="" />
                    </button>

                </div>

                <label className="mb-1 mt-3 font-semibold" htmlFor="visibility"> Visibility  <span className='text-red-500'>*</span>  </label>
                <button onClick={() => setVisibility("public" )} type="button" className="cursor-pointer flex items-center gap-2">
                    <div onClick={() => setVisibility("public" )} className={`${visibility === "public" && "active"} button secondary grey`}> Public </div>
                    <div className="grey"> Everyone will be able to view and share your list </div>
                </button>
                <button onClick={() => setVisibility("private" )} type="button" className="cursor-pointer flex mt-1 items-center gap-2">
                    <div onClick={() => setVisibility("private")} className={`${visibility === "private" && "active"} button secondary grey`}> Private </div>
                    <div className="grey"> No one will be able to view your list </div>
                </button>

                {/* <div className="flex">
                    <input type="checkbox" />
                    <label htmlFor=""> I agree to the <Link className='text-blue-500 underline' href='/'>Terms and Conditions</Link>. </label>
                </div> */}

                <div className="bottom border-t-[1px] border-t-white/10 mt-6 pt-4"> 
                    <p className="grey italics mb-2"> You can change all these values later in your user settings </p>
                    <div className="flex items-center">
                        <button className="button red" type='submit'> Create List </button>
                        <button className="grey ml-2" type='button'> Cancel </button>
                    </div>
                </div>

            </form>
        </div>

    </div>
}