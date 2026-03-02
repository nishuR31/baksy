'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HowItWorksPage() {
  function UserTokenForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');

    const supportMail = process.env.NEXT_PUBLIC_MAIL;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const subject = encodeURIComponent('Baksy Access Request');
      const body = encodeURIComponent(
        `npm username: ${username}\nemail: ${email}\ntoken: ${token}`
      );
      window.location.href = `mailto:${supportMail}?subject=${subject}&body=${body}`;
    };

    return (
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1 text-[#F0F4FF]">
          NPM Username
          <input
            type="text"
            className="px-3 py-2 rounded bg-[#23263A] border border-[#35395A] text-[#F0F4FF]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-[#F0F4FF]">
          Email
          <input
            type="email"
            className="px-3 py-2 rounded bg-[#23263A] border border-[#35395A] text-[#F0F4FF]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-[#F0F4FF]">
          Token
          <input
            type="text"
            className="px-3 py-2 rounded bg-[#23263A] border border-[#35395A] text-[#F0F4FF]"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="mt-2 px-6 py-2 rounded bg-[#5B8CFF] text-white font-semibold hover:bg-[#7C9DFF] transition"
        >
          Send
        </button>
      </form>
    );
  }
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16 text-[#F0F4FF]">
        <h1 className="pt-5 mb-6 text-4xl font-bold">How to Use Baksy</h1>
        <ol className="list-decimal ml-6 mb-8 text-[#8B95B0] space-y-4">
          <li>
            <span className="font-semibold text-[#F0F4FF]">Purchase:</span> Log in to your account
            and buy Baksy from the Pricing section. Payment is required to proceed.
          </li>
          <li>
            <span className="font-semibold text-[#F0F4FF]">Payment Confirmation:</span> After
            successful payment, you will receive a confirmation email with your receipt and a unique
            access token.
          </li>
          <li>
            <span className="font-semibold text-[#F0F4FF]">NPM Account:</span> Create an account on{' '}
            <a
              href="https://www.npmjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5B8CFF] underline"
            >
              npmjs.com
            </a>{' '}
            if you don't already have one.
          </li>
          <li>
            <span className="font-semibold text-[#F0F4FF]">Send Username and Token:</span> Email
            your npm username with token to{' '}
            <a href={`mailto:${process.env.NEXT_PUBLIC_MAIL}`} className="text-[#5B8CFF] underline">
              {process.env.NEXT_PUBLIC_MAIL}
            </a>{' '}
            so we can add you to our npm organization.
          </li>
          <li>
            <span className="font-semibold text-[#F0F4FF]">Access Service:</span> Once added, you
            can use Baksy via npm as part of our organization. Enjoy production-ready Node.js
            backends with zero boilerplate!
          </li>
        </ol>
        <div className="mt-12 mb-8 p-6 rounded-xl bg-[#181C2A] border border-[#23263A] max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-[#F0F4FF]">Send Your Details</h2>
          <p className="mb-4 text-[#8B95B0] text-sm">
            Fill out this form to send your npm username, email, and token to us for access.
          </p>
          <UserTokenForm />
        </div>
        <div className="mt-8 text-[#8B95B0]">
          <strong className="text-[#F0F4FF]">Need help?</strong> Contact us at{' '}
          <a href={`mailto:${process.env.NEXT_PUBLIC_MAIL}`} className="text-[#5B8CFF] underline">
            {process.env.NEXT_PUBLIC_MAIL}
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
