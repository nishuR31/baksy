'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-16 text-[#F0F4FF]">
        <h1 className="pt-10 mb-6 text-3xl font-bold">How to Use Baksy</h1>
        <ol className="pl-6 space-y-4 text-lg list-decimal">
          <li>
            <strong>Login:</strong> Go to the{' '}
            <a href="/login" className="text-[#5B8CFF] underline">
              Login
            </a>{' '}
            page and sign in with your email/password or OAuth provider.
          </li>
          <li>
            <strong>Get your token:</strong> After login, your dashboard will show your personal
            Baksy access token. Copy it.
          </li>
          <li>
            <strong>Authenticate CLI:</strong> In your terminal, run{' '}
            <span className="bg-[#23263A] px-2 py-1 rounded">baksy login &lt;token&gt;</span>. This
            authenticates you for Baksy CLI usage, just like{' '}
            <span className="bg-[#23263A] px-2 py-1 rounded">npm login &lt;token&gt;</span> does for
            npm.
          </li>
          <li>
            <strong>Use Baksy CLI:</strong> Now you can run Baksy CLI commands to scaffold, build,
            and manage your backend projects securely.
          </li>
        </ol>
        <div className="mt-8 text-[#A0A4B8] text-sm">
          Need help? Contact support or check the docs.
        </div>
      </main>
      <Footer />
    </>
  );
}
