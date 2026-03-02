'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import * as LucideIcons from 'lucide-react';

export default function NavButton({
  name,
  url,
  type = 'push',
  icon,
  iconName,
}: {
  name: string;
  url?: string;
  type?: 'push' | 'replace' | 'back';
  icon?: React.ReactNode;
  iconName?: keyof typeof LucideIcons;
}) {
  const router = useRouter();
  const handleClick = () => {
    if (type === 'back') router.back();
    else if (type === 'replace' && url) router.replace(url);
    else if (type === 'push' && url) router.push(url);
  };
  // Dynamically render Lucide icon if iconName is provided
  let LucideIconComponent: React.ReactNode = null;
  if (iconName && LucideIcons[iconName]) {
    const Icon = LucideIcons[iconName] as React.ComponentType<{ size?: number }>;
    LucideIconComponent = <Icon size={18} />;
  }
  return (
    <button
      className="mt-2 px-2 py-2 rounded bg-[#5B8CFF] text-white font-semibold hover:bg-[#7C9DFF] transition flex items-center gap-2"
      type="button"
      onClick={handleClick}
    >
      {/* Icon: hidden on sm/md, visible on lg+ */}
      {icon && <span className="hidden lg:inline-flex">{icon}</span>}
      {LucideIconComponent && <span className="hidden lg:inline-flex">{LucideIconComponent}</span>}
      {name}
    </button>
  );
}
