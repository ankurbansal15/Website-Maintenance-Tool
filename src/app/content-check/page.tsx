"use client";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import ContactCheck from "@/components/content-check";

export default function Conponent() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Activity */}
        <ContactCheck/>
      </div>
    </div>
  );
}
