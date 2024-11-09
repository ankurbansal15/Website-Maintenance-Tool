'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { ActivitySquare, AlertCircle, BarChart3, ChevronLeft, ChevronRight, GanttChartSquare, Globe, LayoutDashboard, Lock, Menu, Search, Settings, Smartphone, Zap } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import PerformanceMatrix from '@/components/performance-matrix'
import Alerts from '@/components/alerts'
const sidebarItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Performance", href: "/performance", icon: BarChart3 },
  { name: "Security", href: "/security", icon: Lock },
  { name: "SEO", href: "/seo", icon: GanttChartSquare },
  { name: "Alerts", href: "/alerts", icon: AlertCircle },
  { name: "Latency", href: "/latency", icon: Zap },
  { name: "Content Check", href: "/content-check", icon: ActivitySquare },
  { name: "Mobile", href: "/mobile", icon: Smartphone },
  { name: "Global Monitoring", href: "/global", icon: Globe },
  { name: "Settings", href: "/settings", icon: Settings },
]

const dummyData = [
  { name: 'Page A', responseTime: 400 },
  { name: 'Page B', responseTime: 300 },
  { name: 'Page C', responseTime: 500 },
  { name: 'Page D', responseTime: 280 },
  { name: 'Page E', responseTime: 390 },
]
const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { setTheme } = useTheme()
  const [newWebsite, setNewWebsite] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    return (
        <header className="bg-card text-card-foreground h-16 flex items-center justify-between px-4 border-b">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle Sidebar">
              <Menu className="h-6 w-6" />
            </Button>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setTheme('light')} aria-label="Light Mode">
              <SunIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setTheme('dark')} aria-label="Dark Mode">
              <MoonIcon className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="@user" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">user</p>
                    <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
    );
};

export default Header;