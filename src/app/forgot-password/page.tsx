import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios from 'axios';

export default function ForgotPasswordPage() {
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
      await axios.post('/api/auth/forgot-password', { email });
      setMessage('Password reset link sent to your email.');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-md mx-auto px-4 py-16 text-[#F0F4FF]">
        <h1 className="mb-6 text-3xl font-bold">Forgot Password</h1>
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
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
