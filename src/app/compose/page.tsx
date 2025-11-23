"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

const composeSchema = z.object({
  to: z.string().email("Please enter a valid email address"),
  cc: z.string().optional(),
  bcc: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Message body is required"),
});

type ComposeForm = z.infer<typeof composeSchema>;

export default function Compose() {
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ComposeForm>({
    resolver: zodResolver(composeSchema),
  });

  const onSubmit = async (data: ComposeForm) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Email sent successfully!");
      
      setTimeout(() => {
        router.push("/inbox");
      }, 500);
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
      setIsLoading(false);
    }
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved!");
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar currentPage="compose" />

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
            <form onSubmit={handleSubmit(onSubmit)} className="bg-[var(--bg-card)] rounded-[20px] border border-white/5 overflow-hidden">
              {/* Recipients */}
              <div className="p-6 space-y-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <label className="text-sm text-[var(--text-gray)] w-16">To:</label>
                  <div className="flex-1">
                    <input
                      type="email"
                      {...register("to")}
                      className={`w-full px-4 py-2 rounded-lg bg-[var(--bg-dark)] border ${
                        errors.to ? "border-red-500" : "border-white/10"
                      } focus:border-[var(--purple-primary)] focus:outline-none transition-colors text-white`}
                      placeholder="recipient@example.com"
                      disabled={isLoading}
                    />
                    {errors.to && (
                      <p className="text-red-400 text-xs mt-1">{errors.to.message}</p>
                    )}
                  </div>
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
                      {...register("cc")}
                      className="flex-1 px-4 py-2 rounded-lg bg-[var(--bg-dark)] border border-white/10 focus:border-[var(--purple-primary)] focus:outline-none transition-colors text-white"
                      placeholder="cc@example.com"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCc(false)}
                      className="text-[var(--text-gray)] hover:text-white"
                      disabled={isLoading}
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
                      {...register("bcc")}
                      className="flex-1 px-4 py-2 rounded-lg bg-[var(--bg-dark)] border border-white/10 focus:border-[var(--purple-primary)] focus:outline-none transition-colors text-white"
                      placeholder="bcc@example.com"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowBcc(false)}
                      className="text-[var(--text-gray)] hover:text-white"
                      disabled={isLoading}
                    >
                      ✕
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <label className="text-sm text-[var(--text-gray)] w-16">Subject:</label>
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register("subject")}
                      className={`w-full px-4 py-2 rounded-lg bg-[var(--bg-dark)] border ${
                        errors.subject ? "border-red-500" : "border-white/10"
                      } focus:border-[var(--purple-primary)] focus:outline-none transition-colors text-white`}
                      placeholder="Email subject"
                      disabled={isLoading}
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>
                    )}
                  </div>
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
                  {...register("body")}
                  className={`w-full min-h-[400px] px-4 py-3 rounded-lg bg-[var(--bg-dark)] border ${
                    errors.body ? "border-red-500" : "border-white/10"
                  } focus:border-[var(--purple-primary)] focus:outline-none transition-colors text-white resize-y`}
                  placeholder="Write your message here..."
                  disabled={isLoading}
                />
                {errors.body && (
                  <p className="text-red-400 text-xs mt-1">{errors.body.message}</p>
                )}
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-[var(--bg-dark)] border-t border-white/5 flex items-center justify-between">
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--purple-primary)] to-[var(--pink-accent)] text-white font-semibold text-sm hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">⚪</span> Sending...
                      </span>
                    ) : (
                      "Send ✉️"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    disabled={isLoading}
                    className="px-6 py-3 rounded-lg bg-white/5 text-white font-medium text-sm hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Save Draft
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => router.back()}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg text-[var(--text-gray)] hover:text-white hover:bg-white/5 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
