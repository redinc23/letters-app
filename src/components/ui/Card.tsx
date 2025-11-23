import { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false, ...props }: CardProps) {
  const hoverClasses = hover
    ? "hover:border-[var(--border-color)] hover:translate-y-[-3px]"
    : "";
  
  return (
    <div
      className={`bg-[var(--bg-card)] rounded-[20px] border border-white/5 transition-all ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  badge?: string;
}

export function StatCard({ icon, value, label, badge }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        {badge && <span className="text-xs text-[var(--text-gray)]">{badge}</span>}
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-[var(--text-gray)]">{label}</div>
    </Card>
  );
}

interface ActionCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
}

export function ActionCard({ icon, title, description, href, onClick }: ActionCardProps) {
  const CardContent = () => (
    <>
      <div className="w-12 h-12 bg-gradient-to-br from-[var(--purple-primary)] to-[var(--pink-accent)] rounded-[15px] flex items-center justify-center mb-4 text-2xl">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-[var(--text-gray)]">{description}</p>
    </>
  );

  const baseClasses = "p-6 cursor-pointer";

  if (href) {
    return (
      <a href={href}>
        <Card hover className={baseClasses}>
          <CardContent />
        </Card>
      </a>
    );
  }

  return (
    <Card hover className={baseClasses} onClick={onClick}>
      <CardContent />
    </Card>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  gradient?: string;
  items?: string[];
}

export function FeatureCard({ icon, title, description, gradient, items }: FeatureCardProps) {
  const gradientClass = gradient || "from-[var(--purple-primary)] to-[var(--pink-accent)]";
  
  return (
    <Card hover className="p-9 flex flex-col md:flex-row gap-6 items-center">
      <div className={`flex-1 bg-gradient-to-br ${gradientClass} rounded-[15px] p-8 text-center min-h-[180px] flex flex-col justify-center`}>
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-lg mb-2">{title}</h3>
        <p className="text-[13px] text-white/70">{description}</p>
      </div>
      {items && (
        <div className="flex-1">
          <h3 className="text-xl mb-3">{title}</h3>
          <p className="text-[var(--text-gray)] text-sm leading-relaxed mb-4">{description}</p>
          <ul className="list-none space-y-2">
            {items.map((item, index) => (
              <li
                key={index}
                className="text-[var(--text-gray)] text-[13px] pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-[var(--purple-primary)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}

interface PricingCardProps {
  name: string;
  description: string;
  price: string | number;
  period: string;
  periodNote: string;
  features: Array<{ text: string; included: boolean }>;
  buttonText: string;
  buttonAction?: () => void;
  featured?: boolean;
  badge?: string;
}

export function PricingCard({
  name,
  description,
  price,
  period,
  periodNote,
  features,
  buttonText,
  buttonAction,
  featured = false,
  badge,
}: PricingCardProps) {
  if (featured) {
    return (
      <div className="bg-gradient-to-b from-[var(--purple-primary)] to-[var(--pink-accent)] rounded-[20px] p-9 hover:translate-y-[-5px] transition-all relative">
        {badge && (
          <div className="absolute -top-3 right-5 bg-[var(--orange-accent)] text-white px-4 py-1 rounded-xl text-[11px] font-bold tracking-wider">
            {badge}
          </div>
        )}
        <div className="mb-6">
          <h3 className="text-[22px] mb-2">{name}</h3>
          <p className="text-white/80 text-[13px] mb-6">{description}</p>
        </div>
        <div className="text-[46px] font-extrabold mb-1">
          ${price}
          <span className="text-[15px] font-medium text-white/80">{period}</span>
        </div>
        <p className="text-white/70 text-xs mb-6">{periodNote}</p>
        <ul className="list-none mb-8 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="text-white/95 text-sm flex items-start gap-2">
              <span className="text-white">✓</span> {feature.text}
            </li>
          ))}
        </ul>
        <button
          onClick={buttonAction}
          className="w-full py-3 rounded-lg bg-white text-[var(--purple-primary)] font-semibold text-sm hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] transition-all"
        >
          {buttonText}
        </button>
      </div>
    );
  }

  return (
    <Card className="p-9 hover:translate-y-[-5px]">
      <div className="mb-6">
        <h3 className="text-[22px] mb-2">{name}</h3>
        <p className="text-[var(--text-gray)] text-[13px] mb-6">{description}</p>
      </div>
      <div className="text-[46px] font-extrabold mb-1">
        ${price}
        <span className="text-[15px] font-medium text-[var(--text-gray)]">{period}</span>
      </div>
      <p className="text-[var(--text-dim)] text-xs mb-6">{periodNote}</p>
      <ul className="list-none mb-8 space-y-2">
        {features.map((feature, index) => (
          <li
            key={index}
            className={`text-sm flex items-start gap-2 ${
              feature.included ? "text-[var(--text-gray)]" : "text-[var(--text-dim)]"
            }`}
          >
            <span className={feature.included ? "text-[var(--purple-primary)]" : "text-[var(--text-dim)]"}>
              {feature.included ? "✓" : "✕"}
            </span>
            {feature.text}
          </li>
        ))}
      </ul>
      <button
        onClick={buttonAction}
        className="w-full py-3 rounded-lg bg-[var(--purple-primary)] text-white font-semibold text-sm hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] transition-all"
      >
        {buttonText}
      </button>
    </Card>
  );
}
