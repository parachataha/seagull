"use client"
import followUser from "@/lib/auth/connections/followUser";
import Link from "next/link";

// Redux
import { useSelector } from "react-redux"
import { updateUser } from "@/app/redux/slices/userSlice";

// Types
import { RootState } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import unfollowUser from "@/lib/auth/connections/unfollowUser";

interface Props {
    followingId: number | null
}

export default function FollowButton( {followingId} : Props ) {

    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch()

    async function handleFollow() {

        if (!followingId) { return; }
        if (followingId === user.id) { return; }

        // Ensure user is not already following them
        if (user.followed.filter(followed => followed.followed_id == followingId).length > 0)  {
            return;
        }

        const result = await followUser(followingId)

        if (!result.success) {
            return;    
        }

        const newFollowedList = [...user.followed, {
            follower: user.id,
            followed_id: followingId,
            id: followingId, 
            followed_first_name: "", 
            followed_last_name: "", 
            followed_slug: "",
            followed_avatar: 1,
            followed_avatar_url: "",
            created_at: new Date().toISOString(),
        }]

        dispatch(updateUser( { followed: newFollowedList } ))

    }

    async function handleUnfollow() {

        if (!followingId) { return; }
        if (followingId === user.id) { return; }

        // Ensure user is already following them
        if (user.followed.filter(following => following.followed_id === followingId).length <= 0) {
            return;
        }

        const result = await unfollowUser(followingId)

        if (!result.success) {
            return;    
        }

        const newFollowedList = []

        dispatch(updateUser( { followed: [] } ))

    }

    if (user.id !== followingId) return ( <> 

        {!user.followed.filter((follower) => follower.followed_id === followingId).length ? 
            <button onClick={handleFollow} className='button white pill'> Follow </button> 
        :
            <button onClick={handleUnfollow} className='button red border pill'> Unfollow </button> 
        } 

    </> ) 
    else return ( <Link href="/profile" className='button blue'> Edit </Link> )

}