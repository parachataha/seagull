"use client"
import React, { useEffect, useState } from "react";
import updateAbout from "@/lib/auth/update/updateAbout";

// Icons
import { FaEdit } from "react-icons/fa";

// Types
import { RootState } from "@/app/redux/store";
import { User } from "@/types/auth";

// Redux
import { updateUser } from "@/app/redux/slices/userSlice";
import { useDispatch } from "react-redux";

interface Props { 
    styles: any,
    setError: any,
    error: { isError: boolean, msg: string },
    user: User
}

export default function About( {styles, setError, error, user} : Props ) {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState<boolean>(false)

    const [isEditing, setIsEditing] = useState(false);
    const [newAbout, setNewAbout] = useState("");

    useEffect(() => {
        setNewAbout(user.about)
    }, [user])

    async function handleUpdateAbout() {
        
        if (loading || error.isError) {
            return;
        }
        
        setError({isError: false, msg: ""})
        setLoading(true)

        if (newAbout.length > 500) {
            setError({isError: true, msg: "Your about text is too long"});
            setIsEditing(false);
            setLoading(false);
            return;
        }
        if (newAbout == user.about) {
            setError({isError: true, msg: "Please change your about text"});
            setIsEditing(false);
            setLoading(false);
            return;
        }

        const result = await updateAbout(newAbout, user.about)

        if (!result.success) {
            setError({isError: true, msg: result.msg});
            setIsEditing(false);
            setLoading(false);
            return;
        }

        dispatch(updateUser( {about: result.data} ));
        setIsEditing(false);
        setLoading(false)
        return;

    }

    return ( 
        <div className="widget">
            <div className="top flex justify-between">
                <h3 className="subtitle grey mb-1"> About </h3>
                {!isEditing && <FaEdit onClick={() => setIsEditing(true)} className={`${styles.editIcon}`}/> }
            </div>
            {isEditing ? <div> 
                
                <div className="relative">
                    <textarea onChange={(e) => setNewAbout(e.target.value)} value={newAbout} placeholder="Start describing yourself" className={`${styles.EditAbout}`} rows={5} maxLength={700}/>
                    <p className={`${styles.maxLengthText}  ${newAbout.length >= 450 && styles.warning} ${newAbout.length > 500 && styles.error}`}> {newAbout.length}/500 </p>
                </div>
                <div className="flex gap-3">
                    <button className='button red mt-1' onClick={handleUpdateAbout} disabled={loading} type='submit'> Update </button>
                    <button className='button grey mt-1' onClick={() => { setIsEditing(false); setNewAbout(user.about) }} disabled={loading} type='button'> Cancel </button>
                </div>

            </div> 
            :
            <> 
                {user.about ? 
                    <p>
                        {user.about.split("\n").map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                        ))}
                </p>                          
                :
                    <button onClick={() => setIsEditing(true)}> Set your about text and tell the world who you are </button>
                } 
            </>}
        </div>
    )
}