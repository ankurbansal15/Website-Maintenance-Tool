"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

import {
  ActivitySquare,
  AlertCircle,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  GanttChartSquare,
  Globe,
  LayoutDashboard,
  Lock,
  Menu,
  WholeWord,
  Settings,
  Smartphone,
  Zap,
} from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Performance", href: "/performance", icon: BarChart3 },
  { name: "Security", href: "/security", icon: Lock },
  { name: "SEO", href: "/seo", icon: GanttChartSquare },
  { name: "Keyword Research", href: "/keyword-research", icon: WholeWord },
  { name: "Alerts", href: "/alerts", icon: AlertCircle },
  { name: "Latency", href: "/latency", icon: Zap },
  { name: "Content Check", href: "/content-check", icon: ActivitySquare },
  { name: "Mobile", href: "/mobile", icon: Smartphone },
  { name: "Global Monitoring", href: "/global", icon: Globe },
  { name: "Settings", href: "/settings", icon: Settings },
];

const dummyData = [
  { name: "Page A", responseTime: 400 },
  { name: "Page B", responseTime: 300 },
  { name: "Page C", responseTime: 500 },
  { name: "Page D", responseTime: 280 },
  { name: "Page E", responseTime: 390 },
];

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { setTheme } = useTheme();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <aside
      className={`bg-card text-card-foreground ${
        isSidebarOpen ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out flex flex-col fixed left-0 top-0 bg-white h-full border-r z-10`}
    >
      <div className="p-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <Link href="/" className="flex items-center space-x-2">
          <ActivitySquare className="h-6 w-6" />
          {isSidebarOpen && (
            <span className="text-lg font-bold">Website Monitor</span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>
      <nav className="mt-8 flex-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            <item.icon className="h-5 w-5 mr-3" />
            {isSidebarOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
