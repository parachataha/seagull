import * as React from "react"
import Link from "next/link"

import { Column, MegaMenu, UserMenu, Option, Icon } from "@once-ui-system/core"

export default function Navbar() {
  return (
    <div className="flex gap-4 items-center justify-between">

      <div className="flex gap-4 items-center">
        <Link href="/">
          <h1 className="text-lg font-semibold"> Seagull </h1>
        </Link>

        <MegaMenu
          className="z-10"
          menuGroups={[
            {
              id: "products",
              label: "Products",
              suffixIcon: "chevronDown",
              sections: [
                {
                  title: "Featured",
                  links: [
                    {
                      label: "Analytics",
                      href: "/analytics",
                      icon: "HiOutlineDocumentChartBar",
                      description: "Get insights into your data",
                    },
                    {
                      label: "Security",
                      href: "/security",
                      icon: "HiOutlineShieldCheck",
                      description: "Protect your assets",
                    },
                  ],
                },
                {
                  title: "Tools",
                  links: [
                    {
                      label: "Dashboard",
                      href: "/dashboard",
                      icon: "HiOutlineSquares2X2",
                      description: "Monitor your metrics",
                    },
                    {
                      label: "Settings",
                      href: "/settings",
                      icon: "HiCog8Tooth",
                      description: "Configure your preferences",
                    },
                  ],
                },
              ],
            },
            {
              id: "solutions",
              label: "Solutions",
              suffixIcon: "chevronDown",
              sections: [
                {
                  title: "By industry",
                  links: [
                    {
                      label: "Enterprise",
                      href: "/enterprise",
                      icon: "cube",
                      description: "Solutions for large organizations",
                    },
                    {
                      label: "Startups",
                      href: "/startups",
                      icon: "rocket",
                      description: "Perfect for growing companies",
                    },
                  ],
                },
                {
                  title: "By team",
                  links: [
                    {
                      label: "Developers",
                      href: "/developers",
                      icon: "code",
                      description: "Tools and APIs",
                    },
                    {
                      label: "Design teams",
                      href: "/design",
                      icon: "sparkle",
                      description: "Creative solutions",
                    },
                  ],
                },
              ],
            },
            {
              id: "resources",
              label: "Resources",
              suffixIcon: "chevronDown",
              sections: [
                {
                  title: "Documentation",
                  links: [
                    {
                      label: "Guides",
                      href: "/guides",
                      icon: "book",
                      description: "Learn how to use our platform",
                    },
                    {
                      label: "API reference",
                      href: "/api",
                      icon: "code",
                      description: "Technical documentation",
                    },
                  ],
                },
                {
                  title: "Support",
                  links: [
                    {
                      label: "Help center",
                      href: "/help",
                      icon: "infoCircle",
                      description: "Get your questions answered",
                    },
                    {
                      label: "Community",
                      href: "/community",
                      icon: "people",
                      description: "Connect with other users",
                    },
                  ],
                },
              ],
            },
            {
              id: "company",
              label: "Company",
              suffixIcon: "chevronDown",
              sections: [
                {
                  title: "About",
                  links: [
                    {
                      label: "Our story",
                      href: "/about",
                      icon: "book",
                      description: "Learn about our journey",
                    },
                    {
                      label: "Careers",
                      href: "/careers",
                      icon: "rocket",
                      description: "Join our team",
                    },
                  ],
                },
                {
                  title: "Connect",
                  links: [
                    {
                      label: "Blog",
                      href: "/blog",
                      icon: "document",
                      description: "Latest updates and news",
                    },
                    {
                      label: "Contact",
                      href: "/contact",
                      icon: "email",
                      description: "Get in touch with us",
                    },
                  ],
                },
              ],
            },
          ]}
        />
      </div>

      <UserMenu
        name="Lorant One"
        subline="Design Engineer"
        placement="right-start"
        avatarProps={{ src: "/images/assets/default-avatar-cyan.svg" }}
        dropdown={
          <Column gap="4" padding="4" minWidth={10}>
            <Link href="/profile">
              <Option value="" fillWidth hasPrefix={<Icon size="xs" onBackground="neutral-weak" name="settings" />} label="Settings" />
            </Link>
            <Option value="" fillWidth hasPrefix={<Icon size="xs" onBackground="neutral-weak" name="logout" />} label="Log out" />
          </Column>
        }
      />


    </div>
  )
}

