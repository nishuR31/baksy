import React from 'react';

const ITEMS = [
  'TypeScript-First',
  'JWT Auth',
  'Cookies',
  'BullMQ Queues',
  'Pino Logging',
  'Docker Ready',
  'Razorpay + Stripe',
  'RBAC Guards',
  'Zod Validation',
  'Prisma / Mongoose',
  'API Versioning',
  'ESLint + Prettier',
  'Graceful Shutdown',
];

export default function MarqueeSection() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="py-8 border-y border-[rgba(255,255,255,0.06)] bg-[#0F1524] overflow-hidden relative">
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0F1524] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0F1524] to-transparent z-10 pointer-events-none" />
      <div className="animate-marquee">
        {doubled?.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 mx-6">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#4A5270] hover:text-[#5B8CFF] transition-colors cursor-default whitespace-nowrap">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#4A5270] flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}