'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Terminal,
  Sparkles,
  Zap,
  Key,
  Shield,
  Layers,
  ArrowRight,
  Code2,
  Copy,
  Check,
  Play,
  Volume2,
  Image as ImageIcon,
  Cpu,
  Database,
  Lock,
} from 'lucide-react';
import ShivBrandSignature from '@/components/common/ShivBrandSignature';

export default function HomePage() {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeSnippetTab, setActiveSnippetTab] = useState<'python' | 'curl' | 'typescript'>('python');

  const pythonSnippet = `import openai

client = openai.OpenAI(
    base_url="https://shiv-ai-server.onrender.com/v1",
    api_key="shiv_sk_free_your_secret_key"
)

response = client.chat.completions.create(
    model="SHIV-Core-Omni",
    messages=[
        {"role": "system", "content": "You are SHIV AI."},
        {"role": "user", "content": "Architect a resilient microservice."}
    ],
    stream=True
)

for chunk in response:
    print(chunk.choices[0].delta.content or "", end="")`;

  const curlSnippet = `curl https://shiv-ai-server.onrender.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer shiv_sk_free_your_secret_key" \\
  -d '{
    "model": "SHIV-Core-Omni",
    "messages": [{"role": "user", "content": "Explain quantum entanglement"}],
    "temperature": 0.7
  }'`;

  const tsSnippet = `const response = await fetch("https://shiv-ai-server.onrender.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer shiv_sk_free_your_secret_key"
  },
  body: JSON.stringify({
    model: "SHIV-Core-Omni",
    messages: [{ role: "user", content: "Build a Next.js component" }]
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
      {/* 1. Hero Section */}
      <section
        style={{
          padding: '4.5rem 0 3.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Subtle Ambient Glow behind Hero */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '650px',
            height: '400px',
            background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.12) 0%, rgba(139, 92, 246, 0.08) 45%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Top Badge */}
        <div
          className="badge-neon"
          style={{ marginBottom: '1.75rem', position: 'relative', zIndex: 1 }}
        >
          <Sparkles size={14} />
          <span>Sovereign Multimodal Intelligence 2.0</span>
        </div>

        {/* Main Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            maxWidth: '920px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Sovereign AI Built for <br />
          <span className="gradient-text">Engineers & Creators</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#94a3b8',
            maxWidth: '720px',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          An independent, high-reasoning intelligence platform directly comparable to Google AI Studio and Mistral Platform. Ultra low-latency chat, cinematic FLUX vision generation, sub-millisecond neural voice, and credit-protected developer API keys.
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '3.5rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Link href="/playground" className="btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
            <Terminal size={18} />
            <span>Launch Interactive Studio</span>
            <ArrowRight size={16} />
          </Link>
          <Link href="/keys" className="btn-secondary" style={{ padding: '0.85rem 1.85rem', fontSize: '1rem' }}>
            <Key size={18} color="#38bdf8" />
            <span>Create Developer Key</span>
          </Link>
        </div>

        {/* Live Architecture Teaser with Signature Icon */}
        <div
          className="glass-panel"
          style={{
            width: '100%',
            maxWidth: '960px',
            padding: '2rem',
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Zap size={22} color="#38bdf8" />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.35rem' }}>
                Sub-Second Inference
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
                Stream responses instantaneously with adaptive neural routing and zero simulated latency.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Shield size={22} color="#34d399" />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.35rem' }}>
                Credit-Protection Limits
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
                Guaranteed 10 RPM and 250 requests/day per free key. Your systems never run out of credits.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(249, 115, 22, 0.1)',
                border: '1px solid rgba(249, 115, 22, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Database size={22} color="#f97316" />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.35rem' }}>
                SHIV Native Identity
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
                Argon2id password hashing and HS256 JWT sessions unified across Codespaces and Media Editor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Foundation Models Showcase */}
      <section id="capabilities" style={{ padding: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge-emerald" style={{ marginBottom: '1rem' }}>
            <Cpu size={14} />
            <span>Sovereign Foundation Models</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Specialized Neural Engines
          </h2>
          <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
            Crafted for enterprise scale with zero external dependencies exposed to the end user.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {/* Card 1: SHIV-Core-Omni */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Terminal size={22} color="#38bdf8" />
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '9999px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8' }}>
                128K Context
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
              SHIV-Core-Omni
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Supreme reasoning model for mathematical logic, complex coding, refactoring, and multi-turn conversational agents with episodic memory retention.
            </p>
            <Link href="/playground?tab=chat" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontSize: '0.88rem', fontWeight: 600 }}>
              <span>Try in Chat Studio</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Card 2: SHIV-Vision-FLUX */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ImageIcon size={22} color="#a78bfa" />
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '9999px', background: 'rgba(139, 92, 246, 0.1)', color: '#a78bfa' }}>
                1024x1024 Ultra-HD
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
              SHIV-Vision-FLUX
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              State-of-the-art text-to-image synthesis engine with deep stylistic control (Photorealistic, Anime, Cyberpunk, 3D Render) and variable aspect ratios.
            </p>
            <Link href="/playground?tab=image" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#a78bfa', fontSize: '0.88rem', fontWeight: 600 }}>
              <span>Try in Image Studio</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Card 3: SHIV-Voice-Neural */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Volume2 size={22} color="#34d399" />
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399' }}>
                Zero Latency
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
              SHIV-Voice-Neural
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Hyper-realistic neural voice synthesis with multilingual English and Hindi accents (Christopher, Jenny, Madhur, Swara), pitch modulation, and MP3 streaming.
            </p>
            <Link href="/playground?tab=voice" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#34d399', fontSize: '0.88rem', fontWeight: 600 }}>
              <span>Try in Voice Studio</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Card 4: SHIV-Reels-v1 */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(249, 115, 22, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Play size={22} color="#f97316" />
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '9999px', background: 'rgba(249, 115, 22, 0.1)', color: '#f97316' }}>
                Multi-Scene Video
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
              SHIV-Reels-v1
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Autonomous scriptwriting and storyboard assembly engine. Converts simple textual prompts into complete narrative video reels with synchronized audio.
            </p>
            <Link href="/playground?tab=reel" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#f97316', fontSize: '0.88rem', fontWeight: 600 }}>
              <span>Try in Reel Studio</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Developer SDK & Integration Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="glass-panel" style={{ padding: '3rem 2rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="badge-neon" style={{ marginBottom: '1rem' }}>
              <Code2 size={14} />
              <span>Drop-in OpenAI SDK Compatibility</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
              Integrate in Under 60 Seconds
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#94a3b8' }}>
              SHIV AI supports the universal chat completions specification. Simply point your base URL to SHIV AI and supply your <code style={{ color: '#38bdf8' }}>shiv_sk_free_...</code> key.
            </p>
          </div>

          {/* Code Tabs */}
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setActiveSnippetTab('python')}
                  style={{
                    padding: '0.45rem 0.95rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: activeSnippetTab === 'python' ? '#ffffff' : '#94a3b8',
                    background: activeSnippetTab === 'python' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    border: activeSnippetTab === 'python' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                  }}
                >
                  Python (OpenAI SDK)
                </button>
                <button
                  onClick={() => setActiveSnippetTab('curl')}
                  style={{
                    padding: '0.45rem 0.95rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: activeSnippetTab === 'curl' ? '#ffffff' : '#94a3b8',
                    background: activeSnippetTab === 'curl' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    border: activeSnippetTab === 'curl' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                  }}
                >
                  cURL
                </button>
                <button
                  onClick={() => setActiveSnippetTab('typescript')}
                  style={{
                    padding: '0.45rem 0.95rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: activeSnippetTab === 'typescript' ? '#ffffff' : '#94a3b8',
                    background: activeSnippetTab === 'typescript' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    border: activeSnippetTab === 'typescript' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                  }}
                >
                  TypeScript (Fetch)
                </button>
              </div>

              <button
                onClick={() =>
                  copyToClipboard(
                    activeSnippetTab === 'python'
                      ? pythonSnippet
                      : activeSnippetTab === 'curl'
                      ? curlSnippet
                      : tsSnippet
                  )
                }
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.78rem',
                  color: copiedCode ? '#34d399' : '#94a3b8',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Code Box */}
            <div
              style={{
                background: '#040609',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '1.5rem',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.88rem',
                lineHeight: 1.6,
                color: '#e2e8f0',
                overflowX: 'auto',
              }}
            >
              <pre>
                <code>
                  {activeSnippetTab === 'python'
                    ? pythonSnippet
                    : activeSnippetTab === 'curl'
                    ? curlSnippet
                    : tsSnippet}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pricing / Tiers Section */}
      <section id="pricing" style={{ padding: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Predictable, Sovereign Pricing
          </h2>
          <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
            Strict rate limiting prevents credit exhaustion so you never receive unexpected invoices.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {/* Free Tier */}
          <div className="glass-panel" style={{ padding: '2.5rem 2rem', position: 'relative' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
              Sovereign Free
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
              Perfect for exploring, building prototypes, and running small apps.
            </p>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.5rem' }}>
              $0 <span style={{ fontSize: '1rem', fontWeight: 500, color: '#64748b' }}>/ forever</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Check size={16} color="#34d399" />
                <span><strong>10 RPM</strong> (Requests per minute limit)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Check size={16} color="#34d399" />
                <span><strong>250 requests/day</strong> quota protection</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Check size={16} color="#34d399" />
                <span><strong>2,048 max tokens</strong> per generation</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Check size={16} color="#34d399" />
                <span>Full access to Chat, Image & Voice</span>
              </li>
            </ul>
            <Link href="/keys" className="btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
              Create Free API Key
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="glass-panel glass-panel-glow" style={{ padding: '2.5rem 2rem', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                right: '24px',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Recommended
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
              Sovereign Pro
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
              For high-throughput production applications and automated pipelines.
            </p>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.5rem' }}>
              $19 <span style={{ fontSize: '1rem', fontWeight: 500, color: '#64748b' }}>/ month</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Check size={16} color="#38bdf8" />
                <span><strong>60 RPM</strong> (High-concurrency limit)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Check size={16} color="#38bdf8" />
                <span><strong>10,000 requests/day</strong> quota</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Check size={16} color="#38bdf8" />
                <span><strong>8,192 max tokens</strong> per generation</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Check size={16} color="#38bdf8" />
                <span>Priority neural routing & video reels</span>
              </li>
            </ul>
            <Link href="/keys" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
