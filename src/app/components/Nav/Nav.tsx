// Styles
import Link from "next/link"
import styles from "./Nav.module.css"

// Icons
import { FaUser } from "react-icons/fa6";

export default function Nav() {

    return ( <nav className='wrapper'>
        <div className={`container flex justify-between items-center pt-6`}>

            <div className="left">
                <p className={styles.seagull}>Seagull</p>
                {/* Search bar */}
            </div>

            <div className="right">
                
                <ul className='flex gap-3'>
                    <li> <Link href="/"> Jobs </Link> </li>
                    <li> <Link href="/"> Users </Link> </li>
                    <li> <Link href="/"> Communities </Link> </li>
                    <li> <Link href="/settings"> <FaUser className={styles.profileIcon}/> </Link> </li>
                </ul>

            </div>

        </div>
    </nav> )

}