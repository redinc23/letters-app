"use client";

import { useState } from "react";
import {
  DashboardLayout,
  Sidebar,
  SidebarUser,
  PageHeader,
  Section,
  Grid,
  StatCard,
  ActionCard,
  SearchInput,
  IconButton,
  Card,
} from "@/components/ui";

export default function DashboardV2() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <DashboardLayout
      sidebar={
        <Sidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          title="Letters"
          composeButton={{ href: "/compose", label: "Compose" }}
          links={[
            { href: "/inbox", icon: "📥", label: "Inbox", badge: 12 },
            { href: "/dashboard-v2", icon: "⭐", label: "Starred", active: true },
            { href: "/dashboard", icon: "📤", label: "Sent" },
            { href: "/dashboard", icon: "📝", label: "Drafts", badge: "3" },
            { href: "/dashboard", icon: "🗑️", label: "Trash" },
          ]}
          footer={
            <SidebarUser
              name="User"
              email="user@letters.com"
              expanded={sidebarOpen}
            />
          }
        />
      }
    >
      <main className="flex-1 flex flex-col">
        <PageHeader
          title="Dashboard (v2 - Using Primitives)"
          subtitle="Welcome to Letters"
          actions={
            <>
              <SearchInput placeholder="Search mail..." className="w-64" />
              <IconButton icon="🔔" />
            </>
          }
        />

        <div className="flex-1 p-6 overflow-y-auto">
          <Section>
            <Grid cols={4} gap={5}>
              <StatCard icon="📥" value={12} label="New Messages" badge="Today" />
              <StatCard icon="⭐" value={48} label="Starred" badge="Total" />
              <StatCard icon="📝" value={3} label="Drafts" badge="Pending" />
              <StatCard icon="📊" value={87} label="Sent" badge="This week" />
            </Grid>
          </Section>

          <Section title="Quick Actions">
            <Grid cols={3} gap={5}>
              <ActionCard
                icon="✉️"
                title="New Message"
                description="Compose a new email"
                href="/compose"
              />
              <ActionCard
                icon="📥"
                title="View Inbox"
                description="Check your messages"
                href="/inbox"
              />
              <ActionCard
                icon="⚙️"
                title="Settings"
                description="Manage your account"
                onClick={() => alert("Settings clicked")}
              />
            </Grid>
          </Section>

          <Section title="Recent Activity">
            <Card>
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--purple-primary)] to-[var(--pink-accent)] flex items-center justify-center flex-shrink-0">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <h4 className="font-semibold truncate">Sender Name {i}</h4>
                        <span className="text-xs text-[var(--text-gray)] whitespace-nowrap">
                          2h ago
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-gray)] truncate">
                        Email subject line goes here...
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          </Section>
        </div>
      </main>
    </DashboardLayout>
  );
}
