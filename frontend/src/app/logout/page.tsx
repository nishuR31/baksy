'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LogoutPage() {
  const { logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    logout();
    // Redirect to login after logout
    router.replace('/login');
  }, [logout, router]);

  return (
    <>
      <Header />
      <main className="max-w-md mx-auto px-4 py-16 text-[#F0F4FF] text-center">
        <h1 className="pt-10 mb-6 text-3xl font-bold">Logging out...</h1>
      </main>
      <Footer />
    </>
  );
}
