import { Calendar, PenBox, Search, Settings, Wallpaper, type LucideIcon } from "lucide-react"

export const sidebarItems : { title: string, url: string, icon: LucideIcon }[] = [
    {
        title: "Edit Details",
        url: "/profile",
        icon: PenBox,
    },
    {
        title: "Projects",
        url: "#",
        icon: Wallpaper,
    },
    {
        title: "Qualifications",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Freelancing",
        url: "#",
        icon: Search,
    },
    {
        title: "Teams",
        url: "#",
        icon: Settings,
    },
]