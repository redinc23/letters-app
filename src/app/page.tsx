import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="max-w-[1000px] mx-auto px-5">
      <Navigation />

      {/* Main Header */}
      <header className="text-center mb-10">
        <div className="inline-block py-3 px-9 border-2 border-[var(--orange-accent)] rounded-[50px] mb-3">
          <h1 className="text-[26px] font-bold tracking-[2px]">LETTERS CITY</h1>
        </div>
        <p className="text-[var(--text-gray)] text-sm mb-5">Private. Encrypted for you</p>
        <Link href="/login" className="inline-block py-3 px-8 rounded-lg font-semibold text-sm bg-white text-[var(--bg-dark)] hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(255,255,255,0.2)] transition-all">
          SIGN IN
        </Link>
      </header>

      {/* Welcome Section */}
      <section className="bg-[var(--bg-card)] rounded-[20px] p-8 mb-8 text-center border border-white/5 animate-fade-in">
        <h2 className="text-[22px] mb-2">Welcome to Letters</h2>
        <p className="text-[var(--text-gray)] text-sm">Your elegant email solution</p>
      </section>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-5 mb-8 animate-fade-in">
        {/* Microsoft Outlook Card */}
        <div className="bg-[var(--bg-card)] rounded-[20px] p-9 border border-white/5 hover:border-[var(--border-color)] hover:translate-y-[-3px] transition-all flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f] rounded-[15px] p-8 text-center min-h-[180px] flex flex-col justify-center">
            <div className="text-5xl text-[#64b5f6] mb-4">📧</div>
            <h3 className="text-lg mb-2">Microsoft Outlook</h3>
            <p className="text-[13px] text-white/70">Connect seamlessly</p>
          </div>
          <div className="flex-1">
            <h3 className="text-xl mb-3">Welcome to Microsoft Outlook</h3>
            <p className="text-[var(--text-gray)] text-sm leading-relaxed">Connect your email for seamless management and enhanced productivity.</p>
            <ul className="list-none mt-4 space-y-2">
              <li className="text-[var(--text-gray)] text-[13px] pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-[var(--purple-primary)]">Real-time sync</li>
              <li className="text-[var(--text-gray)] text-[13px] pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-[var(--purple-primary)]">Smart organization</li>
              <li className="text-[var(--text-gray)] text-[13px] pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-[var(--purple-primary)]">Calendar integration</li>
            </ul>
          </div>
        </div>

        {/* Remote Focus Card */}
        <div className="bg-[var(--bg-card)] rounded-[20px] p-9 border border-white/5 hover:border-[var(--border-color)] hover:translate-y-[-3px] transition-all flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 bg-gradient-to-br from-[#2d3748] to-[#1a202c] rounded-[15px] p-8 text-center min-h-[180px] flex flex-col justify-center">
            <div className="text-5xl text-[#f6ad55] mb-4">🖼️</div>
            <h3 className="text-lg mb-2">Remote Focus</h3>
            <p className="text-[13px] text-white/70">Stay productive anywhere</p>
          </div>
          <div className="flex-1">
            <h3 className="text-xl mb-3">Remote Focus</h3>
            <p className="text-[var(--text-gray)] text-sm leading-relaxed">Work from anywhere with powerful remote access and collaboration tools.</p>
            <ul className="list-none mt-4 space-y-2">
              <li className="text-[var(--text-gray)] text-[13px] pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-[var(--purple-primary)]">Secure access</li>
              <li className="text-[var(--text-gray)] text-[13px] pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-[var(--purple-primary)]">Team collaboration</li>
              <li className="text-[var(--text-gray)] text-[13px] pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-[var(--purple-primary)]">File sharing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Seamless Connections */}
      <section className="bg-[var(--bg-card)] border-2 border-[var(--border-color)] rounded-[20px] p-10 mb-8 animate-fade-in">
        <h2 className="text-[26px] mb-3 text-center">Seamless Connections</h2>
        <p className="text-[var(--text-gray)] text-center text-sm mb-9">Letters seamlessly integrates with your existing workflow and favorite tools</p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-[60px] h-[60px] bg-gradient-to-br from-[var(--purple-primary)] to-[var(--purple-dark)] rounded-[15px] flex items-center justify-center mx-auto mb-4 text-[28px]">📱</div>
            <h4 className="text-base mb-2">Mobile</h4>
            <p className="text-[var(--text-gray)] text-[13px] leading-normal">Use on any mobile device for on-the-go access</p>
          </div>
          <div className="text-center">
            <div className="w-[60px] h-[60px] bg-gradient-to-br from-[var(--purple-primary)] to-[var(--purple-dark)] rounded-[15px] flex items-center justify-center mx-auto mb-4 text-[28px]">🖥️</div>
            <h4 className="text-base mb-2">Desktop</h4>
            <p className="text-[var(--text-gray)] text-[13px] leading-normal">Powerful desktop apps for maximum productivity</p>
          </div>
          <div className="text-center">
            <div className="w-[60px] h-[60px] bg-gradient-to-br from-[var(--purple-primary)] to-[var(--purple-dark)] rounded-[15px] flex items-center justify-center mx-auto mb-4 text-[28px]">☁️</div>
            <h4 className="text-base mb-2">Google Drive</h4>
            <p className="text-[var(--text-gray)] text-[13px] leading-normal">Access your files seamlessly with our integration</p>
          </div>
        </div>
      </section>

      {/* Popular Integrations */}
      <section className="mb-8 animate-fade-in">
        <h2 className="text-[26px] text-center mb-2">Popular Integrations</h2>
        <p className="text-[var(--text-gray)] text-center text-sm mb-8">Connect with your favorite tools and services</p>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-[var(--bg-card)] rounded-[20px] p-9 text-center border border-white/5 hover:border-[var(--border-color)] hover:translate-y-[-5px] transition-all">
            <div className="w-[70px] h-[70px] bg-gradient-to-br from-[var(--purple-primary)] to-[var(--pink-accent)] rounded-[18px] flex items-center justify-center mx-auto mb-5 text-[35px]">💬</div>
            <h3 className="text-lg mb-2">Slack</h3>
            <p className="text-[var(--text-gray)] text-[13px] leading-relaxed">Get instant notifications and updates directly in your Slack workspace</p>
          </div>
          <div className="bg-[var(--bg-card)] rounded-[20px] p-9 text-center border border-white/5 hover:border-[var(--border-color)] hover:translate-y-[-5px] transition-all">
            <div className="w-[70px] h-[70px] bg-gradient-to-br from-[var(--purple-primary)] to-[var(--pink-accent)] rounded-[18px] flex items-center justify-center mx-auto mb-5 text-[35px]">☁️</div>
            <h3 className="text-lg mb-2">Google Drive</h3>
            <p className="text-[var(--text-gray)] text-[13px] leading-relaxed">Seamlessly attach and access files from your Google Drive</p>
          </div>
          <div className="bg-[var(--bg-card)] rounded-[20px] p-9 text-center border border-white/5 hover:border-[var(--border-color)] hover:translate-y-[-5px] transition-all">
            <div className="w-[70px] h-[70px] bg-gradient-to-br from-[var(--purple-primary)] to-[var(--pink-accent)] rounded-[18px] flex items-center justify-center mx-auto mb-5 text-[35px]">📦</div>
            <h3 className="text-lg mb-2">Dropbox</h3>
            <p className="text-[var(--text-gray)] text-[13px] leading-relaxed">Connect your Dropbox account for easy file sharing</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="mb-12 animate-fade-in">
        <h2 className="text-[26px] text-center mb-2">Exclusive Membership</h2>
        <p className="text-[var(--text-gray)] text-center text-sm mb-9">Select the tier that best complements your lifestyle. 30-day trial included</p>
        <div className="grid md:grid-cols-3 gap-5">
          {/* Essentials */}
          <div className="bg-[var(--bg-card)] rounded-[20px] p-9 border border-white/5 hover:translate-y-[-5px] transition-all">
            <div className="mb-6">
              <h3 className="text-[22px] mb-2">Essentials</h3>
              <p className="text-[var(--text-gray)] text-[13px] mb-6">For the discerning individual</p>
            </div>
            <div className="text-[46px] font-extrabold mb-1">$0<span className="text-[15px] font-medium text-[var(--text-gray)]">/month</span></div>
            <p className="text-[var(--text-dim)] text-xs mb-6">Free forever</p>
            <ul className="list-none mb-8 space-y-2">
              <li className="text-[var(--text-gray)] text-sm flex items-start gap-2"><span className="text-[var(--purple-primary)]">✓</span> 20 GB refined storage</li>
              <li className="text-[var(--text-gray)] text-sm flex items-start gap-2"><span className="text-[var(--purple-primary)]">✓</span> Elegant interface</li>
              <li className="text-[var(--text-gray)] text-sm flex items-start gap-2"><span className="text-[var(--purple-primary)]">✓</span> Standard security</li>
              <li className="text-[var(--text-gray)] text-sm flex items-start gap-2"><span className="text-[var(--purple-primary)]">✓</span> Priority support</li>
              <li className="text-[var(--text-dim)] text-sm flex items-start gap-2"><span className="text-[var(--text-dim)]">✕</span> Advanced integrations</li>
              <li className="text-[var(--text-dim)] text-sm flex items-start gap-2"><span className="text-[var(--text-dim)]">✕</span> Custom domain</li>
            </ul>
            <button className="w-full py-3 rounded-lg bg-[var(--purple-primary)] text-white font-semibold text-sm hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] transition-all">Get Started</button>
          </div>

          {/* Signature - Featured */}
          <div className="bg-gradient-to-b from-[var(--purple-primary)] to-[var(--pink-accent)] rounded-[20px] p-9 hover:translate-y-[-5px] transition-all relative">
            <div className="absolute -top-3 right-5 bg-[var(--orange-accent)] text-white px-4 py-1 rounded-xl text-[11px] font-bold tracking-wider">POPULAR</div>
            <div className="mb-6">
              <h3 className="text-[22px] mb-2">Signature</h3>
              <p className="text-white/80 text-[13px] mb-6">For the professional connoisseur</p>
            </div>
            <div className="text-[46px] font-extrabold mb-1">$14<span className="text-[15px] font-medium text-white/80">/month</span></div>
            <p className="text-white/70 text-xs mb-6">Billed monthly</p>
            <ul className="list-none mb-8 space-y-2">
              <li className="text-white/95 text-sm flex items-start gap-2"><span className="text-white">✓</span> 100 GB premium storage</li>
              <li className="text-white/95 text-sm flex items-start gap-2"><span className="text-white">✓</span> All Essentials features</li>
              <li className="text-white/95 text-sm flex items-start gap-2"><span className="text-white">✓</span> Advanced security</li>
              <li className="text-white/95 text-sm flex items-start gap-2"><span className="text-white">✓</span> Custom domain</li>
              <li className="text-white/95 text-sm flex items-start gap-2"><span className="text-white">✓</span> Full integrations</li>
              <li className="text-white/95 text-sm flex items-start gap-2"><span className="text-white">✓</span> Dedicated support</li>
            </ul>
            <button className="w-full py-3 rounded-lg bg-white text-[var(--purple-primary)] font-semibold text-sm hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] transition-all">Upgrade Now</button>
          </div>

          {/* Enterprise */}
          <div className="bg-[var(--bg-card)] rounded-[20px] p-9 border border-white/5 hover:translate-y-[-5px] transition-all">
            <div className="mb-6">
              <h3 className="text-[22px] mb-2">Enterprise</h3>
              <p className="text-[var(--text-gray)] text-[13px] mb-6">For organizations of distinction</p>
            </div>
            <div className="text-[46px] font-extrabold mb-1">$28<span className="text-[15px] font-medium text-[var(--text-gray)]">/user/mo</span></div>
            <p className="text-[var(--text-dim)] text-xs mb-6">Billed annually</p>
            <ul className="list-none mb-8 space-y-2">
              <li className="text-[var(--text-gray)] text-sm flex items-start gap-2"><span className="text-[var(--purple-primary)]">✓</span> Unlimited storage</li>
              <li className="text-[var(--text-gray)] text-sm flex items-start gap-2"><span className="text-[var(--purple-primary)]">✓</span> All Signature features</li>
              <li className="text-[var(--text-gray)] text-sm flex items-start gap-2"><span className="text-[var(--purple-primary)]">✓</span> Admin controls</li>
              <li className="text-[var(--text-gray)] text-sm flex items-start gap-2"><span className="text-[var(--purple-primary)]">✓</span> Team collaboration</li>
              <li className="text-[var(--text-gray)] text-sm flex items-start gap-2"><span className="text-[var(--purple-primary)]">✓</span> Custom branding</li>
              <li className="text-[var(--text-gray)] text-sm flex items-start gap-2"><span className="text-[var(--purple-primary)]">✓</span> 24/7 premium support</li>
            </ul>
            <button className="w-full py-3 rounded-lg bg-[var(--purple-primary)] text-white font-semibold text-sm hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] transition-all">Contact Sales</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
