"use client";

import Link from "next/link";
import { useState } from "react";

export default function Compose() {
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Email sent successfully!");
    window.location.href = "/inbox";
  };

  const handleSaveDraft = () => {
    alert("Draft saved!");
  };

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
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
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
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="bg-[var(--bg-card)] border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">New Message</h1>
            <p className="text-sm text-[var(--text-gray)]">Compose your email</p>
          </div>
          <Link href="/inbox" className="px-4 py-2 rounded-lg bg-white/5 text-sm hover:bg-white/10 transition-colors">
            ← Back to Inbox
          </Link>
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <form onSubmit={handleSend} className="bg-[var(--bg-card)] rounded-[20px] border border-white/5 overflow-hidden">
              {/* Recipients */}
              <div className="p-6 space-y-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <label className="text-sm text-[var(--text-gray)] w-16">To:</label>
                  <input
                    type="email"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg bg-[var(--bg-dark)] border border-white/10 focus:border-[var(--purple-primary)] focus:outline-none transition-colors text-white"
                    placeholder="recipient@example.com"
                    required
                  />
                  <div className="flex gap-2">
                    {!showCc && (
                      <button
                        type="button"
                        onClick={() => setShowCc(true)}
                        className="text-xs text-[var(--text-gray)] hover:text-white transition-colors px-2"
                      >
                        Cc
                      </button>
                    )}
                    {!showBcc && (
                      <button
                        type="button"
                        onClick={() => setShowBcc(true)}
                        className="text-xs text-[var(--text-gray)] hover:text-white transition-colors px-2"
                      >
                        Bcc
                      </button>
                    )}
                  </div>
                </div>

                {showCc && (
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-[var(--text-gray)] w-16">Cc:</label>
                    <input
                      type="email"
                      value={cc}
                      onChange={(e) => setCc(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg bg-[var(--bg-dark)] border border-white/10 focus:border-[var(--purple-primary)] focus:outline-none transition-colors text-white"
                      placeholder="cc@example.com"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCc(false)}
                      className="text-[var(--text-gray)] hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {showBcc && (
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-[var(--text-gray)] w-16">Bcc:</label>
                    <input
                      type="email"
                      value={bcc}
                      onChange={(e) => setBcc(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg bg-[var(--bg-dark)] border border-white/10 focus:border-[var(--purple-primary)] focus:outline-none transition-colors text-white"
                      placeholder="bcc@example.com"
                    />
                    <button
                      type="button"
                      onClick={() => setShowBcc(false)}
                      className="text-[var(--text-gray)] hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <label className="text-sm text-[var(--text-gray)] w-16">Subject:</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg bg-[var(--bg-dark)] border border-white/10 focus:border-[var(--purple-primary)] focus:outline-none transition-colors text-white"
                    placeholder="Email subject"
                    required
                  />
                </div>
              </div>

              {/* Formatting Toolbar */}
              <div className="px-6 py-3 border-b border-white/5 flex items-center gap-2 flex-wrap">
                <button type="button" className="p-2 hover:bg-white/5 rounded text-sm" title="Bold">
                  <strong>B</strong>
                </button>
                <button type="button" className="p-2 hover:bg-white/5 rounded text-sm" title="Italic">
                  <em>I</em>
                </button>
                <button type="button" className="p-2 hover:bg-white/5 rounded text-sm" title="Underline">
                  <u>U</u>
                </button>
                <div className="w-px h-6 bg-white/10 mx-1"></div>
                <button type="button" className="p-2 hover:bg-white/5 rounded text-sm" title="Bulleted list">
                  •
                </button>
                <button type="button" className="p-2 hover:bg-white/5 rounded text-sm" title="Numbered list">
                  1.
                </button>
                <div className="w-px h-6 bg-white/10 mx-1"></div>
                <button type="button" className="p-2 hover:bg-white/5 rounded text-sm" title="Attach file">
                  📎
                </button>
                <button type="button" className="p-2 hover:bg-white/5 rounded text-sm" title="Insert image">
                  🖼️
                </button>
                <button type="button" className="p-2 hover:bg-white/5 rounded text-sm" title="Insert link">
                  🔗
                </button>
              </div>

              {/* Message Body */}
              <div className="p-6">
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full min-h-[400px] px-4 py-3 rounded-lg bg-[var(--bg-dark)] border border-white/10 focus:border-[var(--purple-primary)] focus:outline-none transition-colors text-white resize-y"
                  placeholder="Write your message here..."
                  required
                />
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-[var(--bg-dark)] border-t border-white/5 flex items-center justify-between">
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--purple-primary)] to-[var(--pink-accent)] text-white font-semibold text-sm hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] transition-all"
                  >
                    Send ✉️
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="px-6 py-3 rounded-lg bg-white/5 text-white font-medium text-sm hover:bg-white/10 transition-colors"
                  >
                    Save Draft
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="px-4 py-2 rounded-lg text-[var(--text-gray)] hover:text-white hover:bg-white/5 transition-all text-sm"
                >
                  Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
