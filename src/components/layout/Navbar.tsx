import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import NavUserActions from "../cards/user/NavUserActions"

export default function Navbar() {
  return (
    <div className="flex gap-4 items-center justify-between">

      <div className="flex gap-4 items-center">
        <Link href="/">
          <h1 className="text-lg font-semibold"> Seagull </h1>
        </Link>

        {/* <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>About</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Seagull</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}
      </div>

      <div className="flex gap-2">
        <NavUserActions/>
      </div>

    </div>
  )
}

