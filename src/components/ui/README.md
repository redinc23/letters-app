# UI Primitives

Shared, reusable UI components for the Letters application.

## Layout Components

### Container
A centered container with configurable max-width.
```tsx
<Container maxWidth="lg">Content</Container>
```

### PageLayout
Standard page layout with 1000px max-width (original site layout).
```tsx
<PageLayout>Content</PageLayout>
```

### DashboardLayout
Two-column layout for dashboard pages (sidebar + main content).
```tsx
<DashboardLayout sidebar={<Sidebar />}>
  <MainContent />
</DashboardLayout>
```

### PageHeader
Standard page header with title, subtitle, and action buttons.
```tsx
<PageHeader 
  title="Dashboard" 
  subtitle="Welcome back"
  actions={<Button>Action</Button>}
/>
```

### Section
Content section with optional title and subtitle.
```tsx
<Section title="Recent Activity" subtitle="Your latest emails">
  <Content />
</Section>
```

## Grid Components

### Grid
Responsive grid layout with configurable columns.
```tsx
<Grid cols={3} gap={5}>
  <Card />
  <Card />
  <Card />
</Grid>
```

### Flex
Flexible box layout with full control.
```tsx
<Flex direction="row" align="center" justify="between" gap={4}>
  <Item />
  <Item />
</Flex>
```

### Stack
Vertical stack with consistent spacing.
```tsx
<Stack spacing={4}>
  <Item />
  <Item />
</Stack>
```

## Navigation Components

### Sidebar
Collapsible sidebar navigation with links.
```tsx
<Sidebar
  open={isOpen}
  onToggle={() => setIsOpen(!isOpen)}
  title="Letters"
  composeButton={{ href: "/compose", label: "Compose" }}
  links={[
    { href: "/inbox", icon: "📥", label: "Inbox", badge: 12, active: true },
    { href: "/starred", icon: "⭐", label: "Starred" },
  ]}
  footer={<SidebarUser name="John" email="john@example.com" expanded={isOpen} />}
/>
```

### SidebarUser
User profile component for sidebar footer.
```tsx
<SidebarUser 
  name="John Doe" 
  email="john@example.com"
  expanded={true}
/>
```

## Card Components

### Card
Basic card container with optional hover effects.
```tsx
<Card hover className="p-6">
  Content
</Card>
```

### StatCard
Dashboard statistics card.
```tsx
<StatCard 
  icon="📥" 
  value={12} 
  label="New Messages"
  badge="Today"
/>
```

### ActionCard
Clickable card with icon, title, and description.
```tsx
<ActionCard
  icon="✉️"
  title="New Message"
  description="Compose a new email"
  href="/compose"
/>
```

### FeatureCard
Feature showcase card with gradient icon area.
```tsx
<FeatureCard
  icon="📧"
  title="Microsoft Outlook"
  description="Connect seamlessly"
  gradient="from-[#1e3a5f] to-[#2d5a8f]"
  items={["Real-time sync", "Smart organization", "Calendar integration"]}
/>
```

### PricingCard
Pricing tier card with features list.
```tsx
<PricingCard
  name="Signature"
  description="For professionals"
  price={14}
  period="/month"
  periodNote="Billed monthly"
  features={[
    { text: "100 GB storage", included: true },
    { text: "Custom domain", included: true },
    { text: "Advanced features", included: false },
  ]}
  buttonText="Upgrade Now"
  featured={true}
  badge="POPULAR"
/>
```

## Form Components

### Input
Text input with label and error states.
```tsx
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  error="Invalid email"
/>
```

### SearchInput
Search input with optimized styling.
```tsx
<SearchInput 
  placeholder="Search..." 
  onSearch={(value) => console.log(value)}
/>
```

### TextArea
Multi-line text input.
```tsx
<TextArea
  label="Message"
  rows={6}
  placeholder="Write your message..."
/>
```

## Button Components

### Button
Primary button with variants and sizes.
```tsx
<Button variant="primary" size="md">
  Click Me
</Button>

<Button variant="gradient" fullWidth>
  Submit
</Button>
```

Variants: `primary`, `secondary`, `ghost`, `gradient`
Sizes: `sm`, `md`, `lg`

### IconButton
Button with icon only.
```tsx
<IconButton icon="🔔" size="md" />
```

## Usage Example

```tsx
import { 
  DashboardLayout, 
  Sidebar, 
  PageHeader, 
  Section,
  Grid, 
  StatCard, 
  ActionCard 
} from "@/components/ui";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <DashboardLayout
      sidebar={
        <Sidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          links={[...]}
        />
      }
    >
      <main className="flex-1 flex flex-col">
        <PageHeader 
          title="Dashboard" 
          subtitle="Welcome to Letters"
        />
        
        <div className="flex-1 p-6 overflow-y-auto">
          <Section title="Statistics">
            <Grid cols={4} gap={5}>
              <StatCard icon="📥" value={12} label="New Messages" />
              <StatCard icon="⭐" value={48} label="Starred" />
              <StatCard icon="📝" value={3} label="Drafts" />
              <StatCard icon="📊" value={87} label="Sent" />
            </Grid>
          </Section>

          <Section title="Quick Actions">
            <Grid cols={3} gap={5}>
              <ActionCard icon="✉️" title="New Message" href="/compose" />
              <ActionCard icon="📥" title="View Inbox" href="/inbox" />
              <ActionCard icon="⚙️" title="Settings" href="/settings" />
            </Grid>
          </Section>
        </div>
      </main>
    </DashboardLayout>
  );
}
```

## Design Tokens

All components use CSS variables for consistent theming:
- `--bg-dark`: Main background
- `--bg-card`: Card background
- `--purple-primary`: Primary brand color
- `--pink-accent`: Accent color
- `--orange-accent`: Highlight color
- `--text-light`: Light text
- `--text-gray`: Gray text
- `--text-dim`: Dimmed text
- `--border-color`: Border highlight
