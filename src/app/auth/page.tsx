"use client";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import AuthForm from "@/components/auth";

export default function Auth() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="flex-1 flex flex-col overflow-hidden items-center justify-center">
        <AuthForm />
      </div>
    </div>
  );
}
