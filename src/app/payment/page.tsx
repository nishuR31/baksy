'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const PAYMENT_MODES = [
  {
    id: 'stripe',
    name: 'Stripe',
    icon: '💳',
    description: 'Pay with credit or debit card via Stripe',
    badge: 'Most Popular',
    badgeColor: '#5B8CFF',
    features: ['Visa, Mastercard, Amex', 'Instant processing', '3D Secure', 'Global support'],
    color: '#5B8CFF',
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    icon: '🇮🇳',
    description: 'UPI, Net Banking, Cards — best for India',
    badge: 'India Preferred',
    badgeColor: '#22D3A0',
    features: ['UPI / GPay / PhonePe', 'Net Banking', 'EMI options', 'INR supported'],
    color: '#22D3A0',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '🅿️',
    description: 'Pay with your PayPal balance or linked card',
    badge: 'Trusted Globally',
    badgeColor: '#A78BFA',
    features: ['PayPal balance', 'Buyer protection', '200+ countries', 'No card needed'],
    color: '#A78BFA',
  },
  {
    id: 'crypto',
    name: 'Crypto',
    icon: '₿',
    description: 'Pay with Bitcoin, Ethereum, or USDC',
    badge: 'Web3',
    badgeColor: '#FF8C42',
    features: ['Bitcoin (BTC)', 'Ethereum (ETH)', 'USDC stablecoin', 'Coinbase Commerce'],
    color: '#FF8C42',
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    icon: '🏦',
    description: 'Direct bank transfer / wire transfer',
    badge: 'Enterprise',
    badgeColor: '#FF6B6B',
    features: ['SWIFT / SEPA', 'ACH (US)', 'Manual invoice', 'Net 30 terms'],
    color: '#FF6B6B',
  },
  {
    id: 'giftcard',
    name: 'Gift Card',
    icon: '🎁',
    description: 'Redeem a NishuBackend gift card or voucher',
    badge: 'Gifting',
    badgeColor: '#FFD700',
    features: ['Instant redemption', 'No expiry', 'Partial use', 'Stackable'],
    color: '#FFD700',
  },
];

const PLAN = {
  name: 'Lifetime License',
  price: '₹300',
  original: '₹1000',
  discount: '30% off',
  features: [
    'Minolith + Microservices',
    'JWT + Cookies + Refresh Token Auth',
    'Razorpay + Stripe Integration',
    'BullMQ/RabbitMQ + Redis Job Queues',
    'MongoDB or PostgreSQL or your choice',
    'Docker + Docker Compose',
    'Lifetime updates',
  ],
};

