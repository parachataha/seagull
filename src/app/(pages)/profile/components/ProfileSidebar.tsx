"use client"
 
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from "@/components/ui/sidebar";
import { sidebarItems } from "@/lib/data/profileSidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileSidebar() {

  const pathname = usePathname()

  return ( 

    <Sidebar mobileTitle="Your Profile" collapsible="icon" className="absolute" variant="floating" side="left">

      <SidebarContent>
    
        <SidebarMenu className="mt-4">

          <SidebarGroup>
            {/* <SidebarGroupLabel> Navigation </SidebarGroupLabel> */}
            <div className="flex flex-col gap-1">
              {/* SIDEBAR ITEMS */}
              {sidebarItems.map(item => {
                return ( 
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton variant="default" className={`${pathname === item.url && "bg-card hover:bg-card"}`}>
                      <Link href={item.url} >
                        <div className="flex items-center gap-2 whitespace-nowrap break-keep ">
                          <item.icon width={20} className="pr-0.5" />
                          {item.title}
                        </div>
                      </Link> 
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}

            </div>
          </SidebarGroup>

        </SidebarMenu>

      </SidebarContent>

    </Sidebar>
  );
}