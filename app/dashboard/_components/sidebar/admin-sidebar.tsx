import * as React from "react";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { BottomNav } from "./bottom-nav";
import { PrimaryNav } from "./primary-nav";
import { NavUser } from "./nav-user";
import { SecondaryNav } from "./secondary-nav";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="pt-3">
        <a
          href="/dashboard"
          className="grow flex gap-2"
          aria-label="Go to PDF Sidekick Dashboard"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
            <Image
              src={"/logo.svg"}
              alt="PDF Sidekick Logo"
              width={32}
              height={32}
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">PDF Sidekick</span>
            <span className="truncate text-xs">Talk to your PDFs</span>
          </div>
        </a>
      </SidebarHeader>
      <SidebarContent>
        <PrimaryNav />
        <SecondaryNav />
        <BottomNav className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
