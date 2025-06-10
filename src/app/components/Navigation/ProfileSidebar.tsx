import Link from "next/link"


interface PropTypes {
    children?: React.ReactNode
}

export default function ProfileSidebar() {


    return ( <div className='my-5 min-h-[95vh] flex flex-col gap-2 border-r-2 border-r-secondary'>

        <ul className='flex flex-col gap-2'>
            
            <p className="text-grey mb-[-5px]"> Public </p>
            <li> <Link href='/profile/'> Profile </Link> </li>

        </ul>

        <ul className='flex flex-col gap-2'>
            
            <p className="text-grey mb-[-5px]"> Settings </p>
            <li> <Link href='/profile/'> Sessions </Link> </li>

        </ul>

    </div> )
}