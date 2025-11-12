"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-[1000px] mx-auto px-5 w-full">
        <Navigation />
      </div>

      <div className="flex-1 flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-[440px] animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-[32px] font-bold mb-2">Create Account</h1>
            <p className="text-[var(--text-gray)] text-sm">
              Join Letters for elegant email management
            </p>
          </div>

          <div className="bg-[var(--bg-card)] rounded-[20px] p-8 border border-white/5">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block text-sm mb-2 text-[var(--text-gray)]">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--bg-dark)] border border-white/10 focus:border-[var(--purple-primary)] focus:outline-none transition-colors text-white"
                  placeholder="John Doe"
                  required
                />
              </div>

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

              <div className="mb-5">
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

              <div className="mb-6">
                <label className="block text-sm mb-2 text-[var(--text-gray)]">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--bg-dark)] border border-white/10 focus:border-[var(--purple-primary)] focus:outline-none transition-colors text-white"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[var(--purple-primary)] to-[var(--pink-accent)] text-white font-semibold text-sm hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] transition-all"
              >
                Create Account
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
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--purple-primary)] hover:underline font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
