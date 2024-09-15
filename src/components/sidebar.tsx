"use client";

import React from "react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { HomeIcon, LayoutTemplateIcon, ListMusic, ListPlus, Play, Plus, RocketIcon } from "lucide-react";


import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { MdFavorite, MdOutlineExplore } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import { BsGear } from "react-icons/bs";
import { cn } from "@/lib/utils";


export function Sidebar() {
  const [segment] = useSelectedLayoutSegments();

  const sidebarNav = [
    { title: "Home", href: "/dashboard/", icon: HomeIcon },
    { title: "Favorites", href: "/dashboard/favorites", icon: MdFavorite },
    { title: "Explore", href: "/dashboard/explore", icon: MdOutlineExplore },
    { title: "Teams", href: "/dashboard/teams", icon: RiTeamLine },
    { title: "APIs", href: "/dashboard/apis", icon: RocketIcon },
    { title: "Settings", href: "/dashboard/settings", icon: BsGear },
  ];

  return (
    <aside className="fixed left-0 top-14 hidden h-full w-1/5 space-y-2 border-r p-4 animate-in slide-in-from-left-full [animation-duration:500ms] lg:block xl:w-[15%]">
      <h3 className="pl-3 font-heading text-xl drop-shadow-md dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent sm:text-2xl md:text-3xl">
        Discover
      </h3>

      <nav>
        <ul className="space-y-0.5">
          {sidebarNav.slice(0, 6).map(({ title, href, icon: Icon }) => {
            const isActive = href === "/" + (segment ?? "");

            return (
              <li key={title}>
                <NavLink title={title} href={href} isActive={isActive}>
                  <Icon className="mr-2 size-5" />
                  {title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
{/* 
      {!!user && (
        <>
          <h3 className="pl-3 font-heading text-lg drop-shadow-md dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent sm:text-xl md:text-2xl">
            Library
          </h3>

          <nav>
            <ul className="space-y-0.5">
              {sidebarNav.slice(6).map(({ title, href, icon: Icon }) => {
                const isActive = href === "/" + (segment ?? "");

                return (
                  <li key={title}>
                    <NavLink title={title} href={href} isActive={isActive}>
                      <Icon className="mr-2 size-5 shrink-0" />
                      {title}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      )} */}

      <div className="flex items-center justify-between pl-3">
        <h3 className="font-heading text-lg drop-shadow-md dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent sm:text-xl md:text-2xl">
          Playlists
        </h3>

      </div>

      <ScrollArea>
        

        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </aside>
  );
}

const NavLink = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    isActive: boolean;
  }
>(({ href, isActive, className, children, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      href={href!}
      className={cn(
        buttonVariants({ size: "sm", variant: "ghost" }),
        "flex justify-start text-muted-foreground",
        isActive && "bg-secondary font-bold text-secondary-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
});

NavLink.displayName = "NavLink";