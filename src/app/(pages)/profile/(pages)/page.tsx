"use client"
import Tag from '@/app/components/Tags/Tag'
import Link from 'next/link'
import { useSelector } from 'react-redux';

// Styles
import styles from "./user.module.css"

// Icons
import { IoIosWarning } from "react-icons/io";

// Types
import { User } from '@/types/auth'
import { RootState } from '@/app/redux/store';

export default function UserPage() {

    const user = useSelector((state: RootState) => state.user);

    const tagLabels = user.tags.filter((tag) => tag?.type === "label");
    const tagServices = user.tags.filter((tag) => tag?.type === "service");
    const tagSkills = user.tags.filter((tag) => tag?.type === "skill");  

    return ( <div>

        home page
    
    </div> )
}