export default function PaymentPage() {
  const [selectedMode, setSelectedMode] = useState('stripe');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelectMode = (id: string) => {
    setSelectedMode(id);
    const mode = PAYMENT_MODES.find((m) => m.id === id);
    toast.success(`Payment method selected: ₹{mode?.name}`, { description: mode?.description });
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === process.env.PROMO) {
      setPromoApplied(true);
      toast.success('Promo code applied!', { description: 'Extra 10% off applied to your order.' });
    } else {
      toast.error('Invalid promo code', { description: 'Please check the code and try again.' });
    }
  };

  const handleCheckout = () => {
    setLoading(true);
    const mode = PAYMENT_MODES.find((m) => m.id === selectedMode);
    toast.loading(`Redirecting to ₹{mode?.name}...`, { id: 'checkout' });
    setTimeout(() => {
      setLoading(false);
      toast.success('Checkout initiated!', { id: 'checkout', description: `You will be redirected to ₹{mode?.name} to complete your purchase.` });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] relative">
      <AnimatedBackground />
      <div className="noise-overlay" />
      <Header />

      <main className="relative z-10 px-6 pb-20 pt-28">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[rgba(139,92,246,0.2)] mb-6">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22D3A0] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22D3A0]" />
              </span>
              <span className="font-mono text-[11px] tracking-widest text-[#8B95B0] uppercase">Secure Checkout</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F0F4FF] mb-4">
              Choose Your{' '}
              <span style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #5B8CFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Payment Method
              </span>
            </h1>
            <p className="text-[#8B95B0] text-lg max-w-xl mx-auto">
              One-time payment. Lifetime access. Choose how you want to pay.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Payment modes */}
            <div className="lg:col-span-2">
              <h2 className="text-[13px] font-mono uppercase tracking-widest text-[#4A5270] mb-5">Select Payment Method</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {PAYMENT_MODES.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => handleSelectMode(mode.id)}
                    className={`text-left p-5 rounded-2xl border transition-all duration-300 ₹{
                      selectedMode === mode.id
                        ? 'border-[rgba(139,92,246,0.5)] bg-[rgba(139,92,246,0.08)]'
                        : 'glass-card hover:border-[rgba(139,92,246,0.25)]'
                    }`}
                    style={selectedMode === mode.id ? { boxShadow: `0 0 30px ₹{mode.color}20` } : {}}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{mode.icon}</span>
                        <div>
                          <div className="text-[14px] font-semibold text-[#F0F4FF]">{mode.name}</div>
                          <div className="text-[11px] text-[#4A5270] mt-0.5">{mode.description}</div>
                        </div>
                      </div>
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ borderColor: selectedMode === mode.id ? mode.color : 'rgba(255,255,255,0.2)' }}
                      >
                        {selectedMode === mode.id && (
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: mode.color }} />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {mode.features.map((f) => (
                        <span key={f} className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: `₹{mode.color}15`, color: mode.color, border: `1px solid ₹{mode.color}30` }}>
                          {f}
                        </span>
                      ))}
                    </div>
                    <span
                      className="text-[10px] font-mono px-2.5 py-1 rounded-full"
                      style={{ background: `₹{mode.badgeColor}15`, color: mode.badgeColor, border: `1px solid ₹{mode.badgeColor}30` }}
                    >
                      {mode.badge}
                    </span>
                  </button>
                ))}
              </div>

              {/* Promo code */}
              <div className="mt-8 glass-card rounded-2xl border border-[rgba(255,255,255,0.08)] p-6">
                <h3 className="text-[13px] font-mono uppercase tracking-widest text-[#4A5270] mb-4">Promo Code</h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code (try LAUNCH50)"
                    className="flex-1 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-[13px] text-[#F0F4FF] placeholder-[#4A5270] focus:outline-none focus:border-[rgba(139,92,246,0.4)] transition-colors font-mono"
                    disabled={promoApplied}
                  />
                  <button
                    onClick={handleApplyPromo}
                    disabled={promoApplied || !promoCode}
                    className="px-5 py-3 rounded-xl text-[13px] font-semibold transition-all duration-200 disabled:opacity-40"
                    style={{ background: promoApplied ? 'rgba(34,211,160,0.15)' : 'rgba(139,92,246,0.2)', color: promoApplied ? '#22D3A0' : '#A78BFA', border: `1px solid ₹{promoApplied ? 'rgba(34,211,160,0.3)' : 'rgba(139,92,246,0.3)'}` }}
                  >
                    {promoApplied ? '✓ Applied' : 'Apply'}
                  </button>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="glass-card rounded-2xl border border-[rgba(139,92,246,0.2)] overflow-hidden" style={{ boxShadow: '0 0 60px rgba(139,92,246,0.1)' }}>
                  <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, #8B5CF6, #5B8CFF)' }} />
                  <div className="p-6">
                    <h3 className="text-[13px] font-mono uppercase tracking-widest text-[#4A5270] mb-5">Order Summary</h3>

                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[14px] font-semibold text-[#F0F4FF]">{PLAN.name}</span>
                        <div className="text-right">
                          <div className="text-[18px] font-bold text-[#F0F4FF]">{promoApplied ? '₹44' : PLAN.price}</div>
                          <div className="text-[11px] text-[#4A5270] line-through">{PLAN.original}</div>
                        </div>
                      </div>
                      <div className="text-[11px] font-mono text-[#22D3A0]">{PLAN.discount}{promoApplied ? ' + extra 10%' : ''}</div>
                    </div>

                    <ul className="mb-6 space-y-2">
                      {PLAN.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17l-5-5" stroke="#22D3A0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="text-[12px] text-[#8B95B0]">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="border-t border-[rgba(255,255,255,0.06)] pt-4 mb-5">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] text-[#8B95B0]">Total</span>
                        <span className="text-[22px] font-bold text-[#F0F4FF]">{promoApplied ? '₹44' : '₹49'}</span>
                      </div>
                      <div className="text-[11px] text-[#4A5270] mt-1">One-time · No subscription</div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="btn-shimmer w-full flex items-center justify-center gap-2 py-4 rounded-xl text-[14px] font-semibold text-white disabled:opacity-70"
                    >
                      {loading ? (
                        <><span className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin" /> Processing...</>
                      ) : (
                        <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg> Pay {promoApplied ? '₹44' : '₹49'} Now</>
                      )}
                    </button>

                    <p className="mt-3 text-center text-[11px] text-[#4A5270] font-mono">
                      🔒 Secure · 14-day refund policy
                    </p>

                    <div className="mt-4 flex items-center justify-center gap-3 text-[#4A5270]">
                      {['visa', 'mc', 'amex', 'upi'].map((card) => (
                        <span key={card} className="text-[10px] font-mono px-2 py-1 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] uppercase">{card}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <Link href="/docs" className="text-[12px] text-[#4A5270] hover:text-[#A78BFA] transition-colors font-mono">
                    Questions? Read the docs →
                  </Link>
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
