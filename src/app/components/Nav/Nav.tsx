// Styles
import styles from "./Nav.module.css"

export default function Nav() {

    return ( <nav className='wrapper'>
        <div className={`container flex justify-between items-center pt-6`}>

            <div className="left">
                <p className={styles.seagull}>Seagull</p>
                {/* Search bar */}
            </div>

            <div className="right">
                
                <ul className='flex gap-3'>
                    <li> Jobs </li>
                    <li> Users </li>
                    <li> Communities </li>
                </ul>

            </div>

        </div>
    </nav> )

}