'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Terminal, Key, BookOpen, Layers, User, LogOut, Sparkles, ChevronRight } from 'lucide-react';
import { getAuthToken, removeAuthToken } from '@/lib/api';

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('shiv_user_profile');
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      }
    }
  }, [pathname]);

  const handleLogout = () => {
    removeAuthToken();
    setUser(null);
    window.location.href = '/';
  };

  const navLinks = [
    { name: 'Playground', href: '/playground', icon: Terminal },
    { name: 'API Keys', href: '/keys', icon: Key },
    { name: 'Documentation', href: '/docs', icon: BookOpen },
    { name: 'Capabilities', href: '/#capabilities', icon: Layers },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(7, 9, 14, 0.85)'
          : 'rgba(7, 9, 14, 0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '1px solid rgba(56, 189, 248, 0.2)'
          : '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '4.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo and Brand */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: '11px',
              overflow: 'hidden',
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              src="/icon.svg"
              alt="SHIV AI Logo"
              width={40}
              height={40}
              priority
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display, sans-serif)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  color: '#ffffff',
                }}
              >
                SHIV
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.45rem',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                  color: '#ffffff',
                  letterSpacing: '0.05em',
                }}
              >
                AI
              </span>
            </div>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                color: '#64748b',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Sovereign Studio
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 0.95rem',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  color: isActive ? '#38bdf8' : '#94a3b8',
                  background: isActive ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                  border: isActive
                    ? '1px solid rgba(56, 189, 248, 0.25)'
                    : '1px solid transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={16} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Action / Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Operational Pulse */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.75rem',
              borderRadius: '9999px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#34d399',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 10px #10b981',
              }}
            />
            <span>Core Active</span>
          </div>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Link
                href="/keys"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#e2e8f0',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                }}
              >
                <User size={15} color="#38bdf8" />
                <span>{user.username || 'Account'}</span>
              </Link>
              <button
                onClick={handleLogout}
                title="Sign Out"
                style={{
                  padding: '0.45rem',
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  color: '#f87171',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link
                href="/login"
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: '#cbd5e1',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                }}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="btn-primary"
                style={{
                  fontSize: '0.82rem',
                  padding: '0.5rem 1.15rem',
                }}
              >
                <Sparkles size={15} />
                <span>Get API Key</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
