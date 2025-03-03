import Tag from "@/app/components/Tags/Tag";
import Tags from "@/app/components/Tags/Tags";

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
                <Tags tags={services}/>
            </>}

            {skills.length > 0 && <>
                <h3 className="subtitle grey mb-1 mt-3"> Skills </h3>
                <Tags tags={skills}/>
            </>}
        </div>

        {about && <a className='text-sm grey mt-2 underline cursor-pointer'>Learn more</a>}

    </div> )
    
}