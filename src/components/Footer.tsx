import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-card)] rounded-t-[20px] px-10 pt-12 pb-8 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
        <div>
          <h3 className="text-base mb-5">Letters</h3>
          <p className="text-[var(--text-gray)] text-[13px] leading-relaxed">
            The pinnacle of email elegance, combining sophisticated design with uncompromising performance.
          </p>
        </div>

        <div>
          <h3 className="text-base mb-5">Product</h3>
          <ul className="list-none space-y-3">
            <li>
              <Link href="#" className="text-[var(--text-gray)] no-underline text-[13px] hover:text-[var(--text-light)] transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="text-[var(--text-gray)] no-underline text-[13px] hover:text-[var(--text-light)] transition-colors">
                Security
              </Link>
            </li>
            <li>
              <Link href="#" className="text-[var(--text-gray)] no-underline text-[13px] hover:text-[var(--text-light)] transition-colors">
                Integrations
              </Link>
            </li>
            <li>
              <Link href="#" className="text-[var(--text-gray)] no-underline text-[13px] hover:text-[var(--text-light)] transition-colors">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-base mb-5">Resources</h3>
          <ul className="list-none space-y-3">
            <li>
              <Link href="#" className="text-[var(--text-gray)] no-underline text-[13px] hover:text-[var(--text-light)] transition-colors">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#" className="text-[var(--text-gray)] no-underline text-[13px] hover:text-[var(--text-light)] transition-colors">
                Community
              </Link>
            </li>
            <li>
              <Link href="#" className="text-[var(--text-gray)] no-underline text-[13px] hover:text-[var(--text-light)] transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="text-[var(--text-gray)] no-underline text-[13px] hover:text-[var(--text-light)] transition-colors">
                API Docs
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 pt-6 text-center text-[var(--text-dim)] text-xs">
        <p>&copy; 2025 Letters. All rights reserved.</p>
      </div>
    </footer>
  );
}
