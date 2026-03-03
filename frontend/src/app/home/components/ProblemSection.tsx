'use client';

import React, { useEffect, useRef } from 'react';

const PROBLEMS = [
  {
    icon: '🔐',
    title: 'Rewriting auth every project',
    desc: 'JWT setup, refresh token rotation, session invalidation — you\'ve written this 12 times. It still breaks in prod.',
    tag: '~8 hrs wasted',
  },
  {
    icon: '💳',
    title: 'Payment webhook nightmares',
    desc: 'Stripe or Razorpay webhook signature verification, idempotency, retry logic. One missed edge case = lost revenue.',
    tag: '~6 hrs wasted',
  },
  {
    icon: '🗂️',
    title: 'Inconsistent folder structure',
    desc: 'Every project looks different. Controllers in routes, services mixed with models, no clear domain boundaries.',
    tag: 'Maintenance debt',
  },
  {
    icon: '📋',
    title: 'No structured logging in prod',
    desc: 'console.log() doesn\'t cut it. JSON-structured logs with request IDs, trace context, and log levels aren\'t optional.',
    tag: 'Blind in production',
  },
  {
    icon: '🐳',
    title: 'Deployment chaos',
    desc: 'Works on localhost, breaks on EC2. No Dockerfile, no compose file, no env validation, no health check endpoint.',
    tag: 'Hours of debugging',
  },
  {
    icon: '⚙️',
    title: 'Background jobs bolted on late',
    desc: 'Email queues, scheduled tasks, and retry logic added as afterthoughts. BullMQ configuration is non-trivial to get right.',
    tag: 'Brittle jobs',
  },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="problem" ref={sectionRef} className="py-28 px-6 relative bg-[#0B0F19]">
      {/* Subtle top separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-[rgba(255,255,255,0.06)]" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="section-label mb-4">// The Problem</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#F0F4FF] mb-4">
            Every backend project starts the same way.
          </h2>
          <p className="text-[#8B95B0] text-lg max-w-2xl mx-auto leading-relaxed">
            You spend the first 2–3 weeks on infrastructure that has nothing to do with your actual product.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROBLEMS.map((problem, i) => (
            <div
              key={problem.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="animate-on-scroll problem-card glass-card rounded-xl p-6 cursor-default"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0 mt-0.5">{problem.icon}</span>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#F0F4FF] mb-2 leading-snug">
                    {problem.title}
                  </h3>
                  <p className="text-[13px] text-[#8B95B0] leading-relaxed mb-3">
                    {problem.desc}
                  </p>
                  <span className="inline-block text-[11px] font-mono px-2.5 py-1 rounded-md bg-[rgba(255,107,107,0.1)] text-[#FF6B6B] border border-[rgba(255,107,107,0.2)]">
                    {problem.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary stat */}
        <div className="mt-12 animate-on-scroll text-center">
          <div className="inline-flex items-center gap-3 glass-card rounded-full px-8 py-4 border border-[rgba(255,107,107,0.15)]">
            <span className="text-[#FF6B6B] text-2xl font-bold font-mono">~3 weeks</span>
            <span className="text-[#8B95B0] text-[14px]">of boilerplate before you write a single line of business logic.</span>
          </div>
        </div>
      </div>
    </section>
  );
}