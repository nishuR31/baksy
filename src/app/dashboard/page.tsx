import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/FOoter';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-16 text-[#F0F4FF]">
        <h1 className="mb-6 text-3xl font-bold">Welcome, {user.name || 'User'}!</h1>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            {user.avatar && (
              <img src={user.avatar} alt="avatar" className="w-16 h-16 rounded-full" />
            )}
            <div>
              <div className="font-semibold">{user.email}</div>
              <div className="text-sm text-[#A0A4B8]">{user.username || ''}</div>
            </div>
          </div>
          <div className="mt-8">
            <a href="/settings" className="text-[#5B8CFF] hover:underline">
              Settings
            </a>
            <span className="mx-2">|</span>
            <a href="/logout" className="text-[#F87171] hover:underline">
              Logout
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
