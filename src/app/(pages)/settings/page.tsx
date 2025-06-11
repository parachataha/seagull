"use client"
import "../../components/Tag/Tag.css"
import { RootState } from "@/app/redux/store";
import { User_Tag } from "@/generated/prisma";

// 
import Avatar from "@/app/components/User/Avatar/Avatar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Widget from "@/app/components/UI/Widget/Widget";
import { FaX } from "react-icons/fa6";

interface PropTypes {
    className?: string
}

export default  function ProfilePage() {

    const user = useSelector((state: RootState) => state.user)

    // Basic details
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")

    useEffect(() => {
        setFirstName(user.firstName)
        setLastName(user.lastName)
    }, [user])

    return ( <div className='flex flex-col gap-7'> 

        <div>
            <h3 className='font-semibold text-grey mb-2'> Basic Details </h3>
            <div className="flex gap-5">

                <div className='flex flex-col'>
                    <label htmlFor="" className='pb-2'>Avatar</label>
                    <Widget className='!rounded-xl'>
                        <Avatar customization={{ size: 200 }}/>
                    </Widget>
                </div>
            
                <div className="flex flex-col gap-5">
                    {/* FIRST & LAST NAME */}
                    <div className="flex gap-2">
                        <div className='flex flex-col'>
                            <label htmlFor="firstName" className='mb-1'>First name</label>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={user.firstName}/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="firstName" className='mb-1'>Last name</label>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={user.lastName}/>
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div className='flex flex-col'>
                        <label htmlFor="firstName" className='mb-1'>Email <span className="text-grey pr-3">(This is hidden from users)</span> </label>
                        <input type="text" value={""} onChange={(e) => e.target.value = ""} placeholder={`${user.email.split("")[0]}*******@${user.email.split("@")[1]}`} />
                    </div>

                    {/* PASSWORD */}
                    <div className='flex flex-col'>
                        <label htmlFor="firstName">Request Password Reset</label>
                        <a href="/" className='text-blue-500 underline mb-1'>Send email</a>
                    </div>

                </div>  

            </div>
        </div>

        <div>
            <h3 className='font-semibold text-grey mb-2'> Profile Customization </h3>
            <ProfileLabelWidget />
            <ProfileTagsWidget className='mt-4'/>
        </div>

    </div> );

}

// LABEL CUSTOMIZATION
function ProfileLabelWidget() {

    const user = useSelector((state: RootState) => state.user)

    // Labels
    const [label, setLabel] = useState<string>("")
    const [labelWizard, setLabelWizard] = useState<string[]>([])

    useEffect(() => {
        setLabel(user.label ? user.label : "")
    }, [user])

    function handleAddLabelWizard(value : string) {
    setLabelWizard([...labelWizard, value])
    labelWizard.forEach((item : string, index : number) => {
        if (labelWizard.length == 1) setLabel(`${value}`)
        else setLabel(`${label} and ${value}`)
    })
    }

    function handleLabelChange(e : any) {
        setLabel(e.target.value)
        setLabelWizard([])
    }

    return ( 
    <Widget className='flex flex-col gap-4'>

        <div className="flex flex-col gap-2">
            <label htmlFor="label" className="font-semibold"> Label </label> 
            <div className='relative w-full'>
                <input className='!bg-tertiary  w-full' value={label} onChange={handleLabelChange} name='label' type="text" placeholder={user.label ? "What is your job title?" : `${user.label}`}/>
                <button onClick={() => setLabel("")} className="absolute text-xs right-3 top-[50%] translate-y-[-50%]"> 
                    <FaX />
                </button>
            </div>
            <div className="flex gap-1">
                <button onClick={() => handleAddLabelWizard("Designer")} className='bg-white/10 hover:bg-white/20 text-sm px-2 py-1 rounded-full'> Designer </button>
                <button onClick={() => handleAddLabelWizard("Developer")} className='bg-white/10 hover:bg-white/20 text-sm px-2 py-1 rounded-full'> Developer </button>
                <button onClick={() => handleAddLabelWizard("Teacher")} className='bg-white/10 hover:bg-white/20 text-sm px-2 py-1 rounded-full'> Teacher </button>
                <button onClick={() => handleAddLabelWizard("Footballer")} className='bg-white/10 hover:bg-white/20 text-sm px-2 py-1 rounded-full'> Footballer </button>
                <button onClick={() => handleAddLabelWizard("Project Manager")} className='bg-white/10 hover:bg-white/20 text-sm px-2 py-1 rounded-full'> Project manager </button>
                <button onClick={() => handleAddLabelWizard("PE Coach and Mentor")} className='bg-white/10 hover:bg-white/20 text-sm px-2 py-1 rounded-full'> PE Coach and Mentor </button>
            </div>
        </div>

        <div className="flex items-center gap-2">
            <button className="rounded-lg px-2 py-1 bg-blue-500"> Save </button>
            <button className='text-grey' onClick={() => setLabel(user.label ?? "")}> Reset </button>
        </div>

    </Widget> 
    )
}

// TAGS CUSTOMIZATION
function ProfileTagsWidget( {className} : PropTypes ) {

    const user = useSelector((state: RootState) => state.user)
    const [tag, setTag] = useState<string>("")

    const [currentTags, setCurrentTags] = useState<User_Tag[]>([])

    useEffect(() => {
        setCurrentTags(user.tags ?? [])
        console.log(user.tags);
    }, [user])

    return ( 
    <Widget className={`flex flex-col gap-2 ${className}`}>

        <div className="flex flex-col">
            <label htmlFor="label" className="font-semibold !pb-0"> Tags </label> 
            <p className="text-grey"> These are what tells users what you serve and what skills you have </p>
        </div>

        <div className='flex flex-col gap-2'> 
            <label htmlFor="" className="font-semibold"> Services </label>
            <div className="flex bg-tertiary p-2 rounded-xl">
                <input value={tag} onChange={(e) => setTag(e.target.value)} type="text" placeholder="New service" className={`Tag ${tag} max-w-[100px] text-center`}/>
            </div>
        </div>

        <div className='flex flex-col gap-2'> 
            <label htmlFor="" className="font-semibold"> Skills </label> 
        </div>


    </Widget> 
    )
}