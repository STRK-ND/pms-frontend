import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/StaffSidebar";
import Header from "../components/Header";
import DashboardBody from "../components/DashboardBody"
import Calendar from "../components/Calendar"

const SupremeAdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header */}
        <Header />
        {/* Page Content */}
        
        <main className="flex-1 p-6 pt-16 overflow-auto">
          <Outlet />
          
        </main>
      
      </div>
    </div>
  );
};

export default SupremeAdminLayout;
