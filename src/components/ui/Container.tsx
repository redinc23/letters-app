import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
}

const maxWidthClasses = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
  full: "max-w-full",
};

export function Container({ children, maxWidth = "lg", className = "" }: ContainerProps) {
  return (
    <div className={`${maxWidthClasses[maxWidth]} mx-auto px-5 ${className}`}>
      {children}
    </div>
  );
}

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return <div className="max-w-[1000px] mx-auto px-5">{children}</div>;
}

interface DashboardLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function DashboardLayout({ sidebar, children }: DashboardLayoutProps) {
  return <div className="min-h-screen flex">{sidebar}{children}</div>;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <header className="bg-[var(--bg-card)] border-b border-white/5 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-sm text-[var(--text-gray)]">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </header>
  );
}

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ title, subtitle, children, className = "" }: SectionProps) {
  return (
    <section className={`mb-8 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
          {subtitle && <p className="text-sm text-[var(--text-gray)]">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
