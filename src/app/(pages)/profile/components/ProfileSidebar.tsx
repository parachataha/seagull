"use client"
// Hooks 
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

// Components
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { sidebarItems } from "@/lib/data/profileSidebar";
import Link from "next/link";

// Types
import { RootState } from "@/app/redux/store";
import Image from "next/image";

export default function ProfileSidebar() {

  const pathname = usePathname()
  const user = useSelector((state : RootState) => state.user);

  return ( 
    <div className="flex flex-col justify-between !h-[75vh] min-w-46">

      <SidebarMenu>
        <SidebarGroup>
          {/* <SidebarGroupLabel> Navigation </SidebarGroupLabel> */}
          <div className="flex flex-col gap-1">

            <h2 className="text-sm font-medium mb-3"> Your profile </h2>
            {/* SIDEBAR ITEMS */}
            {sidebarItems.map(item => {
              return ( 
                <Link href={item.url} key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton disabled={item?.disabled} variant="default" className={`!px-3 ${pathname === item.url && "bg-card hover:bg-card"}`}>
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