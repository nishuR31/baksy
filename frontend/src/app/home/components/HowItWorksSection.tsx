'use client';

import React, { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    number: '01',
    title: 'Run the CLI',
    desc: 'Install once globally and run the init command. Answer a few prompts about your stack.',
    code: `$ npm install -g baksy

$ baksy init my-saas-api

? Database: MongoDB / PostgreSQL
? Auth: JWT + Refresh Tokens
? Payments: Razorpay + Stripe
? Jobs: BullMQ + Redis
? Logging: Pino (structured)

Scaffolding project...`,
    highlights: [
      { word: 'baksy init', color: '#5B8CFF' },
      { word: 'Scaffolding project...', color: '#22D3A0' },
    ],
  },
  {
    number: '02',
    title: 'Configure your env',
    desc: 'A single .env.example with every variable documented. Zod validates on startup — no silent misconfigs.',
    code: `# .env (auto-generated)
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/mydb

# Auth
JWT_SECRET=your-secret-here
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Payments
RAZORPAY_KEY_ID=rzp_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Redis
REDIS_URL=redis://localhost:6379`,
    highlights: [],
  },
  {
    number: '03',
    title: 'Build your product',
    desc: 'Every module is wired up. Add your business logic to the service layer and ship.',
    code: `$ npm run dev
[info] Server running on :3000
[info] MongoDB connected
[info] Redis connected
[info] BullMQ workers started

# Your endpoints are ready:
GET  /health          → 200 OK
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/payments/webhook
GET  /api/v1/users (RBAC: admin)

# Build for production:
$ docker compose up --build`,
    highlights: [
      { word: '[info]', color: '#22D3A0' },
      { word: '200 OK', color: '#22D3A0' },
    ],
  },
];

function CodeReveal({ code, isActive }: { code: string; isActive: boolean }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const lines = code.split('\n');

  useEffect(() => {
    if (!isActive) {
      setVisibleLines(0);
      return;
    }
    setVisibleLines(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= lines.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [isActive, lines.length]);

  return (
    <div className="h-full code-block">
      <div className="code-header">
        <span className="code-dot code-dot-red" />
        <span className="code-dot code-dot-yellow" />
        <span className="code-dot code-dot-green" />
      </div>
      <pre className="p-5 text-[12px] font-mono leading-relaxed overflow-auto h-[calc(100%-40px)]">
        {lines.slice(0, visibleLines).map((line, i) => {
          const isComment = line.trim().startsWith('#');
          const isPrompt = line.startsWith('$');
          const isInfo = line.includes('[info]');
          return (
            <div
              key={i}
              className="whitespace-pre"
              style={{
                color: isComment
                  ? '#4A5270'
                  : isPrompt
                  ? '#22D3A0'
                  : isInfo
                  ? '#5B8CFF' :'#F0F4FF',
              }}
            >
              {line || ' '}
            </div>
          );
        })}
        {isActive && visibleLines < lines.length && (
          <span className="cursor-blink text-[#5B8CFF]">|</span>
        )}
      </pre>
    </div>
  );
}

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Trigger code reveal when step becomes active
  useEffect(() => {
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = stepRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveStep(idx);
          }
        });
      },
      { threshold: 0.5 }
    );

    stepRefs.current.forEach((el) => el && stepObserver.observe(el));
    return () => stepObserver.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-28 px-6 relative bg-[#0F1524]">
      <div className="absolute inset-0 pointer-events-none dot-grid opacity-20" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center animate-on-scroll">
          <div className="mb-4 section-label">// How It Works</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#F0F4FF] mb-4">
            From zero to production in 3 steps.
          </h2>
          <p className="text-[#8B95B0] text-lg max-w-xl mx-auto">
            No tutorials. No boilerplate hunting. Just run, configure, and build.
          </p>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Steps */}
          <div className="space-y-0">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { stepRefs.current[i] = el; }}
                className="relative pb-12 animate-on-scroll pl-14"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Step line */}
                {i < STEPS.length - 1 && (
                  <div className="absolute left-5 top-12 bottom-0 w-px bg-gradient-to-b from-[rgba(91,140,255,0.4)] to-transparent" />
                )}

                {/* Step number circle */}
                <div
                  className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-mono font-bold transition-all duration-300 ${
                    activeStep === i
                      ? 'bg-[#5B8CFF] text-white shadow-[0_0_20px_rgba(91,140,255,0.5)]'
                      : 'glass-card text-[#4A5270] border border-[rgba(255,255,255,0.08)]'
                  }`}
                >
                  {step.number}
                </div>

                <div
                  className="cursor-pointer"
                  onClick={() => setActiveStep(i)}
                >
                  <h3 className={`text-[18px] font-semibold mb-2 transition-colors duration-200 ${activeStep === i ? 'text-[#F0F4FF]' : 'text-[#8B95B0]'}`}>
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-[#8B95B0] leading-relaxed max-w-sm">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Code preview */}
          <div className="animate-on-scroll sticky top-24 h-[420px]" style={{ transitionDelay: '200ms' }}>
            <CodeReveal
              key={activeStep}
              code={STEPS[activeStep].code}
              isActive={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}