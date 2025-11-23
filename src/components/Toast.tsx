"use client";

import { Toaster } from "react-hot-toast";

export default function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "var(--bg-card)",
          color: "var(--text-light)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          padding: "16px",
        },
        success: {
          iconTheme: {
            primary: "var(--purple-primary)",
            secondary: "white",
          },
        },
        error: {
          iconTheme: {
            primary: "var(--pink-accent)",
            secondary: "white",
          },
        },
      }}
    />
  );
}
