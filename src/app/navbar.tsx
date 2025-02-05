"use client";
import { useAuth } from "@/context/authContext";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import SearchIcon from "@/app/search";
import NotificationsIcon from "@/app/notifications";
import MessagesIcon from "@/app/messages";
import { log } from "console";

export default function Navbar() {
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  console.log(user);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };  

  return (
    <header className="flex justify-between border-r- items-center p-2 bg-white shadow-md">
      <div className="text-2xl font-bold text-blue-600 px-3">SkillExchange</div>

      {user && (
        <div className="flex items-center gap-6">
            <SearchIcon />
            <NotificationsIcon />
            <MessagesIcon />

            <div className="relative">
                <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    {user.email?.charAt(0).toUpperCase() || ""}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>

            {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                    <a
                    href="./profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                    My Profile
                    </a>
                <button
                    onClick={() => {
                        handleLogout();
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                    Logout
                    </button>
                </div>
            )}
        </div>
    </div>
)}
    </header>
);
}
