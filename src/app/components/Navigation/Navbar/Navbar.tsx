import Link from "next/link";
import UserToast from "../../User/UserToast/UserToast";
import UserInfo from "./UserInfo";

export default function Navbar() {
    
    return ( <nav className="wrapper !min-h-auto border-b-2 border-b-secondary"> 

    <div className="flex justify-between items-center container !max-w-[1200px] pt-5 pb-4 relative">

        <div className="left flex items-center gap-3">
            <Link href='/' className="text-xl font-bold mr-2">Seagull</Link>
            <Link href='/'>Teams</Link>
            <Link href='/'>Organizations</Link>
        </div>

        <div className="flex items-center">
            <input className='bg-tertiary !rounded-full !px-4 w-60' placeholder="Seagull Search"/>
        </div>

        <div className="right border-l-2 border-l-secondary pl-5">
            <UserInfo/>
        </div>

    </div>

    </nav> )
}