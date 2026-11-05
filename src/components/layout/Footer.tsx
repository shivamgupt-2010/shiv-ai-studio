'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Cpu, Code2, Globe2, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: '#07090e',
        padding: '4rem 1.5rem 2.5rem',
        marginTop: '6rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.5), transparent)',
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}
      >
        {/* Brand Info */}
        <div style={{ maxWidth: '320px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Image src="/icon.svg" alt="SHIV AI" width={34} height={34} />
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.05em' }}>
              SHIV <span style={{ color: '#38bdf8' }}>AI</span>
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            The sovereign multimodal intelligence engine. Ultra low-latency chat, high-fidelity FLUX vision, neural voice synthesis, and autonomous video reels.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#10b981' }}>
            <ShieldCheck size={16} />
            <span>Cryptographically Verified & Encrypted</span>
          </div>
        </div>

        {/* Foundation Models */}
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', letterSpacing: '0.05em' }}>
            FOUNDATION ENGINES
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            <li>
              <Link href="/playground?tab=chat" style={{ color: '#94a3b8', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>SHIV-Core-Omni</span>
                <span style={{ fontSize: '0.68rem', padding: '0.1rem 0.35rem', borderRadius: '4px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8' }}>Active</span>
              </Link>
            </li>
            <li>
              <Link href="/playground?tab=image" style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
                SHIV-Vision-FLUX
              </Link>
            </li>
            <li>
              <Link href="/playground?tab=voice" style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
                SHIV-Voice-Neural
              </Link>
            </li>
            <li>
              <Link href="/playground?tab=reel" style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
                SHIV-Reels-v1
              </Link>
            </li>
          </ul>
        </div>

        {/* Developer Hub */}
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', letterSpacing: '0.05em' }}>
            DEVELOPER PLATFORM
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            <li>
              <Link href="/keys" style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
                API Keys & Quotas
              </Link>
            </li>
            <li>
              <Link href="/docs" style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
                API Documentation
              </Link>
            </li>
            <li>
              <Link href="/docs#openai-sdk" style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
                OpenAI SDK Drop-in
              </Link>
            </li>
            <li>
              <Link href="/docs#rate-limits" style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
                Rate Limits & Tiers
              </Link>
            </li>
          </ul>
        </div>

        {/* Ecosystem */}
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', letterSpacing: '0.05em' }}>
            SHIV ECOSYSTEM
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            <li>
              <span style={{ color: '#cbd5e1', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                SHIV Codespaces
              </span>
            </li>
            <li>
              <span style={{ color: '#cbd5e1', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                SHIV Media Editor
              </span>
            </li>
            <li>
              <span style={{ color: '#cbd5e1', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                SHIV Control Centre
              </span>
            </li>
            <li>
              <span style={{ color: '#cbd5e1', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                SHIV-OS
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.82rem',
          color: '#64748b',
        }}
      >
        <div>
          © {new Date().getFullYear()} SHIV Systems. All rights reserved. Sovereign Intelligence Architecture.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span>Privacy Architecture</span>
          <span>Terms of Service</span>
          <span>Security Whitepaper</span>
        </div>
      </div>
    </footer>
  );
}
