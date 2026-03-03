'use client';

import React from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import {
  useSettings,
  THEME_COLORS,
  SEASON_EFFECTS,
  type Theme,
  type Season,
} from '@/context/SettingsContext';

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[rgba(255,255,255,0.05)] last:border-0">
      <div>
        <div className="text-[14px] font-medium text-[#F0F4FF]">{label}</div>
        {description && <div className="text-[12px] text-[#4A5270] mt-0.5">{description}</div>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${
          checked ? 'bg-[#8B5CF6]' : 'bg-[rgba(255,255,255,0.1)]'
        }`}
        aria-label={label}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${
            checked ? 'left-[22px]' : 'left-0.5'
          }`}
        />
      </button>
    </div>
  );
}

function Slider({
  value,
  onChange,
  min,
  max,
  label,
  unit,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  label: string;
  unit?: string;
}) {
  return (
    <div className="py-4 border-b border-[rgba(255,255,255,0.05)] last:border-0">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[14px] font-medium text-[#F0F4FF]">{label}</div>
        <span className="text-[13px] font-mono text-[#A78BFA]">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) 100%)`,
        }}
      />
    </div>
  );
}

export default function SettingsPage() {
  const { settings, updateSetting, resetSettings } = useSettings();

  const handleReset = () => {
    resetSettings();
    toast.success('Settings reset to defaults');
  };

  const handleSave = () => {
    toast.success('Settings saved!', { description: 'Your UI preferences have been applied.' });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] relative">
      <AnimatedBackground />
      <div className="noise-overlay" />
      <Header />

      <main className="relative z-10 px-6 pb-20 pt-28">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[rgba(139,92,246,0.2)] mb-5">
              <span className="font-mono text-[11px] tracking-widest text-[#8B95B0] uppercase">
                UI Settings
              </span>
            </div>
            <h1 className="text-4xl font-bold text-[#F0F4FF] mb-2">
              Customize{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #5B8CFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Experience
              </span>
            </h1>
            <p className="text-[#8B95B0]">
              Tweak effects, motion, blur, seasons, and theming to your preference.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Theme */}
            <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.08)] p-6">
              <h2 className="text-[13px] font-mono uppercase tracking-widest text-[#4A5270] mb-5">
                🎨 Theme
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {(Object.keys(THEME_COLORS) as Theme[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      updateSetting('theme', t);
                      toast.success(`Theme: ${t}`);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
                      settings.theme === t
                        ? 'border-[rgba(139,92,246,0.5)] bg-[rgba(139,92,246,0.08)]'
                        : 'border-[rgba(255,255,255,0.06)] hover:border-[rgba(139,92,246,0.2)]'
                    }`}
                  >
                    <div
                      className="flex-shrink-0 w-6 h-6 rounded-full"
                      style={{
                        background: THEME_COLORS[t].accent,
                        boxShadow:
                          settings.theme === t ? `0 0 12px ${THEME_COLORS[t].glow}` : 'none',
                      }}
                    />
                    <span className="text-[13px] font-medium text-[#F0F4FF] capitalize">
                      {t.replace('-', ' ')}
                    </span>
                    {settings.theme === t && (
                      <svg
                        className="ml-auto"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="#8B5CF6"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Seasons */}
            <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.08)] p-6">
              <h2 className="text-[13px] font-mono uppercase tracking-widest text-[#4A5270] mb-5">
                🌿 Season Effects
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {(Object.keys(SEASON_EFFECTS) as Season[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      updateSetting('season', s);
                      toast.success(`Season: ${SEASON_EFFECTS[s].label}`);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
                      settings.season === s
                        ? 'border-[rgba(139,92,246,0.5)] bg-[rgba(139,92,246,0.08)]'
                        : 'border-[rgba(255,255,255,0.06)] hover:border-[rgba(139,92,246,0.2)]'
                    }`}
                  >
                    <span className="text-xl">{SEASON_EFFECTS[s].emoji}</span>
                    <div className="flex-1 text-left">
                      <div className="text-[13px] font-medium text-[#F0F4FF]">
                        {SEASON_EFFECTS[s].label}
                      </div>
                      {SEASON_EFFECTS[s].colors.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {SEASON_EFFECTS[s].colors.map((c) => (
                            <div
                              key={c}
                              className="w-3 h-3 rounded-full"
                              style={{ background: c }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    {settings.season === s && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="#8B5CF6"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Motion & Effects */}
            <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.08)] p-6">
              <h2 className="text-[13px] font-mono uppercase tracking-widest text-[#4A5270] mb-2">
                ✨ Effects & Motion
              </h2>
              <Toggle
                checked={settings.motionEnabled}
                onChange={(v) => updateSetting('motionEnabled', v)}
                label="Motion Animations"
                description="Enable gradient orb animations"
              />
              <Toggle
                checked={settings.parallaxEnabled}
                onChange={(v) => updateSetting('parallaxEnabled', v)}
                label="Parallax Effect"
                description="Mouse-driven parallax on background"
              />
              <Toggle
                checked={settings.gradientAnimated}
                onChange={(v) => updateSetting('gradientAnimated', v)}
                label="Animated Gradient"
                description="Moving violet-black gradient background"
              />
              <Toggle
                checked={settings.particlesEnabled}
                onChange={(v) => updateSetting('particlesEnabled', v)}
                label="Season Particles"
                description="Falling particles for season effects"
              />
              <Toggle
                checked={settings.cardGlow}
                onChange={(v) => updateSetting('cardGlow', v)}
                label="Card Glow"
                description="Glow effect on hover for cards"
              />
            </div>

            {/* Blur & Glass */}
            <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.08)] p-6">
              <h2 className="text-[13px] font-mono uppercase tracking-widest text-[#4A5270] mb-2">
                🔮 Blur & Glass
              </h2>
              <Toggle
                checked={settings.blurEnabled}
                onChange={(v) => updateSetting('blurEnabled', v)}
                label="Blur Effects"
                description="Enable backdrop blur on gradient orbs"
              />
              <Toggle
                checked={settings.glassEffects}
                onChange={(v) => updateSetting('glassEffects', v)}
                label="Glassmorphism"
                description="Glass-style card backgrounds"
              />
              <Toggle
                checked={settings.noiseOverlay}
                onChange={(v) => updateSetting('noiseOverlay', v)}
                label="Noise Texture"
                description="Subtle film grain overlay"
              />
              <Slider
                value={settings.blurIntensity}
                onChange={(v) => updateSetting('blurIntensity', v)}
                min={4}
                max={40}
                label="Blur Intensity"
                unit="px"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-8 glass-card rounded-2xl border border-[rgba(255,255,255,0.08)] p-5">
            <div>
              <div className="text-[14px] font-medium text-[#F0F4FF]">
                Settings are saved automatically
              </div>
              <div className="text-[12px] text-[#4A5270] mt-0.5">
                Stored in your browser&apos;s local storage
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl text-[13px] font-medium text-[#8B95B0] hover:text-[#F0F4FF] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] transition-all"
              >
                Reset Defaults
              </button>
              <button
                onClick={handleSave}
                className="btn-shimmer px-6 py-2.5 rounded-xl text-[13px] font-semibold text-white"
              >
                Save Settings
              </button>
            </div>
          </div>

          {/* Preview card */}
          <div className="mt-8">
            <h3 className="text-[13px] font-mono uppercase tracking-widest text-[#4A5270] mb-4">
              Live Preview
            </h3>
            <div
              className="p-6 transition-all duration-500 border rounded-2xl"
              style={{
                background: settings.glassEffects ? 'rgba(255,255,255,0.04)' : 'rgba(20,25,41,0.8)',
                backdropFilter: settings.blurEnabled ? `blur(${settings.blurIntensity}px)` : 'none',
                WebkitBackdropFilter: settings.blurEnabled
                  ? `blur(${settings.blurIntensity}px)`
                  : 'none',
                borderColor: settings.glassEffects
                  ? 'rgba(139,92,246,0.2)'
                  : 'rgba(255,255,255,0.06)',
                boxShadow: settings.cardGlow
                  ? `0 0 40px ${THEME_COLORS[settings.theme].glow}`
                  : 'none',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl"
                  style={{ background: `${THEME_COLORS[settings.theme].accent}20` }}
                >
                  <span className="text-xl">{SEASON_EFFECTS[settings.season].emoji}</span>
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-[#F0F4FF]">Preview Card</div>
                  <div className="text-[12px] text-[#4A5270]">
                    This reflects your current settings
                  </div>
                </div>
              </div>
              <div
                className="h-1.5 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${THEME_COLORS[settings.theme].accent}, #A78BFA)`,
                }}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
