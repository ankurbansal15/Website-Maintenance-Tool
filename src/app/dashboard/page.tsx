"use client";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Dashboard from "@/components/dashboard";

export default function Conponent() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main Activity */}
        <Dashboard/>
      </div>
    </div>
  );
}
