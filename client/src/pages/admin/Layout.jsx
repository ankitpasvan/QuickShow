import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* TOP NAVBAR */}
      <AdminNavbar />

      {/* MAIN AREA (THIS IS THE FIX) */}
      <div className="flex flex-1">

        {/* LEFT SIDEBAR */}
        <AdminSidebar />

        {/* RIGHT CONTENT */}
        <div className="flex-1 bg-black/5">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default Layout;