import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { SecondaryNavItems } from "../_menus/secondaryNavMenu";

export function SecondaryNav() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden ">
      {/* <SidebarGroupLabel>Quick Actions</SidebarGroupLabel> */}
      <SidebarMenu>
        {SecondaryNavItems.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link href={item.url} prefetch={false}>
                <item.icon />
                <span className="font-semibold">{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
