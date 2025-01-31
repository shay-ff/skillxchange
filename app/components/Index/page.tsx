"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { auth } from "../../../config/firebase";
// import { auth } from "/Users/drextor/dev/skill-swap/config/firebase.js";

import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from "firebase/auth";


export default function Home() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to landing page
        window.location.href = "./components/Landing";
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEmailPasswordAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        // You might want to store additional user data like fullName in Firestore here
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-blue-600 px-4">
          SkillExchange
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto mt-10 p-6 grid grid-cols-3 gap-6">
        {/* Left Section - Site Details & Stats */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome to SkillExchange
          </h2>
          <p className="mt-4 text-gray-600">
            Join a thriving community of learners and experts. Exchange skills,
            collaborate, and grow together.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">10K+</p>
              <p className="text-gray-500">Users</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">5K+</p>
              <p className="text-gray-500">Skill Exchanges</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">500+</p>
              <p className="text-gray-500">Topics</p>
            </div>
          </div>
        </div>

        {/* Right Section - Login/Signup */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          {error && (
            <div className="w-full p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}
          
          {isSignup ? (
            <form onSubmit={handleEmailPasswordAuth} className="w-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Sign Up
              </h2>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md mb-3"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-black px-4 py-2 border rounded-md mb-3"
                required
              />
              <div className="w-full relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-black px-4 py-2 border rounded-md mb-3 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleEmailPasswordAuth} className="w-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Log In
              </h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 text-black py-2 border rounded-md mb-3"
                required
              />
              <div className="w-full relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-black px-4 py-2 border rounded-md mb-3 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>
          )}

          {/* Google Sign-in Button */}
          <div className="w-full mt-4">
            <div className="relative flex items-center justify-center">
              <div className="border-t w-full border-gray-300"></div>
              <span className="bg-white px-2 text-sm text-gray-500">OR</span>
              <div className="border-t w-full border-gray-300"></div>
            </div>
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50"
            >
              <svg className="w-5  h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-black">Continue with Google</span>
            </button>
          </div>

          <p className="mt-4 text-gray-600">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-600 underline"
            >
              {isSignup ? "Log In" : "Sign Up"}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}