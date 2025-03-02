import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import UserHeader from "../components/UserHeader"
import getUser from '@/lib/user/getUser'
import capitalize from '@/utils/capitalize'

// Types
import { User } from '@/types/auth'

type PropsMetadata = {
    params: Promise<{ user: string }>
}

export async function generateMetadata( {params} : PropsMetadata ) : Promise<Metadata> {

    const slug = (await params).user
    const result = await getUser(slug)

    if (!result || !result.success || !result.user) {
        notFound()
    }

    let title = `${capitalize(result.user.firstName)} ${capitalize(result.user.lastName)}`

    return { 
        title: title
    }

}

type PropsComponent = {
    params: Promise<{ user: string, page?: string }>,
    children: React.ReactNode
}

export default async function UserLayout({params, children} : PropsComponent ) {

    const slug = (await params).user;

    const result = await getUser(slug)
    if (!result || !result.success || !result.user) {
        notFound();
    }
    const user : User = result.user;

    return ( <div className='wrapper'>

        <UserHeader user={user}/>
        
        {children}
        <div className='pb-10'></div>

    </div> )
}