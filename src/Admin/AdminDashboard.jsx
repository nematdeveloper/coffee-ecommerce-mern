import React from 'react';
import Sidebar from './SideBar';
import AdminOverall from "./AdminPanel/AdminOverall";
import "./AdminPanel/AdminPanel/styles/admin.css"
const AdminDashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <AdminOverall />
      </main>
    </div>
  );
};

export default AdminDashboard;
