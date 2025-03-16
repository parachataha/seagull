import { Organization } from "@/types/organization/organization"
import Logo from "./Logo/Logo"

interface Props { 
    organization: Organization,
    className?: string
}

export default function TopWidget( {organization, className} : Props ) {

    return ( <div className={`widget ${className && className}`}>

        <div className="flex gap-4 items-center">
            <Logo logo={organization.logo_id} logo_url={organization.logo_url} size={70} />
            <div>
                <h3 className="text-xl font-semibold"> {organization.name} </h3>
                {organization.about && <p> {organization.about} </p>}
            </div>
        </div>

    </div> )
}