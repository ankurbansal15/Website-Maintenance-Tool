"use client";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import SEOAnalysis from "@/components/seo";

export default function Conponent() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main Activity */}
        <SEOAnalysis/>
      </div>
    </div>
  );
}
