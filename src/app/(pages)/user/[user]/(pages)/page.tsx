import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import getUser from '@/lib/user/getUser'
import capitalize from '@/utils/capitalize'

// Styles
import styles from "./user.module.css"

// Icons
import { IoIosWarning } from "react-icons/io";

// Types
import { User } from '@/types/auth'
import Tag from '@/app/components/Tags/Tag'
import Link from 'next/link'

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

    const slug = (await params).user;

    const result = await getUser(slug)
    if (!result || !result.success || !result.user) {
        notFound();
    }
    const user : User = result.user;

    const tagLabels = user.tags.filter((tag) => tag?.type === "label");
    const tagServices = user.tags.filter((tag) => tag?.type === "service");
    const tagSkills = user.tags.filter((tag) => tag?.type === "skill");  

    return ( <div>

        home page
    
    </div> )
}