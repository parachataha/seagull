"use client"
// Hooks 
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

// Components
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { sidebarItems } from "@/lib/data/profileSidebar";
import Link from "next/link";
import VerticalUserLabel from "@/components/cards/user/VerticalUserLabel";

// Types
import { RootState } from "@/app/redux/store";
import UserAvatar from "@/components/images/UserAvatar";
import { Card } from "@once-ui-system/core";

export default function ProfileSidebar() {

  const pathname = usePathname()
  const user = useSelector((state : RootState) => state.user);

  return ( 
    <div className="flex flex-col justify-between !h-[75vh] min-w-46">

      <SidebarMenu className="mt-4">
        <SidebarGroup>
          {/* <SidebarGroupLabel> Navigation </SidebarGroupLabel> */}
          <div className="flex flex-col gap-1">
            {/* SIDEBAR ITEMS */}
            {sidebarItems.map(item => {
              return ( 
                <Link href={item.url} key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton variant="default" className={`!px-3 ${pathname === item.url && "bg-card hover:bg-card"}`}>
                        <div className="flex items-center gap-2 whitespace-nowrap break-keep ">
                          <item.icon width={20} className="pr-0.5" />
                          {item.title}
                        </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link> 
              )
            })}

          </div>
        </SidebarGroup>
      </SidebarMenu>

    </div>
  );
}