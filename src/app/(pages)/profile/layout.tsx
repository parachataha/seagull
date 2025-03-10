import Tabs from '@/app/components/Tabs/Tabs';
import ProfileTop from './components/ProfileTop'

// Styles
import styles from "./user.module.css"

// Types
import { Metadata } from 'next'

// Metadata
export const metadata: Metadata = {
  title: "Profile",
  description: "Welcome to Seagull",
};

type PropsComponent = {
    children: React.ReactNode
}

export default function UserLayout({children} : PropsComponent ) {

    return ( <div className='wrapper relative'>
        
        <ProfileTop/>

        <div className={`container ${styles.container} mb-[30px]`}>

            <Tabs className='pb-8' links={[ 
                { href: `/profile/experience`, text: "Experience" },
                { href: `/profile/blogs`, text: "Blogs" },
                { href: `/profile/organizations`, text: "Organizations" },
                { href: `/profile/teams`, text: "Teams" }
            ]}/>

            {children}

        </div>

    </div> )
}