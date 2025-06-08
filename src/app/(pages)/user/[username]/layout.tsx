import getUser from "@/api/user/get/getUser";
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

    return ( <div>

        <header>

            

        </header>

    </div> )

}