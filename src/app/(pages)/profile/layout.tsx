import ProfileSidebar from "@/app/components/Navigation/ProfileSidebar"

interface PropTypes {
    children?: React.ReactNode
}

export default function ProfileLayout( {children} : PropTypes ) {


    return ( <div className='wrapper'>

        <div className='container grid grid-cols-[20%_80%]'>
            <ProfileSidebar />
            
        </div>


    </div> )
}