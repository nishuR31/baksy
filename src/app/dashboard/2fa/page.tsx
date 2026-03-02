'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useUser } from '@/context/UserContext';

export default function TwoFADashboard() {
  const { user } = useUser();
  const [enabled, setEnabled] = useState(false);
  const [qr, setQr] = useState('');
  const [secret, setSecret] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch 2FA status
    async function fetch2FA() {
      setLoading(true);
      try {
        const res = await axios.get('/api/auth/2fa/status');
        setEnabled(res.data.enabled);
      } catch {
        setEnabled(false);
      } finally {
        setLoading(false);
      }
    }
    fetch2FA();
  }, []);

  const handleSetup = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await axios.post('/api/auth/2fa/setup');
      setQr(res.data.qr);
      setSecret(res.data.secret);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to setup 2FA');
    } finally {
      setLoading(false);
    }
  };

  const handleEnable = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await axios.post('/api/auth/2fa/enable', { code });
      setEnabled(true);
      setMessage('2FA enabled successfully!');
      setQr('');
      setSecret('');
      setCode('');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid code');
    } finally {
      setLoading(false);
    }
  };

  const handleDisable = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await axios.post('/api/auth/2fa/disable');
      setEnabled(false);
      setMessage('2FA disabled.');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to disable 2FA');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-lg mx-auto px-4 py-16 text-[#F0F4FF]">
        <h1 className="mb-6 text-3xl font-bold">Two-Factor Authentication (2FA)</h1>
        {enabled ? (
          <div className="flex flex-col gap-4">
            <div className="text-green-400">2FA is enabled for your account.</div>
            <button
              className="px-6 py-2 rounded bg-[#F87171] text-white font-semibold hover:bg-[#F87171]/80 transition"
              onClick={handleDisable}
              disabled={loading}
            >
              Disable 2FA
            </button>
            {message && <div className="text-sm text-green-400">{message}</div>}
            {error && <div className="text-sm text-red-400">{error}</div>}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <button
              className="px-6 py-2 rounded bg-[#5B8CFF] text-white font-semibold hover:bg-[#7C9DFF] transition"
              onClick={handleSetup}
              disabled={loading}
            >
              Setup 2FA
            </button>
            {qr && (
              <div className="flex flex-col items-center gap-2 mt-4">
                <img src={qr} alt="QR Code" className="w-40 h-40" />
                <div className="text-xs text-[#A0A4B8]">
                  Scan with your authenticator app (Google Authenticator, Authy, etc.)
                </div>
                <div className="text-xs text-[#A0A4B8]">
                  Secret: <span className="font-mono">{secret}</span>
                </div>
                <form className="flex flex-col gap-2 mt-2" onSubmit={handleEnable}>
                  <input
                    type="text"
                    placeholder="Enter TOTP code"
                    className="px-3 py-2 rounded bg-[#23263A] border border-[#35395A] text-[#F0F4FF]"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 rounded bg-[#5B8CFF] text-white font-semibold hover:bg-[#7C9DFF] transition"
                    disabled={loading}
                  >
                    Enable 2FA
                  </button>
                </form>
              </div>
            )}
            {message && <div className="text-sm text-green-400">{message}</div>}
            {error && <div className="text-sm text-red-400">{error}</div>}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
