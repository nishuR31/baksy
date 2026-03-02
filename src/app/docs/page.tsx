'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const SECTIONS = [
  { id: 'quickstart', label: 'Quick Start', icon: '⚡' },
  { id: 'installation', label: 'Installation', icon: '📦' },
  { id: 'configuration', label: 'Configuration', icon: '⚙️' },
  { id: 'auth', label: 'Auth Module', icon: '🔐' },
  { id: 'payments', label: 'Payments', icon: '💳' },
  { id: 'queues', label: 'Job Queues', icon: '⚡' },
  { id: 'docker', label: 'Docker', icon: '🐳' },
  { id: 'deployment', label: 'Deployment', icon: '🚀' },
];

const CODE_EXAMPLES: Record<string, { title: string; lang: string; code: string }[]> = {
  quickstart: [
    {
      title: 'Initialize a new project',
      lang: 'bash',
      code: `# Create a new backend project
npx baksy init my-saas-app

# Navigate to your project
cd my-saas-app

# Install dependencies
npm install

# Start development server
npm run dev`,
    },
  ],
  installation: [
    {
      title: 'Global installation (optional)',
      lang: 'bash',
      code: `# Install globally for repeated use
npm install -g baksy

# Or use npx (no install needed)
npx baksy init <project-name>`,
    },
    {
      title: 'Interactive setup',
      lang: 'bash',
      code: `? Select database: (Use arrow keys)
  ❯ MongoDB
    PostgreSQL

? Select auth provider:
  ❯ JWT (built-in)
    Passport.js

? Enable payments?
  ❯ Razorpay + Stripe
    Stripe only
    Skip

? Enable job queues? (BullMQ + Redis)
  ❯ Yes
    No`,
    },
  ],
  configuration: [
    {
      title: '.env configuration',
      lang: 'bash',
      code: `# Database
MONGODB_URI=mongodb://localhost:27017/myapp
# or
POSTGRES_URL=postgresql://user:pass@localhost:5432/myapp

# Auth
JWT_SECRET=your-super-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Payments
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx
STRIPE_SECRET_KEY=sk_test_xxx

# Redis (for BullMQ)
REDIS_URL=redis://localhost:6379`,
    },
  ],
  auth: [
    {
      title: 'JWT Auth usage',
      lang: 'typescript',
      code: `import { authMiddleware } from './middleware/auth';
import { refreshToken } from './controllers/auth';

// Protect routes
router.get('/profile', authMiddleware, getProfile);

// Refresh token endpoint
router.post('/auth/refresh', refreshToken);

// Login response includes both tokens
// {
//   accessToken: "eyJ...",
//   refreshToken: "eyJ...",
//   expiresIn: 900
// }`,
    },
  ],
  payments: [
    {
      title: 'Create Razorpay order',
      lang: 'typescript',
      code: `import { createOrder } from './services/razorpay';

const order = await createOrder({
  amount: 4900, // in paise (₹49)
  currency: 'INR',
  receipt: 'order_rcpt_001',
});

// Webhook verification is pre-configured
// POST /webhooks/razorpay → auto-handled`,
    },
  ],
  queues: [
    {
      title: 'Add a job to queue',
      lang: 'typescript',
      code: `import { emailQueue } from './queues/email';

// Add job
await emailQueue.add('send-welcome', {
  to: 'user@example.com',
  template: 'welcome',
  data: { name: 'John' },
});

// Worker is auto-started
// Retries: 3 attempts with exponential backoff`,
    },
  ],
  docker: [
    {
      title: 'Docker Compose',
      lang: 'yaml',
      code: `version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file: .env
    depends_on:
      - mongo
      - redis

  mongo:
    image: mongo:7
    volumes:
      - mongo_data:/data/db

  redis:
    image: redis:7-alpine

volumes:
  mongo_data:`,
    },
  ],
  deployment: [
    {
      title: 'Deploy to production',
      lang: 'bash',
      code: `# Build Docker image
docker build -t my-saas-app .

# Run with docker-compose
docker-compose up -d

# Or deploy to Railway
npx railway up

# Or deploy to Render
# Connect your GitHub repo → auto-deploy`,
    },
  ],
};

