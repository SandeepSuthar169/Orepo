import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
  import { useNavigate } from "react-router-dom"

  import { Home, FolderGit2, Users } from "lucide-react"
  const navItems = [
    { title: "Home",     url: "/",        icon: Home },
    { title: "Dashboard", url: "/dashboard", icon: FolderGit2 },
    { title: "Users",url: "/user",icon: Users },
  ]

  
  export function AppSidebar() {
    const navigate = useNavigate()
    return (
      <Sidebar>
        <SidebarHeader>
          <span className="text-lg font-bold px-2">Orepo</span>
        </SidebarHeader>
  
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                <SidebarMenuButton onClick={() => navigate(item.url)}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
  
        <SidebarFooter>
          <span className="text-xs text-muted-foreground px-2">v1.0.0</span>
        </SidebarFooter>
      </Sidebar>
    )
  }