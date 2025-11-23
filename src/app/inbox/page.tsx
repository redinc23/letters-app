"use client";

import Link from "next/link";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const mockEmails = [
  { id: 1, from: "Sarah Chen", subject: "Q4 Project Update", preview: "Here's the latest update on our Q4 initiatives...", time: "10:30 AM", unread: true, starred: true },
  { id: 2, from: "Mike Johnson", subject: "Meeting Notes - Design Review", preview: "Attached are the notes from yesterday's design review...", time: "9:15 AM", unread: true, starred: false },
  { id: 3, from: "Emily Davis", subject: "Welcome to the Team!", preview: "We're excited to have you join us. Here's what to expect...", time: "Yesterday", unread: false, starred: true },
  { id: 4, from: "Newsletter", subject: "Weekly Tech Digest", preview: "This week's top stories in technology and innovation...", time: "Yesterday", unread: false, starred: false },
  { id: 5, from: "Alex Rivera", subject: "Budget Proposal Review", preview: "I've reviewed the budget proposal and have some thoughts...", time: "2 days ago", unread: false, starred: false },
  { id: 6, from: "Letters Team", subject: "Tips for Better Email Management", preview: "Get the most out of Letters with these productivity tips...", time: "3 days ago", unread: false, starred: false },
];

export default function Inbox() {
  const [selectedEmail, setSelectedEmail] = useState(mockEmails[0]);

  return (
    <div className="min-h-screen flex">
      <Sidebar currentPage="inbox" />

      {/* Email List */}
      <div className="w-96 bg-[var(--bg-card)] border-r border-white/5 flex flex-col">
        <header className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold">Inbox</h2>
            <button className="p-2 hover:bg-white/5 rounded-lg text-sm">🔄</button>
          </div>
          <input
            type="search"
            placeholder="Search inbox..."
            className="w-full px-4 py-2 rounded-lg bg-[var(--bg-dark)] border border-white/10 focus:border-[var(--purple-primary)] focus:outline-none transition-colors text-sm"
          />
        </header>

        <div className="flex-1 overflow-y-auto">
          {mockEmails.map((email) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${
                selectedEmail.id === email.id ? "bg-white/5" : ""
              } ${email.unread ? "border-l-4 border-l-[var(--purple-primary)]" : ""}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-sm font-semibold truncate">{email.from}</span>
                  {email.starred && <span className="text-[var(--orange-accent)] text-xs">⭐</span>}
                </div>
                <span className="text-xs text-[var(--text-gray)] whitespace-nowrap ml-2">{email.time}</span>
              </div>
              <h4 className={`text-sm mb-1 truncate ${email.unread ? "font-semibold" : "text-[var(--text-gray)]"}`}>
                {email.subject}
              </h4>
              <p className="text-xs text-[var(--text-gray)] truncate">{email.preview}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Email Content */}
      <main className="flex-1 flex flex-col bg-[var(--bg-dark)]">
        {selectedEmail ? (
          <>
            <header className="bg-[var(--bg-card)] border-b border-white/5 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">{selectedEmail.subject}</h1>
                  <div className="flex items-center gap-3 text-sm text-[var(--text-gray)]">
                    <span className="font-medium text-white">{selectedEmail.from}</span>
                    <span>•</span>
                    <span>{selectedEmail.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/5 rounded-lg">⭐</button>
                  <button className="p-2 hover:bg-white/5 rounded-lg">🗑️</button>
                  <button className="p-2 hover:bg-white/5 rounded-lg">⋯</button>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-[var(--purple-primary)] text-white text-sm hover:translate-y-[-2px] transition-all">
                  Reply
                </button>
                <button className="px-4 py-2 rounded-lg bg-white/5 text-white text-sm hover:bg-white/10 transition-colors">
                  Forward
                </button>
              </div>
            </header>

            <div className="flex-1 p-6 overflow-y-auto">
              <div className="bg-[var(--bg-card)] rounded-[20px] p-8 border border-white/5 max-w-4xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--purple-primary)] to-[var(--pink-accent)] flex items-center justify-center text-lg flex-shrink-0">
                    {selectedEmail.from[0]}
                  </div>
                  <div>
                    <div className="font-semibold mb-1">{selectedEmail.from}</div>
                    <div className="text-sm text-[var(--text-gray)]">to: me</div>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-[var(--text-gray)] leading-relaxed mb-4">
                    {selectedEmail.preview}
                  </p>
                  <p className="text-[var(--text-gray)] leading-relaxed mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                  <p className="text-[var(--text-gray)] leading-relaxed mb-4">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p className="text-[var(--text-gray)] leading-relaxed">
                    Best regards,<br />
                    <span className="font-semibold text-white">{selectedEmail.from}</span>
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[var(--text-gray)]">
            <div className="text-center">
              <div className="text-6xl mb-4">📧</div>
              <p>Select an email to read</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
