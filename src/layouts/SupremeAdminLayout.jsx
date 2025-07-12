import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/SupremeSidebar";
import Header from "../components/Header";

const SupremeAdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 overflow-hidden">
      <aside className="w-16 sm:w-64 flex-shrink-0 bg-white border-r border-gray-200 shadow-sm z-10">
        <Sidebar />
      </aside>
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="w-full bg-white z-10">
          <Header />
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50 pt-12 sm:pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SupremeAdminLayout;