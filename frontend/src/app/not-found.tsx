'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const glitchRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = glitchRef?.current;
    if (!el) return;
    const interval = setInterval(() => {
      el.style.transform = `translate(${(Math.random() - 0.5) * 4}px, ${(Math.random() - 0.5) * 2}px)`;
      setTimeout(() => { if (el) el.style.transform = 'translate(0,0)'; }, 80);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#0B0F19]">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full top-1/4 left-1/4 w-96 h-96" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'gradOrb1 18s ease-in-out infinite' }} />
        <div className="absolute rounded-full bottom-1/4 right-1/4 w-80 h-80" style={{ background: 'radial-gradient(circle, rgba(91,140,255,0.12) 0%, transparent 70%)', filter: 'blur(50px)', animation: 'gradOrb2 22s ease-in-out infinite' }} />
        <div className="noise-overlay" />
      </div>

      <div className="relative z-10 max-w-2xl px-6 mx-auto text-center">
        {/* Glitch 404 */}
        <div className="relative mb-6">
          <h1
            ref={glitchRef}
            className="text-[160px] md:text-[200px] font-black leading-none tracking-tighter select-none"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #5B8CFF 50%, #A78BFA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transition: 'transform 0.08s ease',
              textShadow: 'none',
              filter: 'drop-shadow(0 0 40px rgba(139,92,246,0.4))',
            }}
          >
            404
          </h1>
          {/* Glitch layers */}
          <h1
            aria-hidden
            className="absolute inset-0 text-[160px] md:text-[200px] font-black leading-none tracking-tighter select-none opacity-30"
            style={{
              background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8C42 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transform: 'translate(3px, 0)',
              animation: 'glitchR 4s infinite',
            }}
          >
            404
          </h1>
        </div>

        {/* Glass card */}
        <div className="glass-card rounded-2xl border border-[rgba(139,92,246,0.2)] p-8 mb-8" style={{ backdropFilter: 'blur(20px)' }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)] mb-4">
            <span className="font-mono text-[11px] text-[#A78BFA] uppercase tracking-widest">Error 404</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#F0F4FF] mb-3">Page Not Found</h2>
          <p className="text-[#8B95B0] text-[15px] leading-relaxed">
            The route you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/home"
            className="btn-shimmer flex items-center gap-2 px-8 py-3.5 rounded-xl text-[14px] font-semibold text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/docs"
            className="glass-card flex items-center gap-2 px-8 py-3.5 rounded-xl text-[14px] font-medium text-[#8B95B0] hover:text-[#F0F4FF] border border-[rgba(255,255,255,0.08)] transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            View Docs
          </Link>
        </div>

        {/* Terminal hint */}
        <div className="max-w-sm mx-auto mt-10 code-block">
          <div className="code-header">
            <span className="code-dot code-dot-red" />
            <span className="code-dot code-dot-yellow" />
            <span className="code-dot code-dot-green" />
            <span className="ml-2 text-[10px] font-mono text-[#4A5270]">hint</span>
          </div>
          <div className="p-3 text-left">
            <div className="font-mono text-[12px] text-[#4A5270]">
              <span className="text-[#FF6B6B]">ERROR</span> <span className="text-[#F0F4FF]">404</span> — route not found
            </div>
            <div className="font-mono text-[12px] text-[#22D3A0] mt-1">→ try <Link href={"/home"}>/home</Link> or <Link href={"/docs"}>/docs</Link></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes glitchR {
          0%, 90%, 100% { transform: translate(3px, 0); }
          92% { transform: translate(-3px, 2px); }
          94% { transform: translate(3px, -2px); }
          96% { transform: translate(-2px, 0); }
        }
      `}</style>
    </div>
  );
}
