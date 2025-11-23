import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="text-sm text-[var(--text-gray)] block mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-2 rounded-lg bg-[var(--bg-dark)] border border-white/10 focus:border-[var(--purple-primary)] focus:outline-none transition-colors text-white ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

export function SearchInput({ onSearch, className = "", ...props }: SearchInputProps) {
  return (
    <input
      type="search"
      className={`px-4 py-2 rounded-lg bg-[var(--bg-dark)] border border-white/10 focus:border-[var(--purple-primary)] focus:outline-none transition-colors text-white ${className}`}
      {...props}
    />
  );
}

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  rows?: number;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, rows = 4, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="text-sm text-[var(--text-gray)] block mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={`w-full px-4 py-3 rounded-lg bg-[var(--bg-dark)] border border-white/10 focus:border-[var(--purple-primary)] focus:outline-none transition-colors text-white resize-y ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
