'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function UserBall() {
  const { user } = useUser();
  const router = useRouter();

  // Responsive: show ball on desktop, bar on mobile
  // Ball: fixed, lower left; Bar: fixed, left, full height, slide in/out
  // On click: go to dashboard if logged in, else to login/reset/etc

  const handleClick = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <>
      {/* Desktop: Ball */}
      <div
        className="hidden md:flex fixed bottom-8 left-8 z-50 cursor-pointer items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#5B8CFF] to-[#23263A] shadow-lg hover:scale-105 transition-transform"
        onClick={handleClick}
        title={user ? 'Go to Dashboard' : 'Login/Register'}
      >
        <span className="text-3xl text-white">
          {user ? (
            user.avatar ? (
              <img src={user.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
            ) : (
              '👤'
            )
          ) : (
            '🔑'
          )}
        </span>
      </div>
      {/* Mobile: User Bar */}
      <div className="fixed bottom-0 left-0 z-50 flex justify-start w-full md:hidden">
        <button
          className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#5B8CFF] to-[#23263A] text-white rounded-tr-2xl shadow-lg w-3/4 max-w-xs"
          onClick={handleClick}
        >
          <span className="text-2xl">
            {user ? (
              user.avatar ? (
                <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
              ) : (
                '👤'
              )
            ) : (
              '🔑'
            )}
          </span>
          <span className="text-lg font-semibold">
            {user ? user.name || 'Dashboard' : 'Login / Register'}
          </span>
        </button>
      </div>
    </>
  );
}
