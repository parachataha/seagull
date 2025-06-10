import getUser from "@/api/user/get/getUser";
import Header from "@/app/components/User/Header/Header";
import { User } from "@/generated/prisma";
import { notFound } from "next/navigation";

interface Props {
    params: { username: string },
    children: React.ReactNode
}

export default async function UserLayout( {params, children} : Props ) {

    const username = (await params).username; 

    const result = await getUser(username)
    
    if (!result.success || !result.user) {
        if (result.status === 404) notFound()
        else notFound()
    }

    const user = result.user

    return ( <div className='wrapper'>

        <div className="container h-full">

            <Header user={user}/>

        </div>

    </div> )

}