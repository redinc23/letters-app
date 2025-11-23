import { ReactNode } from "react";

interface GridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: number;
  className?: string;
}

const colsClasses = {
  1: "grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export function Grid({ children, cols = 1, gap = 5, className = "" }: GridProps) {
  return (
    <div className={`grid ${colsClasses[cols]} gap-${gap} ${className}`}>
      {children}
    </div>
  );
}

interface FlexProps {
  children: ReactNode;
  direction?: "row" | "col";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  gap?: number;
  wrap?: boolean;
  className?: string;
}

export function Flex({
  children,
  direction = "row",
  align = "start",
  justify = "start",
  gap = 0,
  wrap = false,
  className = "",
}: FlexProps) {
  const directionClass = direction === "col" ? "flex-col" : "flex-row";
  const alignClass = `items-${align}`;
  const justifyClass = `justify-${justify}`;
  const gapClass = gap > 0 ? `gap-${gap}` : "";
  const wrapClass = wrap ? "flex-wrap" : "";

  return (
    <div className={`flex ${directionClass} ${alignClass} ${justifyClass} ${gapClass} ${wrapClass} ${className}`}>
      {children}
    </div>
  );
}

interface StackProps {
  children: ReactNode;
  spacing?: number;
  className?: string;
}

export function Stack({ children, spacing = 4, className = "" }: StackProps) {
  return (
    <div className={`space-y-${spacing} ${className}`}>
      {children}
    </div>
  );
}