function CodeBlock({ title, lang, code }: { title: string; lang: string; code: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      toast.success('Copied to clipboard!');
    });
  };

  return (
    <div className="mb-6 code-block">
      <div className="justify-between code-header">
        <div className="flex items-center gap-2">
          <span className="code-dot code-dot-red" />
          <span className="code-dot code-dot-yellow" />
          <span className="code-dot code-dot-green" />
          <span className="ml-2 text-[11px] font-mono text-[#4A5270]">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-[#4A5270] uppercase">{lang}</span>
          <button
            onClick={handleCopy}
            className="text-[11px] font-mono text-[#4A5270] hover:text-[#A78BFA] transition-colors flex items-center gap-1"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy
          </button>
        </div>
      </div>
      <pre className="p-4 text-[12px] font-mono text-[#8B95B0] overflow-x-auto leading-relaxed whitespace-pre">{code}</pre>
    </div>
  );
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('quickstart');

  const currentExamples = CODE_EXAMPLES[activeSection] || [];

  const sectionContent: Record<string, { title: string; description: string }> = {
    quickstart: { title: 'Quick Start', description: 'Get a production-ready Node.js backend running in under 5 minutes.' },
    installation: { title: 'Installation', description: 'Install Baksy CLI and scaffold your project with interactive setup.' },
    configuration: { title: 'Configuration', description: 'Configure your environment variables, database, and services.' },
    auth: { title: 'Auth Module', description: 'JWT authentication with refresh tokens and cookies, middleware, and RBAC pre-configured.' },
    payments: { title: 'Payments', description: 'Razorpay and Stripe integration with webhook handling out of the box.' },
    queues: { title: 'Job Queues', description: 'BullMQ/RabbitMQ + Redis job queues with workers, retries, and monitoring.' },
    docker: { title: 'Docker', description: 'Docker and Docker Compose configuration for local dev and production.' },
    deployment: { title: 'Deployment', description: 'Deploy to Railway, Render, AWS, or any Docker-compatible platform.' },
  };

  const current = sectionContent[activeSection];

  return (
    <div className="min-h-screen bg-[#0B0F19] relative">
      <AnimatedBackground />
      <div className="noise-overlay" />
      <Header />

      <main className="relative z-10 pt-24 pb-20">
        <div className="px-6 mx-auto max-w-7xl">
          {/* Hero */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[rgba(139,92,246,0.2)] mb-5">
              <span className="font-mono text-[11px] tracking-widest text-[#8B95B0] uppercase">Documentation</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F0F4FF] mb-3">
              Baksy{' '}
              <span style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #5B8CFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Docs
              </span>
            </h1>
            <p className="text-[#8B95B0] text-lg">Everything you need to ship production-ready backends.</p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar */}
            <aside className="flex-shrink-0 lg:w-56">
              <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.08)] p-4 lg:sticky lg:top-24">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#4A5270] mb-3 px-2">Contents</div>
                <nav className="space-y-1">
                  {SECTIONS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveSection(s.id)}
                      className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-200 ${
                        activeSection === s.id
                          ? 'bg-[rgba(139,92,246,0.15)] text-[#A78BFA] border border-[rgba(139,92,246,0.2)]'
                          : 'text-[#8B95B0] hover:text-[#F0F4FF] hover:bg-[rgba(255,255,255,0.04)]'
                      }`}
                    >
                      <span>{s.icon}</span>
                      <span>{s.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.08)] p-8">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#F0F4FF] mb-2">{current?.title}</h2>
                  <p className="text-[#8B95B0] text-[15px]">{current?.description}</p>
                  <div className="h-px mt-4" style={{ background: 'linear-gradient(90deg, rgba(139,92,246,0.4), transparent)' }} />
                </div>

                {currentExamples.map((ex, i) => (
                  <CodeBlock key={i} {...ex} />
                ))}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                  <button
                    onClick={() => {
                      const idx = SECTIONS.findIndex((s) => s.id === activeSection);
                      if (idx > 0) setActiveSection(SECTIONS[idx - 1].id);
                    }}
                    disabled={SECTIONS.findIndex((s) => s.id === activeSection) === 0}
                    className="flex items-center gap-2 text-[13px] text-[#8B95B0] hover:text-[#F0F4FF] transition-colors disabled:opacity-30"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>
                  <button
                    onClick={() => {
                      const idx = SECTIONS.findIndex((s) => s.id === activeSection);
                      if (idx < SECTIONS.length - 1) setActiveSection(SECTIONS[idx + 1].id);
                    }}
                    disabled={SECTIONS.findIndex((s) => s.id === activeSection) === SECTIONS.length - 1}
                    className="flex items-center gap-2 text-[13px] text-[#8B95B0] hover:text-[#F0F4FF] transition-colors disabled:opacity-30"
                  >
                    Next
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
