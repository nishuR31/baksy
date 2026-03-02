'use client';

import React, { useEffect, useRef } from 'react';

const INCLUDED = [
  'JWT + Refresh Token Auth',
  'Razorpay + Stripe Integration',
  'BullMQ/RabbitMQ + Redis/Dragonfly Job Queues',
  'MongoDB or PostgreSQL (your choice)',
  'Role-Based Access Control',
  'Pino Structured Logging',
  'Docker + Docker Compose',
  'API Versioning + /health or /ping endpoint',
  'Zod and with env validation',
  'ESLint + Prettier + Husky',
  'Full TypeScript throughout',
  'Full JavaScript support too',
  'Lifetime updates included',
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  let offerPrice: number  | undefined = Number(process.env.NEXT_PUBLIC_OFFERPRICE) ;
  let price: number  | undefined = Number(process.env.NEXT_PUBLIC_PRICE) ;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef?.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer?.observe(el));

    return () => observer?.disconnect();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-28 px-6 relative bg-[#0B0F19]">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(91,140,255,0.06) 0%, transparent 70%)',
          }}
        />
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center animate-on-scroll">
          <div className="mb-4 section-label">// Pricing</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#F0F4FF] mb-4">
            One price. No subscription.
          </h2>
          <p className="text-[#8B95B0] text-lg">
            Pay once, use forever. All future updates included at no extra cost.
          </p>
        </div>

        {/* Pricing card */}
        <div className="animate-on-scroll pricing-glow glass-card rounded-2xl border border-[rgba(91,140,255,0.2)] overflow-hidden">
          {/* Top accent */}
          <div className="w-full accent-line" />

          <div className="p-8 md:p-10">
            {/* Badge */}
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center gap-2 text-[11px] font-mono px-3 py-1.5 rounded-full bg-[rgba(91,140,255,0.1)] text-[#5B8CFF] border border-[rgba(91,140,255,0.2)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5B8CFF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#5B8CFF]" />
                </span>
                Early Access Pricing
              </span>
              <span className="text-[11px] font-mono text-[#4A5270]">Lifetime License</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-6xl font-bold text-[#F0F4FF] tracking-tight">
                Rs{offerPrice}/-
              </span>
              <div>
                <div className="text-[#4A5270] line-through text-lg font-mono">Rs{price}/-</div>
                <div className="text-[12px] text-[#22D3A0] font-mono">
                  {Math.abs((100 * offerPrice) / price - 100)}% off launch
                </div>
              </div>
            </div>
            <p className="text-[13px] text-[#8B95B0] mb-8">
              One-time payment. No monthly fees. No per-project limits.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-1 gap-2 mb-8 sm:grid-cols-2">
              {INCLUDED?.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="flex-shrink-0"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="#22D3A0"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[13px] text-[#8B95B0]">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#"
              className="btn-shimmer w-full flex items-center justify-center gap-3 py-4 rounded-xl text-[15px] font-semibold text-white"
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
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Buy Now — Get Instant Access
            </a>

            <p className="mt-4 text-center text-[12px] text-[#4A5270] font-mono">
              Secure checkout · Instant download · 14-day refund policy
            </p>
          </div>
        </div>

        {/* Who it's for */}
        <div className="mt-12 animate-on-scroll" style={{ transitionDelay: '150ms' }}>
          <p className="text-center text-[12px] font-mono text-[#4A5270] mb-6 uppercase tracking-widest">
            Built for
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: '⚡', label: 'Indie Hackers', sub: 'Ship MVPs fast' },
              { icon: '🚀', label: 'SaaS Founders', sub: 'Skip the boilerplate' },
              { icon: '🔧', label: 'Backend Devs', sub: 'Consistent structure' },
              { icon: '🏢', label: 'Agencies', sub: 'Reuse across projects' },
            ]?.map((item) => (
              <div key={item?.label} className="p-4 text-center glass-card rounded-xl">
                <span className="block mb-2 text-xl">{item?.icon}</span>
                <div className="text-[13px] font-semibold text-[#F0F4FF] mb-0.5">{item?.label}</div>
                <div className="text-[11px] text-[#4A5270]">{item?.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
