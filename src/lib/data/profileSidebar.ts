import { BookOpen, Calendar, PenBox, Search, Settings, Wallpaper, type LucideIcon } from "lucide-react"

export const sidebarItems : { title: string, url: string, icon: LucideIcon }[] = [
    {
        title: "Profile",
        url: "/profile",
        icon: PenBox,
    },
    {
        title: "Skills",
        url: "/profile/skills",
        icon: BookOpen,
    },
    {
        title: "Qualifications",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Projects",
        url: "#",
        icon: Wallpaper,
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