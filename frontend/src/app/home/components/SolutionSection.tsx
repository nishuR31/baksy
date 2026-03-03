'use client';

import React, { useEffect, useRef } from 'react';

const SOLUTIONS = [
  {
    icon: '⚡',
    title: 'Interactive setup in 30 seconds',
    desc: 'CLI prompts ask what you need — MongoDB or PostgreSQL, Stripe or Razorpay, JWT or sessions. Only what you pick is scaffolded.',
    tag: 'Interactive CLI',
    color: '#5B8CFF',
  },
  {
    icon: '🏗️',
    title: 'Clean domain-driven architecture',
    desc: 'Every module has its own routes, controllers, services, and validators. No circular deps, no god files.',
    tag: 'Modular structure',
    color: '#A78BFA',
  },
  {
    icon: '🚀',
    title: 'Production-first, not dev-first',
    desc: 'Env validation with Zod, structured logging with Pino, graceful shutdown handlers, and a /health endpoint out of the box.',
    tag: 'Production-ready',
    color: '#22D3A0',
  },
  {
    icon: '🐳',
    title: 'Docker + Compose included',
    desc: 'Multi-stage Dockerfile, docker-compose.yml with Redis + DB services, .dockerignore, and prod-optimized build.',
    tag: 'Deploy-ready',
    color: '#FF8C42',
  },
  {
    icon: '🔒',
    title: 'No runtime conditionals',
    desc: 'Feature flags aren\'t implemented as if-else chains. Selected features are compiled into the project, not toggled at runtime.',
    tag: 'Clean output',
    color: '#22D3A0',
  },
  {
    icon: '📐',
    title: 'Pre-configured linting',
    desc: 'ESLint + Prettier with sensible TypeScript rules. Husky pre-commit hooks. Consistent code from day one.',
    tag: 'DX optimized',
    color: '#5B8CFF',
  },
];

const ARCH_TREE = `my-saas/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.validator.ts
│   │   ├── payments/
│   │   │   ├── payments.routes.ts
│   │   │   └── webhooks.handler.ts
│   │   └── jobs/
│   │       ├── email.queue.ts
│   │       └── email.worker.ts
│   ├── config/
│   │   ├── env.ts         # Zod-validated
│   │   └── database.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── error.ts
│   └── app.ts
├── Dockerfile
├── docker-compose.yml
└── .eslintrc.js`;

export default function SolutionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    const elements = sectionRef?.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer?.observe(el));

    return () => observer?.disconnect();
  }, []);

  return (
    <section id="solution" ref={sectionRef} className="py-28 px-6 relative bg-[#0F1524]">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="section-label mb-4">// The Solution</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#F0F4FF] mb-4">
            One command. A production-grade backend.
          </h2>
          <p className="text-[#8B95B0] text-lg max-w-2xl mx-auto leading-relaxed">
            NishuBackend generates exactly what you need — nothing more, nothing less.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: solution cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SOLUTIONS?.map((sol, i) => (
              <div
                key={sol?.title}
                className="animate-on-scroll solution-card glass-card rounded-xl p-5"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="text-xl block mb-3">{sol?.icon}</span>
                <h3 className="text-[14px] font-semibold text-[#F0F4FF] mb-1.5 leading-snug">
                  {sol?.title}
                </h3>
                <p className="text-[12px] text-[#8B95B0] leading-relaxed mb-3">
                  {sol?.desc}
                </p>
                <span
                  className="inline-block text-[10px] font-mono px-2 py-0.5 rounded border"
                  style={{
                    color: sol?.color,
                    borderColor: `${sol?.color}30`,
                    backgroundColor: `${sol?.color}10`,
                  }}
                >
                  {sol?.tag}
                </span>
              </div>
            ))}
          </div>

          {/* Right: architecture tree */}
          <div className="animate-on-scroll sticky top-24" style={{ transitionDelay: '200ms' }}>
            <div className="code-block">
              <div className="code-header">
                <span className="code-dot code-dot-red" />
                <span className="code-dot code-dot-yellow" />
                <span className="code-dot code-dot-green" />
                <span className="ml-2 text-[11px] font-mono text-[#4A5270]">project structure</span>
              </div>
              <pre className="p-5 text-[12px] font-mono leading-relaxed overflow-x-auto">
                {ARCH_TREE?.split('\n')?.map((line, i) => {
                  const isDir = line?.includes('/') && !line?.includes('.') && !line?.includes('#');
                  const isComment = line?.includes('#');
                  const isFile = line?.includes('.');
                  return (
                    <div
                      key={i}
                      className="whitespace-pre"
                      style={{
                        color: isComment
                          ? '#4A5270'
                          : isDir
                          ? '#5B8CFF'
                          : isFile
                          ? '#F0F4FF' :'#8B95B0',
                      }}
                    >
                      {line}
                    </div>
                  );
                })}
              </pre>
            </div>
            <p className="mt-4 text-[12px] text-[#4A5270] font-mono text-center">
              Clean. Predictable. Scalable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}