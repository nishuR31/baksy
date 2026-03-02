"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useUser } from '@/context/UserContext';
import axios from 'axios';

export default function LoginPage() {
  const { login, loading } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password });
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-md mx-auto px-4 py-16 text-[#F0F4FF]">
        <h1 className="mb-6 text-3xl font-bold">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="px-3 py-2 rounded bg-[#23263A] border border-[#35395A] text-[#F0F4FF]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="px-3 py-2 rounded bg-[#23263A] border border-[#35395A] text-[#F0F4FF]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-sm text-red-400">{error}</div>}
          <button
            type="submit"
            className="mt-2 px-6 py-2 rounded bg-[#5B8CFF] text-white font-semibold hover:bg-[#7C9DFF] transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-6 flex flex-col gap-2 text-sm text-[#8B95B0]">
          <a href="/forgot-password" className="underline text-[#5B8CFF]">
            Forgot password?
          </a>
          <a href="/passwordless" className="underline text-[#5B8CFF]">
            Passwordless login
          </a>
        </div>
        <OAuthButtons />
      </main>
      <Footer />
    </>
  );
}

function OAuthButtons() {
  const providers = [
    { name: 'Google', href: '/api/auth/oauth/google' },
    { name: 'GitHub', href: '/api/auth/oauth/github' },
    { name: 'Facebook', href: '/api/auth/oauth/facebook' },
    { name: 'Xvideos', href: '/api/auth/oauth/xvideos' },
    { name: 'Pornhub', href: '/api/auth/oauth/pornhub' },
  ];
  return (
    <div className="flex flex-col gap-2 mt-8">
      {providers.map((p) => (
        <a
          key={p.name}
          href={p.href}
          className="px-4 py-2 rounded bg-[#23263A] border border-[#35395A] text-[#F0F4FF] hover:bg-[#35395A] transition text-center"
        >
          Continue with {p.name}
        </a>
      ))}
    </div>
  );
}
