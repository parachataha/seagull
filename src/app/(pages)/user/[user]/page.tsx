import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import getUser from '@/lib/user/getUser'
import capitalize from '@/utils/capitalize'

// Styles
import styles from "./user.module.css"

// Types
import { User } from '@/types/auth'
import Tag from '@/app/components/Tags/Tag'

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

    return ( <div className='wrapper'>

        <header className={`container flex justify-between ${styles.header}`}>

            <div className="left">
                <h4 className={styles.user}>Creator</h4>
                <h1 className='capitalize'>{user.firstName} <br/> {user.lastName}</h1>

                {user.tags?.length == 0 ? 
                    <div className={styles.newHereLabel}> I'm new here! </div>
                :
                    <div className='mt-1 flex flex-wrap gap-2'>
                        {user.tags?.map((tag) => {
                            if (tag.type === "label") return <Tag data={tag}/>
                        })}
                    </div>
                }

            </div>

            <div className="right">

                <div className="flex">
                    <p className="followers font-medium mr-2">122 followers</p>
                    <p className="followers font-medium">32 following</p>
                </div>


                
            </div>

        </header>
    
    </div> )
}