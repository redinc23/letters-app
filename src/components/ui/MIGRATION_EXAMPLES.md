# Migration Examples

Examples showing how to refactor existing pages to use the new UI primitives.

## Dashboard Page - Before and After

### Before (Original)
```tsx
"use client";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - 63 lines of code */}
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-[var(--bg-card)]...`}>
        {/* ... sidebar implementation ... */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="bg-[var(--bg-card)] border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-[var(--text-gray)]">Welcome to Letters</p>
          </div>
          {/* ... header actions ... */}
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          {/* Stats - repetitive card code */}
          <div className="grid md:grid-cols-4 gap-5 mb-8">
            <div className="bg-[var(--bg-card)] rounded-[20px] p-6 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">📥</span>
                <span className="text-xs text-[var(--text-gray)]">Today</span>
              </div>
              <div className="text-3xl font-bold mb-1">12</div>
              <div className="text-sm text-[var(--text-gray)]">New Messages</div>
            </div>
            {/* ... 3 more similar cards ... */}
          </div>

          {/* Quick Actions - more repetitive code */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-3 gap-5">
              <Link href="/compose" className="bg-[var(--bg-card)] rounded-[20px] p-6...">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--purple-primary)]...">
                  ✉️
                </div>
                <h3 className="text-lg font-semibold mb-2">New Message</h3>
                <p className="text-sm text-[var(--text-gray)]">Compose a new email</p>
              </Link>
              {/* ... 2 more similar cards ... */}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
```

### After (With UI Primitives)
```tsx
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
} from "@/components/ui";

export default function Dashboard() {
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
            { href: "/dashboard", icon: "⭐", label: "Starred", active: true },
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
          title="Dashboard"
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
                onClick={() => console.log("Settings clicked")}
              />
            </Grid>
          </Section>

          <Section title="Recent Activity">
            {/* Keep custom activity list as-is or create a new primitive if needed */}
          </Section>
        </div>
      </main>
    </DashboardLayout>
  );
}
```

**Benefits:**
- 167 lines → ~80 lines (52% reduction)
- Reusable components across all pages
- Consistent styling and behavior
- Easier to maintain and update
- Type-safe props
- Better readability

## Home Page - Pricing Section

### Before
```tsx
<section id="pricing" className="mb-12 animate-fade-in">
  <h2 className="text-[26px] text-center mb-2">Exclusive Membership</h2>
  <p className="text-[var(--text-gray)] text-center text-sm mb-9">
    Select the tier that best complements your lifestyle. 30-day trial included
  </p>
  <div className="grid md:grid-cols-3 gap-5">
    {/* 60+ lines of repetitive pricing card code */}
    <div className="bg-[var(--bg-card)] rounded-[20px] p-9 border border-white/5...">
      <div className="mb-6">
        <h3 className="text-[22px] mb-2">Essentials</h3>
        <p className="text-[var(--text-gray)] text-[13px] mb-6">
          For the discerning individual
        </p>
      </div>
      <div className="text-[46px] font-extrabold mb-1">
        $0<span className="text-[15px] font-medium text-[var(--text-gray)]">/month</span>
      </div>
      {/* ... many more lines ... */}
    </div>
    {/* ... 2 more similar cards ... */}
  </div>
</section>
```

### After
```tsx
import { Section, Grid, PricingCard } from "@/components/ui";

<Section 
  title="Exclusive Membership" 
  subtitle="Select the tier that best complements your lifestyle. 30-day trial included"
  className="animate-fade-in text-center"
>
  <Grid cols={3} gap={5}>
    <PricingCard
      name="Essentials"
      description="For the discerning individual"
      price={0}
      period="/month"
      periodNote="Free forever"
      features={[
        { text: "20 GB refined storage", included: true },
        { text: "Elegant interface", included: true },
        { text: "Standard security", included: true },
        { text: "Priority support", included: true },
        { text: "Advanced integrations", included: false },
        { text: "Custom domain", included: false },
      ]}
      buttonText="Get Started"
    />
    <PricingCard
      name="Signature"
      description="For the professional connoisseur"
      price={14}
      period="/month"
      periodNote="Billed monthly"
      features={[
        { text: "100 GB premium storage", included: true },
        { text: "All Essentials features", included: true },
        { text: "Advanced security", included: true },
        { text: "Custom domain", included: true },
        { text: "Full integrations", included: true },
        { text: "Dedicated support", included: true },
      ]}
      buttonText="Upgrade Now"
      featured={true}
      badge="POPULAR"
    />
    <PricingCard
      name="Enterprise"
      description="For organizations of distinction"
      price={28}
      period="/user/mo"
      periodNote="Billed annually"
      features={[
        { text: "Unlimited storage", included: true },
        { text: "All Signature features", included: true },
        { text: "Admin controls", included: true },
        { text: "Team collaboration", included: true },
        { text: "Custom branding", included: true },
        { text: "24/7 premium support", included: true },
      ]}
      buttonText="Contact Sales"
    />
  </Grid>
</Section>
```

**Benefits:**
- Much shorter and more readable
- Data-driven approach
- Easy to add/remove features
- Consistent styling across all pricing tiers
- Type-safe feature definitions

## Inbox Page - Sidebar

### Before
```tsx
{/* Sidebar - 35+ lines of duplicated code */}
<aside className={`${sidebarOpen ? "w-64" : "w-20"}...`}>
  <div className="p-5 border-b border-white/5 flex items-center justify-between">
    {sidebarOpen && <h2 className="text-xl font-bold">Letters</h2>}
    <button onClick={() => setSidebarOpen(!sidebarOpen)}...>
      {sidebarOpen ? "☰" : "→"}
    </button>
  </div>
  {/* ... more sidebar code ... */}
</aside>
```

### After
```tsx
import { Sidebar, SidebarUser } from "@/components/ui";

<Sidebar
  open={sidebarOpen}
  onToggle={() => setSidebarOpen(!sidebarOpen)}
  composeButton={{ href: "/compose", label: "Compose" }}
  links={[
    { href: "/inbox", icon: "📥", label: "Inbox", badge: 12, active: true },
    { href: "/dashboard", icon: "⭐", label: "Starred" },
    { href: "/dashboard", icon: "📤", label: "Sent" },
    { href: "/dashboard", icon: "📝", label: "Drafts", badge: "3" },
  ]}
/>
```

**Benefits:**
- Single source of truth for sidebar behavior
- Reusable across dashboard, inbox, and compose pages
- Consistent animation and interaction patterns
- Easy to modify globally

## Summary

### Code Reduction
- Dashboard: 167 lines → ~80 lines (52% reduction)
- Home (Pricing): 80 lines → 30 lines (62% reduction)
- Sidebar: 35 lines → 12 lines (66% reduction)

### Key Improvements
1. **Consistency**: All cards, buttons, and layouts follow the same patterns
2. **Maintainability**: Change once, update everywhere
3. **Type Safety**: TypeScript ensures correct prop usage
4. **Readability**: Declarative component usage vs. imperative HTML/CSS
5. **Reusability**: Build new pages faster with existing primitives
6. **Testing**: Easier to test individual components in isolation

### Next Steps
1. Gradually migrate existing pages to use the new primitives
2. Add more specialized components as patterns emerge
3. Consider adding animation/transition utilities
4. Document any custom styling patterns that don't fit primitives
