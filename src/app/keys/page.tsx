'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Key,
  Plus,
  Shield,
  Trash2,
  Copy,
  Check,
  AlertTriangle,
  Clock,
  Layers,
  Sparkles,
  Zap,
  Info,
  Loader2,
} from 'lucide-react';
import { listApiKeys, createApiKey, revokeApiKey, setActiveApiKey, getActiveApiKey, getAuthToken } from '@/lib/api';

interface ApiKeyItem {
  id: string;
  key_name: string;
  key_prefix: string;
  scopes?: string;
  scopes_parsed?: {
    tier?: string;
    rpm?: number;
    daily?: number;
  };
  revoked: boolean;
  last_used_at?: string;
  created_at: string;
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKeyItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal / Create State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyTier, setNewKeyTier] = useState<'free' | 'pro'>('free');
  const [createdSecretKey, setCreatedSecretKey] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const fetchKeys = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await listApiKeys();
      setKeys(res.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch API keys. Please sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim() || isCreating) return;

    setIsCreating(true);
    setError(null);

    try {
      const res = await createApiKey(newKeyName.trim(), newKeyTier);
      const rawSecret = res.data?.key;
      setCreatedSecretKey(rawSecret);
      setActiveApiKey(rawSecret);
      await fetchKeys();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleRevokeKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to revoke this API key? This action is irreversible.')) {
      return;
    }
    try {
      await revokeApiKey(keyId);
      await fetchKeys();
    } catch (err: any) {
      alert(`Error revoking key: ${err.message}`);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2.5rem',
        }}
      >
        <div>
          <div className="badge-neon" style={{ marginBottom: '0.65rem' }}>
            <Shield size={14} />
            <span>Cryptographic Access Management</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#ffffff' }}>
            API Keys & Quotas
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#94a3b8' }}>
            Generate and manage sovereign API credentials with credit-protection rate limits.
          </p>
        </div>

        <button
          onClick={() => {
            setShowCreateModal(true);
            setCreatedSecretKey(null);
            setNewKeyName('');
          }}
          className="btn-primary"
          style={{ padding: '0.75rem 1.5rem' }}
        >
          <Plus size={18} />
          <span>Create New Key</span>
        </button>
      </div>

      {/* Credit Protection Notice */}
      <div
        className="glass-panel"
        style={{
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
          background: 'rgba(56, 189, 248, 0.05)',
          border: '1px solid rgba(56, 189, 248, 0.2)',
        }}
      >
        <Info size={20} color="#38bdf8" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>
            Automated Credit Protection Engine Active
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
            Free keys (<code style={{ color: '#38bdf8' }}>shiv_sk_free_...</code>) enforce a strict limit of <strong>10 requests/minute</strong> and a daily quota of <strong>250 requests</strong>. This prevents credit exhaustion and guarantees 100% continuous uptime.
          </p>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div
          style={{
            padding: '1rem 1.25rem',
            borderRadius: '12px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            fontSize: '0.88rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>{error}</span>
          {!getAuthToken() && (
            <Link href="/login" className="btn-secondary" style={{ padding: '0.35rem 0.85rem', fontSize: '0.78rem' }}>
              Sign In Now
            </Link>
          )}
        </div>
      )}

      {/* Keys List */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
            Your Active Credentials ({keys.filter((k) => !k.revoked).length})
          </h3>
        </div>

        {isLoading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
            <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 1rem' }} />
            <p>Loading credentials from SHIV DB...</p>
          </div>
        ) : keys.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#64748b' }}>
            <Key size={44} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.5rem' }}>
              No API keys found
            </h4>
            <p style={{ fontSize: '0.88rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
              Create your first sovereign key to connect SDKs, CLIs, or applications to SHIV AI.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
              style={{ padding: '0.65rem 1.35rem', fontSize: '0.88rem' }}
            >
              <Plus size={16} />
              <span>Create Free Key</span>
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {keys.map((item) => {
              const tier = item.scopes_parsed?.tier || 'free';
              const rpm = item.scopes_parsed?.rpm || 10;
              const daily = item.scopes_parsed?.daily || 250;

              return (
                <div
                  key={item.id}
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    opacity: item.revoked ? 0.5 : 1,
                    background: item.revoked ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                        {item.key_name}
                      </span>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.5rem',
                          borderRadius: '9999px',
                          background: item.revoked
                            ? 'rgba(239, 68, 68, 0.15)'
                            : tier === 'pro'
                            ? 'rgba(14, 165, 233, 0.15)'
                            : 'rgba(52, 211, 153, 0.15)',
                          color: item.revoked ? '#f87171' : tier === 'pro' ? '#38bdf8' : '#34d399',
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.revoked ? 'Revoked' : `${tier} Tier`}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                      <span style={{ fontFamily: 'var(--font-mono, monospace)', color: '#cbd5e1' }}>
                        {item.key_prefix}...••••••••
                      </span>
                      <span>•</span>
                      <span>Limit: {rpm} RPM / {daily} Daily</span>
                      <span>•</span>
                      <span>Created: {new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {!item.revoked && (
                    <button
                      onClick={() => handleRevokeKey(item.id)}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '8px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.25)',
                        color: '#f87171',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={14} />
                      <span>Revoke</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CREATE API KEY MODAL */}
      {showCreateModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '520px',
              padding: '2rem',
              background: '#0a0d14',
            }}
          >
            {!createdSecretKey ? (
              <form onSubmit={handleCreateKey}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                  Create Sovereign API Key
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
                  Choose a friendly identifier and select your tier.
                </p>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '0.4rem' }}>
                    Key Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Production Web Studio, CLI Tool"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '0.4rem' }}>
                    Tier & Quota Protection
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div
                      onClick={() => setNewKeyTier('free')}
                      style={{
                        padding: '1rem',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        border: newKeyTier === 'free' ? '2px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: newKeyTier === 'free' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                      }}
                    >
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.2rem' }}>
                        Free Tier
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>10 RPM • 250 requests/day</p>
                    </div>

                    <div
                      onClick={() => setNewKeyTier('pro')}
                      style={{
                        padding: '1rem',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        border: newKeyTier === 'pro' ? '2px solid #a855f7' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: newKeyTier === 'pro' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                      }}
                    >
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.2rem' }}>
                        Pro Tier ($19/mo)
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>60 RPM • 10,000 req/day</p>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="btn-secondary"
                    style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="btn-primary"
                    style={{ padding: '0.65rem 1.5rem', fontSize: '0.88rem' }}
                  >
                    {isCreating ? <Loader2 size={16} className="animate-spin" /> : 'Generate Key'}
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'rgba(52, 211, 153, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 0.75rem',
                    }}
                  >
                    <Check size={24} color="#34d399" />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.35rem' }}>
                    API Key Generated
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#f87171', fontWeight: 600 }}>
                    Please save this secret key now. It will NEVER be shown again!
                  </p>
                </div>

                <div
                  style={{
                    background: '#040609',
                    borderRadius: '8px',
                    padding: '0.85rem 1rem',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <code style={{ fontSize: '0.82rem', color: '#38bdf8', wordBreak: 'break-all' }}>
                    {createdSecretKey}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(createdSecretKey)}
                    className="btn-primary"
                    style={{ padding: '0.5rem 0.85rem', fontSize: '0.78rem', flexShrink: 0 }}
                  >
                    {copiedKey ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary"
                  style={{ width: '100%', padding: '0.75rem', fontSize: '0.88rem' }}
                >
                  Done & Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
