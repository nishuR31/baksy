'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';

const NAV_LINKS = [
  { label: 'Features', href: '/home#features' },
  { label: 'How It Works', href: '/home#how-it-works' },
  { label: 'Pricing', href: '/home#pricing' },
  { label: 'Docs', href: '/docs' },
  { label: 'Payment', href: '/payment' },
  { label: 'GitHub', href: '/github' },
  { label: 'How To Use', href: '/how-to-use' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[rgba(11,15,25,0.5)] backdrop-blur-md border-b border-[rgba(139,92,246,0.15)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 mx-auto max-w-7xl">
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-3 group">
            <AppLogo size={28} />
            <span className="font-mono font-semibold text-[15px] text-[#F0F4FF] tracking-tight group-hover:text-[#A78BFA] transition-colors">
              Baksy
            </span>
          </Link>

          {/* Nav links */}
          <nav className="items-center hidden md:flex gap-7">
            {NAV_LINKS?.map((item) => (
              <Link
                key={item?.label}
                href={item?.href}
                className={`text-[13px] font-medium transition-colors duration-200 tracking-wide ${
                  pathname === item?.href ? 'text-[#A78BFA]' : 'text-[#8B95B0] hover:text-[#F0F4FF]'
                }`}
              >
                {item?.label}
              </Link>
            ))}
            {/* GitHub link now in NAV_LINKS as /github */}
          </nav>

          {/* Right CTAs */}
          <div className="items-center hidden gap-3 md:flex">
            <Link
              href="/settings"
              className="p-2 rounded-lg text-[#8B95B0] hover:text-[#A78BFA] hover:bg-[rgba(139,92,246,0.1)] transition-all duration-200"
              title="Settings"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </Link>
            <Link
              href="/payment"
              className="btn-shimmer inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[13px] font-semibold text-white"
            >
              <span>Buy Now</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-[#8B95B0] hover:text-[#F0F4FF] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </header>
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="absolute top-0 right-0 h-full w-72 bg-[#0d0520] border-l border-[rgba(139,92,246,0.2)] p-6 pt-20"
            onClick={(e) => e?.stopPropagation()}
          >
            <nav className="flex flex-col gap-4">
              {NAV_LINKS?.map((item) => (
                <Link
                  key={item?.label}
                  href={item?.href}
                  className="text-[15px] font-medium text-[#8B95B0] hover:text-[#F0F4FF] transition-colors py-2 border-b border-[rgba(255,255,255,0.05)]"
                >
                  {item?.label}
                </Link>
              ))}
              <Link
                href="/settings"
                className="text-[15px] font-medium text-[#8B95B0] hover:text-[#A78BFA] transition-colors py-2 border-b border-[rgba(255,255,255,0.05)]"
              >
                ⚙️ Settings
              </Link>
              <Link
                href="/payment"
                className="btn-shimmer mt-4 flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-[14px] font-semibold text-white"
              >
                Buy Now — $49
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
