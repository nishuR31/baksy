"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios from 'axios';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Assume token is passed as query param
  const token =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('token') : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await axios.post('/api/auth/reset-password', { token, password });
      setMessage('Password reset successful. You can now log in.');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-md mx-auto px-4 py-16 text-[#F0F4FF]">
        <h1 className="pt-10 mb-6 text-3xl font-bold">Reset Password</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            className="px-3 py-2 rounded bg-[#23263A] border border-[#35395A] text-[#F0F4FF]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="px-3 py-2 rounded bg-[#23263A] border border-[#35395A] text-[#F0F4FF]"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          {error && <div className="text-sm text-red-400">{error}</div>}
          {message && <div className="text-sm text-green-400">{message}</div>}
          <button
            type="submit"
            className="mt-2 px-6 py-2 rounded bg-[#5B8CFF] text-white font-semibold hover:bg-[#7C9DFF] transition"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
