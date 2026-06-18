import React from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar */}
      <AdminNavbar />

      {/* Sidebar + Content */}
      <div className="flex flex-1">

        {/* Sidebar */}
        <AdminSidebar />

        {/* Right Side */}
        <div className="flex-1 h-[calc(100vh-64px)] overflow-y-auto px-6 md:px-10 py-8">
          <Outlet />
        </div>

      </div>

    </div>
  )
}

export default Layout