import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '/home#features' },
    { label: 'How It Works', href: '/home#how-it-works' },
    { label: 'Pricing', href: '/home#pricing' },
    { label: 'Payment', href: '/payment' },
  ],
  Resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Settings', href: '/settings' },
    { label: 'GitHub', href: '/github' },
    // { label: 'Changelog', href: '#' },
  ],
  Company: [
    { label: 'Contact', href: '/home#contact' },
    // { label: 'Twitter', href: 'https://twitter.com' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgba(139,92,246,0.15)] bg-[#0B0F19] overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-50" />
      <div className="px-6 py-16 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 mb-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/home" className="flex items-center gap-3 mb-4">
              <AppLogo size={24} />
              <span className="font-mono font-semibold text-[14px] text-[#F0F4FF]">Baksy</span>
            </Link>
            <p className="text-[13px] text-[#4A5270] leading-relaxed mb-5">
              Ship production-ready Node.js backends in minutes. One CLI, zero boilerplate.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="/github"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-[#4A5270] hover:text-[#A78BFA] hover:border-[rgba(139,92,246,0.3)] transition-all duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_MAIL}`}
                aria-label="Email"
                className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-[#4A5270] hover:text-[#A78BFA] hover:border-[rgba(139,92,246,0.3)] transition-all duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 6.81A2 2 0 0 1 4 6h16a2 2 0 0 1 1.99.81l-9.99 7.5-9.99-7.5zm-.01 2.18V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8.99l-9.29 6.97a1 1 0 0 1-1.42 0L2 8.99z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS)?.map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#4A5270] mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links?.map((link) => (
                  <li key={link?.label}>
                    <Link
                      href={link?.href}
                      className="text-[13px] text-[#8B95B0] hover:text-[#F0F4FF] transition-colors duration-200"
                    >
                      {link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[rgba(255,255,255,0.05)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[12px] text-[#4A5270] font-mono">
            © 2026 Baksy. All rights reserved.
          </span>
          <span className="text-[12px] text-[#4A5270] font-mono">Built with ❤️ for developers</span>
        </div>
      </div>
    </footer>
  );
}
