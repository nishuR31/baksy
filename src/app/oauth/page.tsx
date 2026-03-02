"user client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios from 'axios';

// This page handles the OAuth callback and redirects
export default function OAuthPage() {
  const router = useRouter();
  const [status, setStatus] = useState('Processing OAuth login...');

  useEffect(() => {
    // Example: /oauth?provider=google&code=...
    const params = new URLSearchParams(window.location.search);
    const provider = params.get('provider');
    const code = params.get('code');
    if (!provider || !code) {
      setStatus('Missing provider or code.');
      return;
    }
    // Exchange code for token
    axios
      .post(`/api/auth/oauth-callback`, { provider, code })
      .then(() => {
        setStatus('Login successful! Redirecting...');
        setTimeout(() => router.replace('/'), 1500);
      })
      .catch((err) => {
        setStatus(err?.response?.data?.message || 'OAuth login failed.');
      });
  }, [router]);

  return (
    <>
      <Header />
      <main className="max-w-md mx-auto px-4 py-16 text-[#F0F4FF] text-center">
        <h1 className="mb-6 text-3xl font-bold">OAuth Login</h1>
        <div>{status}</div>
      </main>
      <Footer />
    </>
  );
}
