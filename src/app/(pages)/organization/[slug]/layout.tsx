import TopWidget from "@/app/components/Organization/TopWidget"
import getOrganization from "@/lib/auth/organization/getOrganization"
import { notFound } from "next/navigation"

type Props = {
    params: Promise<{ slug: string }>,
    children: React.ReactNode
}

export default async function OrganizationLayout( {params, children} : Props ) {

    const slug = (await params).slug

    const organization = await getOrganization(slug)

    console.log(organization)

    if (!organization.success) {
        if (organization.status === 404) notFound()
        console.log("Not successful")
        notFound()
    }

    const data = organization.data

    return ( <div className='wrapper'>

        <div className="container my-7">

            <TopWidget organization={data}/>

        </div>

    </div> )
}