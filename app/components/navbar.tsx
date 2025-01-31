"use client";
import { useAuth } from "../../context/authContext";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
    const { user } = useAuth();
    // console.log("user info :", user);
    return (
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-blue-600 px-4">SkillExchange</div>

        {user && (
            <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user.email}</span>
            <LogoutButton />
            </div>
        )}
        </header>
    );
}
