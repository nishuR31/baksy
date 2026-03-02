'use client';

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    gsap: any;
  }
}

const FLOATING_CARDS = [
  {
    id: 'auth',
    rotate: '-3deg',
    delay: 0,
    top: '18%',
    left: '2%',
    lines: [
      { color: '#A78BFA', text: 'import' },
      { color: '#5B8CFF', text: '  jwtAuth,' },
      { color: '#5B8CFF', text: '  refreshToken' },
      { color: '#22D3A0', text: '// ✓ JWT ready' },
    ],
    label: 'auth/middleware.ts',
  },
  {
    id: 'docker',
    rotate: '2deg',
    delay: -2.5,
    top: '55%',
    right: '1%',
    lines: [
      { color: '#22D3A0', text: 'FROM node:20-alpine' },
      { color: '#8B95B0', text: 'WORKDIR /app' },
      { color: '#FF8C42', text: 'RUN npm ci --prod' },
      { color: '#5B8CFF', text: 'CMD ["node","dist"]' },
    ],
    label: 'Dockerfile',
  },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load GSAP dynamically
    const loadGSAP = async () => {
      if (typeof window === 'undefined') return;

      // Inline GSAP via CDN script tag
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      script.onload = () => {
        const gsap = window.gsap;
        if (!gsap) return;

        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

        tl.fromTo(badgeRef.current,
          { opacity: 0, y: -20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 }
        )
        .fromTo(headlineRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2 },
          '-=0.4'
        )
        .fromTo(subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          '-=0.8'
        )
        .fromTo(ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          '-=0.2'
        )
        .fromTo('.float-card',
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.8, stagger: 0.2 },
          '-=0.6'
        );
      };
      document.head.appendChild(script);
    };

    loadGSAP();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* Gradient mesh */}
      <div className="gradient-mesh">
        <div className="mesh-blob mesh-blob-1" />
        <div className="mesh-blob mesh-blob-2" />
        <div className="mesh-blob mesh-blob-3" />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none dot-grid opacity-30" />

      {/* Floating code cards — desktop only */}
      {FLOATING_CARDS.map((card) => (
        <div
          key={card.id}
          className={`float-card hidden xl:block absolute z-10 code-block w-56 opacity-0`}
          style={{
            top: card.top,
            left: card.id === 'auth' ? card.left : undefined,
            right: card.id === 'docker' ? (card as any).right : undefined,
            '--rotate': card.rotate,
            transform: `rotate(${card.rotate})`,
            animationDelay: `${card.delay}s`,
            animation: `floatCard 5s ease-in-out infinite ${card.delay}s`,
          } as React.CSSProperties}
        >
          <div className="code-header">
            <span className="code-dot code-dot-red" />
            <span className="code-dot code-dot-yellow" />
            <span className="code-dot code-dot-green" />
            <span className="ml-2 text-[10px] font-mono text-[#4A5270]">{card.label}</span>
          </div>
          <div className="relative p-3 space-y-1">
            <div className="scan-line" />
            {card.lines.map((line, i) => (
              <div key={i} className="text-[11px] font-mono" style={{ color: line.color }}>
                {line.text}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 border border-[rgba(91,140,255,0.2)]"
        >
          <span className="relative flex w-2 h-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22D3A0] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22D3A0]" />
          </span>
          <span className="font-mono text-[11px] tracking-widest text-[#8B95B0] uppercase">
            v1.0 · Early Access · One-Time License
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="opacity-0 text-5xl md:text-7xl lg:text-[82px] font-bold leading-[1.05] tracking-tight text-[#F0F4FF] mb-6"
        >
          Ship Production-Ready{' '}
          <span className="text-gradient-blue">Backends</span>
          <br />
          in Minutes.
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          className="opacity-0 text-lg md:text-xl text-[#8B95B0] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          One CLI command scaffolds a Node.js backend with{' '}
          <span className="text-[#F0F4FF] font-medium">JWT auth</span>,{' '}
          <span className="text-[#F0F4FF] font-medium">Razorpay/Stripe</span>,{' '}
          <span className="text-[#F0F4FF] font-medium">BullMQ queues</span>,{' '}
          <span className="text-[#F0F4FF] font-medium">Pino logging</span>, and{' '}
          <span className="text-[#F0F4FF] font-medium">Docker</span> — pre-configured and production-first.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-col items-center justify-center gap-4 mb-12 opacity-0 sm:flex-row">
          <a
            href="#pricing"
            className="btn-shimmer flex items-center gap-2 px-8 py-4 rounded-xl text-[15px] font-semibold text-white"
          >
            Buy Now — Rs{Number(process.env.NEXT_PUBLIC_OFFERPRICE)}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-8 py-4 rounded-xl text-[15px] font-medium text-[#8B95B0] glass-card border border-[rgba(255,255,255,0.08)] hover:text-[#F0F4FF] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            View Docs
          </a>
        </div>

        {/* Terminal preview */}
        <div className="max-w-lg mx-auto mb-10 code-block">
          <div className="code-header">
            <span className="code-dot code-dot-red" />
            <span className="code-dot code-dot-yellow" />
            <span className="code-dot code-dot-green" />
            <span className="ml-2 text-[11px] font-mono text-[#4A5270]">terminal</span>
          </div>
          <div className="p-4 text-left">
            <div className="font-mono text-[13px]">
              <span className="text-[#22D3A0]">$ </span>
              <span className="text-[#F0F4FF]">npx nishu-backend init my-saas</span>
            </div>
            <div className="mt-2 space-y-1 text-[12px] font-mono text-[#4A5270]">
              <div><span className="text-[#22D3A0]">✓</span> Auth module scaffolded</div>
              <div><span className="text-[#22D3A0]">✓</span> Razorpay webhooks configured</div>
              <div><span className="text-[#22D3A0]">✓</span> BullMQ + Redis workers ready</div>
              <div><span className="text-[#22D3A0]">✓</span> Docker Compose generated</div>
              <div className="text-[#5B8CFF] mt-1">
                🚀 Project ready in 4.2s
                <span className="cursor-blink text-[#F0F4FF]">|</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div ref={scrollRef} className="opacity-0 flex flex-col items-center gap-2 text-[#4A5270]">
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll to explore</span>
          <div className="scroll-indicator">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}