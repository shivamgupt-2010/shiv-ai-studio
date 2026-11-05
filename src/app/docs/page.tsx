'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Terminal,
  Code2,
  Copy,
  Check,
  Zap,
  Shield,
  Layers,
  ArrowRight,
  Cpu,
} from 'lucide-react';

export default function DocsPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const quickstartPython = `import openai

# 1. Initialize client with SHIV AI base URL and your sovereign key
client = openai.OpenAI(
    base_url="https://shiv-ai-server.onrender.com/v1",
    api_key="shiv_sk_free_your_secret_key"
)

# 2. Invoke chat completion with streaming
response = client.chat.completions.create(
    model="SHIV-Core-Omni",
    messages=[
        {"role": "system", "content": "You are SHIV AI."},
        {"role": "user", "content": "Explain microservices security in 3 bullets."}
    ],
    temperature=0.7,
    stream=True
)

for chunk in response:
    content = chunk.choices[0].delta.content or ""
    print(content, end="", flush=True)`;

  const quickstartImage = `import requests

url = "https://shiv-ai-server.onrender.com/media/generate/image"
headers = {
    "Authorization": "Bearer shiv_sk_free_your_secret_key",
    "Content-Type": "application/json"
}
payload = {
    "prompt": "Futuristic neon cyber city at twilight with glowing hyperlanes",
    "style": "photorealistic",
    "aspect_ratio": "16:9"
}

response = requests.post(url, json=payload, headers=headers)
data = response.json()
print("Generated Vision URL:", data["media_url"])`;

  const quickstartVoice = `import requests

url = "https://shiv-ai-server.onrender.com/media/synthesize/voice"
headers = {
    "Authorization": "Bearer shiv_sk_free_your_secret_key",
    "Content-Type": "application/json"
}
payload = {
    "text": "SHIV AI neural voice synthesis is online and active.",
    "voice": "en-US-ChristopherNeural",
    "speed": 1.0
}

response = requests.post(url, json=payload, headers=headers)
data = response.json()
print("Audio Stream URL:", data["audio_url"])`;

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
      {/* Docs Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div className="badge-neon" style={{ marginBottom: '0.75rem' }}>
          <BookOpen size={14} />
          <span>SHIV AI Developer Reference</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
          API Documentation
        </h1>
        <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '750px', lineHeight: 1.6 }}>
          Learn how to authenticate, interact with multimodal foundation engines, stream tokens with the official OpenAI SDK, and configure rate limit policies.
        </p>
      </div>

      {/* 1. Quickstart Section */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
          1. Quickstart with OpenAI SDK
        </h2>
        <p style={{ fontSize: '0.92rem', color: '#94a3b8', marginBottom: '1.25rem', lineHeight: 1.6 }}>
          SHIV AI implements the standard Chat Completions API format. You can use standard libraries without learning new SDK syntax.
        </p>

        <div className="glass-panel" style={{ padding: '1.5rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#38bdf8' }}>python (openai &gt;= 1.0.0)</span>
            <button
              onClick={() => copy(quickstartPython, 'python')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.75rem',
                color: copiedSection === 'python' ? '#34d399' : '#94a3b8',
                padding: '0.25rem 0.6rem',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              {copiedSection === 'python' ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedSection === 'python' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre
            style={{
              background: '#040609',
              borderRadius: '8px',
              padding: '1.25rem',
              color: '#e2e8f0',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.85rem',
              lineHeight: 1.6,
              overflowX: 'auto',
            }}
          >
            <code>{quickstartPython}</code>
          </pre>
        </div>
      </section>

      {/* 2. Authentication & Keys */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
          2. Authentication & Credentials
        </h2>
        <p style={{ fontSize: '0.92rem', color: '#94a3b8', marginBottom: '1rem', lineHeight: 1.6 }}>
          Every request must include your secret API key passed via the standard HTTP Authorization header:
        </p>
        <div
          style={{
            background: '#040609',
            borderRadius: '8px',
            padding: '1rem 1.25rem',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.88rem',
            color: '#38bdf8',
            marginBottom: '1.25rem',
          }}
        >
          Authorization: Bearer shiv_sk_free_4f8a9b2c...
        </div>
        <p style={{ fontSize: '0.92rem', color: '#94a3b8' }}>
          You can generate, inspect, and revoke your keys anytime in the{' '}
          <Link href="/keys" style={{ color: '#38bdf8', textDecoration: 'underline' }}>
            API Keys Dashboard
          </Link>.
        </p>
      </section>

      {/* 3. Rate Limiting & Credit Protection */}
      <section id="rate-limits" style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
          3. Rate Limiting & Credit Protection
        </h2>
        <p style={{ fontSize: '0.92rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          SHIV AI enforces server-side rate limits using a sliding window counter to prevent credit exhaustion.
        </p>

        <div className="glass-panel" style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.02)' }}>
                <th style={{ padding: '0.85rem 1.25rem', color: '#cbd5e1' }}>Tier</th>
                <th style={{ padding: '0.85rem 1.25rem', color: '#cbd5e1' }}>Requests / Minute (RPM)</th>
                <th style={{ padding: '0.85rem 1.25rem', color: '#cbd5e1' }}>Daily Quota</th>
                <th style={{ padding: '0.85rem 1.25rem', color: '#cbd5e1' }}>Max Output Tokens</th>
                <th style={{ padding: '0.85rem 1.25rem', color: '#cbd5e1' }}>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.85rem 1.25rem', fontWeight: 700, color: '#34d399' }}>Free</td>
                <td style={{ padding: '0.85rem 1.25rem', color: '#ffffff' }}>10 RPM</td>
                <td style={{ padding: '0.85rem 1.25rem', color: '#ffffff' }}>250 requests / day</td>
                <td style={{ padding: '0.85rem 1.25rem', color: '#ffffff' }}>2,048 tokens</td>
                <td style={{ padding: '0.85rem 1.25rem', color: '#94a3b8' }}>$0.00</td>
              </tr>
              <tr>
                <td style={{ padding: '0.85rem 1.25rem', fontWeight: 700, color: '#38bdf8' }}>Pro</td>
                <td style={{ padding: '0.85rem 1.25rem', color: '#ffffff' }}>60 RPM</td>
                <td style={{ padding: '0.85rem 1.25rem', color: '#ffffff' }}>10,000 requests / day</td>
                <td style={{ padding: '0.85rem 1.25rem', color: '#ffffff' }}>8,192 tokens</td>
                <td style={{ padding: '0.85rem 1.25rem', color: '#94a3b8' }}>$19.00 / month</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
          When a rate limit is exceeded, the server responds with HTTP <code style={{ color: '#f87171' }}>429 Too Many Requests</code> and provides a <code style={{ color: '#38bdf8' }}>Retry-After</code> header indicating the number of seconds to wait before retrying.
        </p>
      </section>

      {/* 4. Multimodal Vision & Voice APIs */}
      <section style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
          4. Multimodal Generation Endpoints
        </h2>

        {/* Vision Endpoint */}
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', background: '#0284c7', color: '#ffffff', fontSize: '0.75rem', fontWeight: 700 }}>
              POST
            </span>
            <code style={{ fontSize: '0.92rem', color: '#ffffff' }}>/media/generate/image</code>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Generates high-resolution images via SHIV-Vision-FLUX.
          </p>
          <pre
            style={{
              background: '#040609',
              borderRadius: '8px',
              padding: '1rem',
              color: '#e2e8f0',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.8rem',
              overflowX: 'auto',
            }}
          >
            <code>{quickstartImage}</code>
          </pre>
        </div>

        {/* Voice Endpoint */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', background: '#0284c7', color: '#ffffff', fontSize: '0.75rem', fontWeight: 700 }}>
              POST
            </span>
            <code style={{ fontSize: '0.92rem', color: '#ffffff' }}>/media/synthesize/voice</code>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Synthesizes lifelike speech via SHIV-Voice-Neural.
          </p>
          <pre
            style={{
              background: '#040609',
              borderRadius: '8px',
              padding: '1rem',
              color: '#e2e8f0',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.8rem',
              overflowX: 'auto',
            }}
          >
            <code>{quickstartVoice}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}
