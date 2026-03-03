'use client';

import React, { useEffect, useRef } from 'react';
import { useSettings, THEME_COLORS, SEASON_EFFECTS } from '@/context/SettingsContext';

export default function AnimatedBackground() {
  const { settings } = useSettings();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const themeColors = THEME_COLORS[settings.theme];
  const seasonEffect = SEASON_EFFECTS[settings.season];

  useEffect(() => {
    if (!settings.particlesEnabled || settings.season === 'none') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{ x: number; y: number; size: number; speed: number; opacity: number; color: string; drift: number }> = [];
    const colors = seasonEffect.colors;

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 6 + 2,
        speed: Math.random() * 0.8 + 0.2,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        drift: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        if (settings.season === 'spring') {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        } else if (settings.season === 'winter') {
          ctx.moveTo(p.x, p.y - p.size);
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            ctx.lineTo(p.x + Math.cos(angle) * p.size, p.y + Math.sin(angle) * p.size);
          }
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();
        p.y += p.speed;
        p.x += p.drift;
        if (p.y > canvas.height + 10) { p.y = -10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animFrameRef.current); window.removeEventListener('resize', handleResize); };
  }, [settings.particlesEnabled, settings.season, seasonEffect.colors]);

  useEffect(() => {
    if (!settings.parallaxEnabled) return;
    const handleMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 }; };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [settings.parallaxEnabled]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Animated gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: themeColors.gradient,
          transition: 'background 1s ease',
        }}
      />

      {/* Animated violet-black gradient orbs */}
      {settings.gradientAnimated && (
        <>
          <div
            className="absolute rounded-full"
            style={{
              width: '70vw', height: '70vw',
              top: '-20%', left: '-15%',
              background: `radial-gradient(circle, ${themeColors.accent}22 0%, transparent 70%)`,
              filter: settings.blurEnabled ? `blur(${settings.blurIntensity * 4}px)` : 'none',
              animation: settings.motionEnabled ? 'gradOrb1 18s ease-in-out infinite' : 'none',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: '50vw', height: '50vw',
              bottom: '-10%', right: '-10%',
              background: `radial-gradient(circle, #A78BFA22 0%, transparent 70%)`,
              filter: settings.blurEnabled ? `blur(${settings.blurIntensity * 3}px)` : 'none',
              animation: settings.motionEnabled ? 'gradOrb2 22s ease-in-out infinite' : 'none',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: '40vw', height: '40vw',
              top: '40%', left: '40%',
              background: `radial-gradient(circle, #5B8CFF18 0%, transparent 70%)`,
              filter: settings.blurEnabled ? `blur(${settings.blurIntensity * 3}px)` : 'none',
              animation: settings.motionEnabled ? 'gradOrb3 15s ease-in-out infinite' : 'none',
            }}
          />
        </>
      )}

      {/* Noise overlay */}
      {settings.noiseOverlay && <div className="noise-overlay" />}

      {/* Season particles canvas */}
      {settings.particlesEnabled && settings.season !== 'none' && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }} />
      )}
    </div>
  );
}
