"use client";

import Link from "next/link";
import { useState } from "react";

interface SidebarProps {
  currentPage?: "inbox" | "dashboard" | "compose" | "starred" | "sent" | "drafts";
}

export default function Sidebar({ currentPage = "inbox" }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: "inbox", href: "/inbox", icon: "📥", label: "Inbox", badge: "12" },
    { id: "starred", href: "/dashboard", icon: "⭐", label: "Starred", badge: null },
    { id: "sent", href: "/dashboard", icon: "📤", label: "Sent", badge: null },
    { id: "drafts", href: "/dashboard", icon: "📝", label: "Drafts", badge: "3" },
    { id: "trash", href: "/dashboard", icon: "🗑️", label: "Trash", badge: null },
  ];

  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-[var(--bg-card)] border-r border-white/5 transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="p-5 border-b border-white/5 flex items-center justify-between">
        {sidebarOpen && <h2 className="text-xl font-bold">Letters</h2>}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? "☰" : "→"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <Link
          href="/compose"
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-[var(--purple-primary)] to-[var(--pink-accent)] text-white hover:translate-y-[-2px] hover:shadow-lg transition-all mb-4"
        >
          <span className="text-lg">✉️</span>
          {sidebarOpen && <span className="font-semibold">Compose</span>}
        </Link>

        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.id
                  ? "bg-white/5"
                  : "hover:bg-white/5"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
              {sidebarOpen && item.badge && (
                <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                  item.id === "inbox" 
                    ? "bg-[var(--purple-primary)]"
                    : "text-[var(--text-gray)]"
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--purple-primary)] to-[var(--pink-accent)] flex items-center justify-center text-sm flex-shrink-0">
            U
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">User</div>
              <div className="text-xs text-[var(--text-gray)] truncate">
                user@letters.com
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
