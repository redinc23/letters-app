"use client";

import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-[var(--bg-card)] border-r border-white/5 transition-all duration-300 flex flex-col`}>
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          {sidebarOpen && <h2 className="text-xl font-bold">Letters</h2>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            {sidebarOpen ? "☰" : "→"}
          </button>
        </div>

        <nav className="flex-1 p-4">
          <Link href="/compose" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-[var(--purple-primary)] to-[var(--pink-accent)] text-white hover:translate-y-[-2px] hover:shadow-lg transition-all mb-4">
            <span className="text-lg">✉️</span>
            {sidebarOpen && <span className="font-semibold">Compose</span>}
          </Link>

          <div className="space-y-1">
            <Link href="/inbox" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
              <span className="text-lg">📥</span>
              {sidebarOpen && <span>Inbox</span>}
              {sidebarOpen && <span className="ml-auto text-xs bg-[var(--purple-primary)] px-2 py-1 rounded-full">12</span>}
            </Link>
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5">
              <span className="text-lg">⭐</span>
              {sidebarOpen && <span>Starred</span>}
            </Link>
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
              <span className="text-lg">📤</span>
              {sidebarOpen && <span>Sent</span>}
            </Link>
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
              <span className="text-lg">📝</span>
              {sidebarOpen && <span>Drafts</span>}
              {sidebarOpen && <span className="ml-auto text-xs text-[var(--text-gray)]">3</span>}
            </Link>
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
              <span className="text-lg">🗑️</span>
              {sidebarOpen && <span>Trash</span>}
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--purple-primary)] to-[var(--pink-accent)] flex items-center justify-center text-sm">U</div>
            {sidebarOpen && (
              <div className="flex-1">
                <div className="text-sm font-medium">User</div>
                <div className="text-xs text-[var(--text-gray)]">user@letters.com</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="bg-[var(--bg-card)] border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-[var(--text-gray)]">Welcome to Letters</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="search"
              placeholder="Search mail..."
              className="px-4 py-2 rounded-lg bg-[var(--bg-dark)] border border-white/10 focus:border-[var(--purple-primary)] focus:outline-none transition-colors w-64"
            />
            <button className="p-2 hover:bg-white/5 rounded-lg">🔔</button>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-5 mb-8">
            <div className="bg-[var(--bg-card)] rounded-[20px] p-6 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">📥</span>
                <span className="text-xs text-[var(--text-gray)]">Today</span>
              </div>
              <div className="text-3xl font-bold mb-1">12</div>
              <div className="text-sm text-[var(--text-gray)]">New Messages</div>
            </div>
            <div className="bg-[var(--bg-card)] rounded-[20px] p-6 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">⭐</span>
                <span className="text-xs text-[var(--text-gray)]">Total</span>
              </div>
              <div className="text-3xl font-bold mb-1">48</div>
              <div className="text-sm text-[var(--text-gray)]">Starred</div>
            </div>
            <div className="bg-[var(--bg-card)] rounded-[20px] p-6 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">📝</span>
                <span className="text-xs text-[var(--text-gray)]">Pending</span>
              </div>
              <div className="text-3xl font-bold mb-1">3</div>
              <div className="text-sm text-[var(--text-gray)]">Drafts</div>
            </div>
            <div className="bg-[var(--bg-card)] rounded-[20px] p-6 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">📊</span>
                <span className="text-xs text-[var(--text-gray)]">This week</span>
              </div>
              <div className="text-3xl font-bold mb-1">87</div>
              <div className="text-sm text-[var(--text-gray)]">Sent</div>
            </div>
          </div>

          {/* Quick Actions */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-3 gap-5">
              <Link href="/compose" className="bg-[var(--bg-card)] rounded-[20px] p-6 border border-white/5 hover:border-[var(--border-color)] hover:translate-y-[-3px] transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--purple-primary)] to-[var(--pink-accent)] rounded-[15px] flex items-center justify-center mb-4 text-2xl">✉️</div>
                <h3 className="text-lg font-semibold mb-2">New Message</h3>
                <p className="text-sm text-[var(--text-gray)]">Compose a new email</p>
              </Link>
              <Link href="/inbox" className="bg-[var(--bg-card)] rounded-[20px] p-6 border border-white/5 hover:border-[var(--border-color)] hover:translate-y-[-3px] transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--purple-primary)] to-[var(--pink-accent)] rounded-[15px] flex items-center justify-center mb-4 text-2xl">📥</div>
                <h3 className="text-lg font-semibold mb-2">View Inbox</h3>
                <p className="text-sm text-[var(--text-gray)]">Check your messages</p>
              </Link>
              <div className="bg-[var(--bg-card)] rounded-[20px] p-6 border border-white/5 hover:border-[var(--border-color)] hover:translate-y-[-3px] transition-all cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--purple-primary)] to-[var(--pink-accent)] rounded-[15px] flex items-center justify-center mb-4 text-2xl">⚙️</div>
                <h3 className="text-lg font-semibold mb-2">Settings</h3>
                <p className="text-sm text-[var(--text-gray)]">Manage your account</p>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="bg-[var(--bg-card)] rounded-[20px] border border-white/5 overflow-hidden">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--purple-primary)] to-[var(--pink-accent)] flex items-center justify-center flex-shrink-0">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <h4 className="font-semibold truncate">Sender Name {i}</h4>
                        <span className="text-xs text-[var(--text-gray)] whitespace-nowrap">2h ago</span>
                      </div>
                      <p className="text-sm text-[var(--text-gray)] truncate">Email subject line goes here...</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
