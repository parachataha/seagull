"use client"
import styles from './TopLoadingBar.module.css'

import { useSelector } from "react-redux"
import { RootState } from '@/app/redux/store'

export default function TopLoadingBar() {

    const ui = useSelector((state: RootState) => state.ui)

    if (ui.loading) return <div className={styles.loading}> </div> 

}