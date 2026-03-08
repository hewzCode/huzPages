"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar, MobileSidebar } from "@/components/layout/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <Sidebar />
      <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="md:pl-64">
        <div className="container mx-auto px-4 py-8 md:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
