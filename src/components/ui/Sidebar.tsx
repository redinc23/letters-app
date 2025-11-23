"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface SidebarLink {
  href: string;
  icon: string;
  label: string;
  badge?: string | number;
  active?: boolean;
}

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  title?: string;
  links: SidebarLink[];
  composeButton?: {
    href: string;
    label: string;
  };
  footer?: ReactNode;
}

export function Sidebar({ open, onToggle, title = "Letters", links, composeButton, footer }: SidebarProps) {
  return (
    <aside
      className={`${
        open ? "w-64" : "w-20"
      } bg-[var(--bg-card)] border-r border-white/5 transition-all duration-300 flex flex-col`}
    >
      <div className="p-5 border-b border-white/5 flex items-center justify-between">
        {open && <h2 className="text-xl font-bold">{title}</h2>}
        <button
          onClick={onToggle}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          {open ? "☰" : "→"}
        </button>
      </div>

      <nav className="flex-1 p-4">
        {composeButton && (
          <Link
            href={composeButton.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-[var(--purple-primary)] to-[var(--pink-accent)] text-white hover:translate-y-[-2px] hover:shadow-lg transition-all mb-4"
          >
            <span className="text-lg">✉️</span>
            {open && <span className="font-semibold">{composeButton.label}</span>}
          </Link>
        )}

        <div className="space-y-1">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                link.active
                  ? "bg-white/5"
                  : "hover:bg-white/5"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {open && <span>{link.label}</span>}
              {open && link.badge && (
                <span
                  className={`ml-auto text-xs ${
                    typeof link.badge === "number"
                      ? "bg-[var(--purple-primary)] px-2 py-1 rounded-full"
                      : "text-[var(--text-gray)]"
                  }`}
                >
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {footer && (
        <div className="p-4 border-t border-white/5">
          {footer}
        </div>
      )}
    </aside>
  );
}

interface SidebarUserProps {
  name: string;
  email: string;
  avatarInitial?: string;
  expanded: boolean;
}

export function SidebarUser({ name, email, avatarInitial, expanded }: SidebarUserProps) {
  const initial = avatarInitial || name.charAt(0).toUpperCase();
  
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--purple-primary)] to-[var(--pink-accent)] flex items-center justify-center text-sm flex-shrink-0">
        {initial}
      </div>
      {expanded && (
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{name}</div>
          <div className="text-xs text-[var(--text-gray)] truncate">{email}</div>
        </div>
      )}
    </div>
  );
}
