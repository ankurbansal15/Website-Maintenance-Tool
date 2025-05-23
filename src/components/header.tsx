"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Search } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";



const Header: React.FC = () => {
  const { setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const { isSignedIn, user } = useUser();
  

  if (!isSignedIn || !user) {
    window.location.href = "/";
    return <p>Please log in to see your profile information.</p>;
  }

  const username = user.username;
  const email = user.primaryEmailAddress?.emailAddress;
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };


  return (
    <header className="bg-card text-card-foreground h-16 flex items-center px-4 border-b fixed top-0 bg-white w-full justify-between">
      <div className="flex items-center space-x-4 ml-64">
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
      
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme("dark")}
          aria-label="Dark Mode"
        >
          <MoonIcon className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="@user" />
                <AvatarFallback>{username ? username[0].toUpperCase() : ""}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{username}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
