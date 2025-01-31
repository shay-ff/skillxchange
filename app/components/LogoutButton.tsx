// components/LogoutButton.js
"use client";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect to home page after logout
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
    >
      Logout
    </button>
  );
}
