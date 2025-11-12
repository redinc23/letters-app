import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="flex items-center gap-10 py-5 mb-10">
      <Link href="/" className="flex items-center gap-2 no-underline">
        <div className="w-6 h-6 bg-[var(--purple-primary)] rounded-md flex items-center justify-center text-white text-sm">
          ✉
        </div>
        <span className="text-[var(--text-light)] text-sm font-semibold">Letters</span>
      </Link>
      <ul className="flex gap-8 list-none">
        <li>
          <Link 
            href="#features" 
            className="text-[var(--text-gray)] no-underline text-sm font-medium hover:text-[var(--text-light)] transition-colors"
          >
            Features
          </Link>
        </li>
        <li>
          <Link 
            href="#pricing" 
            className="text-[var(--text-gray)] no-underline text-sm font-medium hover:text-[var(--text-light)] transition-colors"
          >
            Pricing
          </Link>
        </li>
      </ul>
    </nav>
  );
}
