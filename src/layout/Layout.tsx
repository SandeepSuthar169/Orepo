import { Outlet } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { useState } from "react"


export const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export const SidebarLayout = () => {

  const [isOpen, setIsOpen] = useState<boolean>(true)

  return (
    <div>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}   />
      <Outlet />
    </div>
  )
}

