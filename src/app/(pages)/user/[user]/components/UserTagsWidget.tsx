import Tag from "@/app/components/Tags/Tag";

// Type
import { User } from "@/types/auth";
import { UserTag } from "@/types/user_tag";

interface Props {
    services: UserTag[] | [],
    skills: UserTag[] | [],
    about: boolean,
}

export default function UserTagsWidget( {services, skills, about} : Props ) {

    if (services.length || skills.length) return ( <div className="widget flex flex-col justify-between">

        <div>
            {services.length > 0 && <>
                <h3 className="subtitle grey mb-1"> Services </h3>
                <div className="flex flex-wrap gap-2">
                    {services.map(tag => {
                        return <Tag key={tag.id}> {tag.value} </Tag>
                    })}
                </div>
            </>}

            {skills.length > 0 && <>
                <h3 className="subtitle grey mb-1 mt-3"> Skills </h3>
                <div className="flex flex-wrap gap-2">
                    {skills.map(tag => {
                        return <Tag key={tag.id}> {tag.value} </Tag>
                    })}
                </div>
            </>}
        </div>

        {about && <a className='text-sm grey mt-2 underline cursor-pointer'>Learn more</a>}

    </div> )
    
}