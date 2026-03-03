'use client';

import React, { useEffect, useRef, useCallback } from 'react';

const FEATURES = [
  {
    icon: '🔑',
    title: 'JWT + Cookies + Refresh Token Auth',
    desc: 'Access/refresh token pair, automatic rotation, token blacklisting with Redis, and secure httpOnly cookie support.',
    tags: ['jsonwebtoken', 'Redis', 'bcrypt', 'cookies'],
    size: 'large',
    accentColor: '#5B8CFF',
  },
  {
    icon: '💳',
    title: 'Razorpay / Stripe',
    desc: 'Webhook handlers with signature verification, subscription management, and idempotent payment recording.',
    tags: ['Razorpay', 'Stripe', 'Webhooks'],
    size: 'normal',
    accentColor: '#A78BFA',
  },
  {
    icon: '🐳',
    title: 'Docker + Compose',
    desc: 'Multi-stage production Dockerfile, docker-compose with Redis + DB, and health check integration.',
    tags: ['Docker', 'Compose', 'Alpine'],
    size: 'normal',
    accentColor: '#A78BFA',
  },
  {
    icon: '⚙️',
    title: 'BullMQ/RabbitMQ + Redis/Dragonfly Caching Jobs',
    desc: 'Priority queues, delayed jobs, cron scheduling, failed job retries, and a Bull Board dashboard.',
    tags: ['BullMQ', 'RabbitMQ', 'Dragonfly', 'Redis', 'Cron'],
    size: 'large',
    accentColor: '#FF8C42',
  },
  {
    icon: '🗄️',
    title: 'Mongo, PostgreSQL, Neon or any other',
    desc: 'Mongoose ODM for MongoDB or Prisma ORM for PostgreSQL — your choice at scaffold time.',
    tags: ['Mongoose', 'Prisma', 'Neon', 'Migrations'],
    size: 'normal',
    accentColor: '#22D3A0',
  },
  {
    icon: '🛡️',
    title: 'Role-Based Access Control',
    desc: 'Middleware-level RBAC with user, admin, and superadmin roles. Route-level permission guards.',
    tags: ['RBAC', 'Middleware', 'Guards'],
    size: 'normal',
    accentColor: '#FF6B6B',
  },
  {
    icon: '📊',
    title: 'Structured Logging (Pino)',
    desc: 'JSON-structured logs with request IDs, response times, error stacks, and log level filtering.',
    tags: ['Pino', 'pino-http', 'JSON logs'],
    size: 'normal',
    accentColor: '#5B8CFF',
  },
  {
    icon: '🔀',
    title: 'API Versioning + Health/Ping',
    desc: '/api/v1 prefix out of the box, /health, /ping and /ready endpoints, and graceful shutdown handling.',
    tags: ['Versioning', '/health', '/ping', 'Graceful'],
    size: 'large',
    accentColor: '#22D3A0',
  },
];

function FeatureCard({ feature, index }: { feature: (typeof FEATURES)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  }, []);

  return (
    <div
      ref={cardRef}
      className={`animate-on-scroll tilt-card glass-card rounded-2xl p-6 cursor-default ${
        feature.size === 'large' ? 'md:col-span-2' : ''
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Accent line */}
      <div
        className="w-12 h-px mb-5 rounded"
        style={{ background: `linear-gradient(90deg, ${feature.accentColor}, transparent)` }}
      />

      <div className="flex items-start gap-4">
        <span className="flex-shrink-0 text-2xl">{feature.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold text-[#F0F4FF] mb-2 leading-snug">
            {feature.title}
          </h3>
          <p className="text-[13px] text-[#8B95B0] leading-relaxed mb-4">{feature.desc}</p>
          <div className="flex flex-wrap gap-2">
            {feature.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded border border-[rgba(255,255,255,0.07)] text-[#4A5270] bg-[rgba(255,255,255,0.02)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
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

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-28 px-6 relative bg-[#0B0F19]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(91,140,255,0.04) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center animate-on-scroll">
          <div className="mb-4 section-label">// Everything Included</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#F0F4FF] mb-4">
            8 production modules. Zero config.
          </h2>
          <p className="text-[#8B95B0] text-lg max-w-2xl mx-auto">
            Every module is battle-tested, TypeScript-first, and follows the same clean architecture
            pattern.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
