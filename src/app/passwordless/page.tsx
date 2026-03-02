'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios from 'axios';
import NavButton from '@/components/ui/Button';

export default function PasswordlessPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      await axios.post('/api/auth/passwordless', { email });
      setMessage('A login link has been sent to your email.');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to send login link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-md mx-auto px-4 py-16 text-[#F0F4FF]">
        <h1 className="mb-6 text-3xl font-bold">Passwordless Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="px-3 py-2 rounded bg-[#23263A] border border-[#35395A] text-[#F0F4FF]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <div className="text-sm text-red-400">{error}</div>}
          {message && <div className="text-sm text-green-400">{message}</div>}
          <button
            type="submit"
            className="mt-2 px-6 py-2 rounded bg-[#5B8CFF] text-white font-semibold hover:bg-[#7C9DFF] transition"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Login Link'}
          </button>
        </form>
        <div className="mt-6 flex flex-row gap-2 justify-around text-sm text-[#8B95B0]">
          <NavButton name="Login" url="/login" iconName="LogInIcon" />

          <NavButton name="back" url="" type="back" iconName="MoveLeftIcon" />

          <NavButton name="Home" url="/home" iconName="HomeIcon" />
        </div>
      </main>
      <Footer />
    </>
  );
}
