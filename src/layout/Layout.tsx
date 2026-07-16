import { Outlet } from "react-router-dom"
import Navbar from "@/components/Navbar"
// import Sidebar from "@/components/Sidebar"
// import { useState } from "react"


export const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}



