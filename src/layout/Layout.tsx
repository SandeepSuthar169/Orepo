import { Outlet } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"


export const Layout = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  )
}

export const SidebarLayout = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  )
}

