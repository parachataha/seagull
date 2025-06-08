// 
import getCurrentSession from "@/app/redux/getCurrentSession";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

export default async function ProfilePage() {

    const currentUser = await getCurrentSession()

    if (currentUser.success) redirect(`/user/${currentUser.user?.username}`)
    else redirect(`/login`)
    
    // Just redirecting to user/[user] page for now
    return null;

}