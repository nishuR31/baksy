'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Season = 'none' | 'spring' | 'summer' | 'autumn' | 'winter';
export type Theme = 'violet-black' | 'blue-black' | 'green-black' | 'red-black' | 'cyan-black';

interface Settings {
  motionEnabled: boolean;
  blurEnabled: boolean;
  glassEffects: boolean;
  particlesEnabled: boolean;
  parallaxEnabled: boolean;
  gradientAnimated: boolean;
  season: Season;
  theme: Theme;
  blurIntensity: number;
  cardGlow: boolean;
  noiseOverlay: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: Settings = {
  motionEnabled: true,
  blurEnabled: true,
  glassEffects: true,
  particlesEnabled: true,
  parallaxEnabled: true,
  gradientAnimated: true,
  season: 'none',
  theme: 'violet-black',
  blurIntensity: 16,
  cardGlow: true,
  noiseOverlay: true,
};

const SettingsContext = createContext<SettingsContextType>({
  settings: DEFAULT_SETTINGS,
  updateSetting: () => {},
  resetSettings: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nishu-settings');
      if (saved) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) });
    } catch {}
  }, []);

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      try { localStorage.setItem('nishu-settings', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    try { localStorage.removeItem('nishu-settings'); } catch {}
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);

export const THEME_COLORS: Record<Theme, { accent: string; glow: string; gradient: string }> = {
  'violet-black': { accent: '#8B5CF6', glow: 'rgba(139,92,246,0.3)', gradient: 'linear-gradient(135deg, #1a0533 0%, #0B0F19 40%, #0d0520 100%)' },
  'blue-black':   { accent: '#5B8CFF', glow: 'rgba(91,140,255,0.3)',  gradient: 'linear-gradient(135deg, #001a4d 0%, #0B0F19 40%, #000d2e 100%)' },
  'green-black':  { accent: '#22D3A0', glow: 'rgba(34,211,160,0.3)',  gradient: 'linear-gradient(135deg, #002b1f 0%, #0B0F19 40%, #001a12 100%)' },
  'red-black':    { accent: '#FF6B6B', glow: 'rgba(255,107,107,0.3)', gradient: 'linear-gradient(135deg, #2b0000 0%, #0B0F19 40%, #1a0000 100%)' },
  'cyan-black':   { accent: '#06B6D4', glow: 'rgba(6,182,212,0.3)',   gradient: 'linear-gradient(135deg, #001a2b 0%, #0B0F19 40%, #000f1a 100%)' },
};

export const SEASON_EFFECTS: Record<Season, { label: string; emoji: string; colors: string[] }> = {
  none:   { label: 'None',   emoji: '🌑', colors: [] },
  spring: { label: 'Spring', emoji: '🌸', colors: ['#FFB7C5', '#98FB98', '#FFD700'] },
  summer: { label: 'Summer', emoji: '☀️', colors: ['#FFD700', '#FF8C00', '#00CED1'] },
  autumn: { label: 'Autumn', emoji: '🍂', colors: ['#FF6B35', '#D4A017', '#8B4513'] },
  winter: { label: 'Winter', emoji: '❄️', colors: ['#B0E0E6', '#87CEEB', '#E0F0FF'] },
};
