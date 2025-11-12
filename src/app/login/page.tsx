"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-[1000px] mx-auto px-5 w-full">
        <Navigation />
      </div>

      <div className="flex-1 flex items-center justify-center px-5">
        <div className="w-full max-w-[440px] animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-[32px] font-bold mb-2">Welcome Back</h1>
            <p className="text-[var(--text-gray)] text-sm">
              Sign in to access your Letters account
            </p>
          </div>

          <div className="bg-[var(--bg-card)] rounded-[20px] p-8 border border-white/5">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block text-sm mb-2 text-[var(--text-gray)]">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--bg-dark)] border border-white/10 focus:border-[var(--purple-primary)] focus:outline-none transition-colors text-white"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm mb-2 text-[var(--text-gray)]">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--bg-dark)] border border-white/10 focus:border-[var(--purple-primary)] focus:outline-none transition-colors text-white"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/10" />
                  <span className="text-sm text-[var(--text-gray)]">Remember me</span>
                </label>
                <Link href="#" className="text-sm text-[var(--purple-primary)] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[var(--purple-primary)] to-[var(--pink-accent)] text-white font-semibold text-sm hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] transition-all"
              >
                Sign In
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-xs text-[var(--text-dim)]">OR</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            <div className="space-y-3">
              <button className="w-full py-3 rounded-lg bg-[var(--bg-dark)] border border-white/10 text-white font-medium text-sm hover:border-white/20 transition-colors flex items-center justify-center gap-2">
                <span>🔍</span> Continue with Google
              </button>
              <button className="w-full py-3 rounded-lg bg-[var(--bg-dark)] border border-white/10 text-white font-medium text-sm hover:border-white/20 transition-colors flex items-center justify-center gap-2">
                <span>Ⓜ️</span> Continue with Microsoft
              </button>
            </div>
          </div>

          <p className="text-center mt-6 text-sm text-[var(--text-gray)]">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[var(--purple-primary)] hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
