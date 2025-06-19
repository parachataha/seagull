import Link from "next/link";
import Search from "./Search";
import UserWidget from "./UserWidget";

export default function Nav() {

    return ( <nav className='wrapper border-b-2 border-b-secondary'>

        <div className="container max-w-[1200px]  flex justify-between items-center">

            <div className="left flex gap-3 items-center py-5 ">
                <h1 className="text-xl font-semibold">Seagull</h1>
                <Link href="">Teams</Link>
                <Link href="">Organizations</Link>
            </div>

            <Search/>

            <UserWidget/>

        </div>

    </nav> )

}