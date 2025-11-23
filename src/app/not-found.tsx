import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="text-center animate-fade-in">
        <div className="text-8xl mb-6">📭</div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl text-[var(--text-gray)] mb-8">
          Page Not Found
        </h2>
        <p className="text-[var(--text-gray)] mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--purple-primary)] to-[var(--pink-accent)] text-white font-semibold text-sm hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-lg bg-white/5 text-white font-medium text-sm hover:bg-white/10 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
