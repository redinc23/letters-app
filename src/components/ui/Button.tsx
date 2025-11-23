import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses = "rounded-lg font-semibold transition-all";
  
  const variantClasses = {
    primary: "bg-[var(--purple-primary)] text-white hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)]",
    secondary: "bg-white/5 text-white hover:bg-white/10",
    ghost: "text-[var(--text-gray)] hover:text-white hover:bg-white/5",
    gradient: "bg-gradient-to-r from-[var(--purple-primary)] to-[var(--pink-accent)] text-white hover:translate-y-[-2px] hover:shadow-lg",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string | ReactNode;
  size?: "sm" | "md" | "lg";
}

export function IconButton({ icon, size = "md", className = "", ...props }: IconButtonProps) {
  const sizeClasses = {
    sm: "p-1.5 text-sm",
    md: "p-2 text-base",
    lg: "p-3 text-lg",
  };

  return (
    <button
      className={`hover:bg-white/5 rounded-lg transition-colors ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
}
