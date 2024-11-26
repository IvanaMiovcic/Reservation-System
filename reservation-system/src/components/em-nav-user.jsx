import { ChevronsUpDown, LogOut, House } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_ANON,
);

export function NavUser({ user }) {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();

  async function handleLogOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const name = `${user.user_metadata.firstname} ${user.user_metadata.lastname}`;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                  <span className="truncate">
                    {user.user_metadata.account_type === "Manager" ? (
                      <Badge className="text-xs mt-1" variant="destructive">
                        Manager
                      </Badge>
                    ) : (
                      <Badge className="text-xs mt-1" variant="Secondary">
                        Employee
                      </Badge>
                    )}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="/">
              <DropdownMenuItem>
                <House />
                Return to Landing page
              </DropdownMenuItem>
            </Link>
            <div onClick={handleLogOut}>
              <DropdownMenuItem>
                <LogOut />
                Log Out
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
