// Types
import { Metadata } from 'next'
import ProfileHeader from './components/ProfileHeader'

// Metadata
export const metadata: Metadata = {
  title: "Profile",
  description: "Welcome to Seagull",
};

type PropsComponent = {
    children: React.ReactNode
}

export default function UserLayout({children} : PropsComponent ) {

    return ( <div className='wrapper'>

        <ProfileHeader/>

        {children}

    </div> )
}