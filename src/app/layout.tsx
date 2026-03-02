import UserBall from '@/components/UserBall';
import { UserProvider } from '@/context/UserContext';

import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Toaster } from 'sonner';
import '../styles/tailwind.css';
import { SettingsProvider } from '@/context/SettingsContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Baksy — Ship Production-Ready Node.js Backends in Minutes',
  description:
    'A Node.js CLI tool that scaffolds production-ready backends with auth, payments, queues, logging, and Docker pre-configured. One command, zero boilerplate.',
  icons: {
    icon: [{ url: '/assets/images/app_logo.png', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <SettingsProvider>
            {children}
            <Toaster
              position="bottom-right"
              theme="dark"
              toastOptions={{
                style: {
                  background: 'rgba(13,5,32,0.95)',
                  border: '1px solid rgba(139,92,246,0.25)',
                  color: '#F0F4FF',
                  backdropFilter: 'blur(16px)',
                  fontFamily: 'DM Sans, sans-serif',
                },
              }}
            />
            <UserBall />
          </SettingsProvider>
        </UserProvider>

        {/* <script
          type="module"
          async
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fnishubacke9562back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.17"
        /> */}
        {/* <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /> */}
      </body>
    </html>
  );
}
