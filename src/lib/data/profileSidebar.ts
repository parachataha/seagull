import { BookOpen, Calendar, Newspaper, PenBox, Search, Settings, Wallpaper, type LucideIcon } from "lucide-react"

export const sidebarItems : { title: string, url: string, icon: LucideIcon, disabled?: boolean }[] = [
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
        title: "Blogs",
        url: "/profile/blogs",
        icon: Newspaper,
    },
    {
        title: "Projects",
        url: "/profile/projects",
        icon: Wallpaper,
        disabled: true
    },
    {
        title: "Qualifications",
        url: "#",
        icon: Calendar,
        disabled: true
    },
    {
        title: "Freelancing",
        url: "#",
        icon: Search,
        disabled: true
    },
    {
        title: "Teams",
        url: "#",
        icon: Settings,
        disabled: true
    },
]