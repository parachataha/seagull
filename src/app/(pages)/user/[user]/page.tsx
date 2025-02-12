import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import getUser from '@/lib/user/getUser'
import capitalize from '@/app/utils/capitalize'

// Types
import { User } from '@/types/auth'

type Props = {
    params: Promise<{ user: string }>
}

export async function generateMetadata( {params} : Props ) : Promise<Metadata> {

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

export default async function UserPage( {params} : Props ) {

    const slug = (await params).user

    const result = await getUser(slug)
    if (!result || !result.success || !result.user) {
        notFound()
    }
    const user : User = result.user

    return ( <div>

        {user.firstName} {user.lastName}
    
    </div> )
}