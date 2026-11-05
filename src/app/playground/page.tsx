'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Terminal,
  ImageIcon,
  Volume2,
  Play,
  Send,
  Sparkles,
  Sliders,
  Copy,
  Check,
  Download,
  RotateCcw,
  Code2,
  Database,
  Cpu,
  Layers,
  ChevronRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { streamChat, generateImage, synthesizeVoice, generateReel, getActiveApiKey, API_BASE_URL } from '@/lib/api';

type Tab = 'chat' | 'image' | 'voice' | 'reel';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<Tab>('chat');

  // --- Chat State ---
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hello! I am SHIV AI, the sovereign creative and engineering intelligence of the SHIV Platform. How can I assist you with code, architecture, or multimedia today?',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState('You are SHIV AI, an elite engineering and creative AI built sovereignly for the SHIV Platform.');
  const [temperature, setTemperature] = useState(0.7);
  const [chatError, setChatError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Image State ---
  const [imagePrompt, setImagePrompt] = useState('Cinematic shot of a cybernetic futuristic server room with holographic data streams in glowing cyan and violet, 8k resolution');
  const [imageStyle, setImageStyle] = useState('photorealistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  // --- Voice State ---
  const [voiceText, setVoiceText] = useState('Welcome to SHIV AI. Sovereign intelligence engineered for ultra-fast performance and total reliability.');
  const [selectedVoice, setSelectedVoice] = useState('en-US-ChristopherNeural');
  const [voiceSpeed, setVoiceSpeed] = useState(1.0);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null);
  const [isVoiceLoading, setIsVoiceLoading] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  // --- Reel State ---
  const [reelPrompt, setReelPrompt] = useState('A 30-second introduction explaining the power of sovereign artificial intelligence');
  const [isReelLoading, setIsReelLoading] = useState(false);
  const [reelResult, setReelResult] = useState<any>(null);
  const [reelError, setReelError] = useState<string | null>(null);

  // --- Code Snippet State ---
  const [copiedCode, setCopiedCode] = useState(false);
  const [snippetLanguage, setSnippetLanguage] = useState<'python' | 'curl' | 'typescript'>('python');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Handle Chat Submission
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isChatLoading) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    setChatError(null);

    const newMessages: Message[] = [...chatMessages, { role: 'user', content: userText }];
    setChatMessages(newMessages);
    setIsChatLoading(true);

    let assistantText = '';
    setChatMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      await streamChat(
        newMessages,
        'SHIV-Core-Omni',
        temperature,
        systemPrompt,
        (token) => {
          assistantText += token;
          setChatMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: 'assistant', content: assistantText };
            return updated;
          });
        },
        () => {
          setIsChatLoading(false);
        },
        (err) => {
          setChatError(err.message);
          setIsChatLoading(false);
        }
      );
    } catch (err: any) {
      setChatError(err.message);
      setIsChatLoading(false);
    }
  };

  // Handle Image Generation
  const handleGenerateImage = async () => {
    if (!imagePrompt.trim() || isImageLoading) return;
    setIsImageLoading(true);
    setImageError(null);
    try {
      const res = await generateImage(imagePrompt, imageStyle, aspectRatio);
      setGeneratedImageUrl(res.media_url);
    } catch (err: any) {
      setImageError(err.message);
    } finally {
      setIsImageLoading(false);
    }
  };

  // Handle Voice Synthesis
  const handleSynthesizeVoice = async () => {
    if (!voiceText.trim() || isVoiceLoading) return;
    setIsVoiceLoading(true);
    setVoiceError(null);
    try {
      const res = await synthesizeVoice(voiceText, selectedVoice, voiceSpeed);
      const audioUrl = res.audio_url.startsWith('http') ? res.audio_url : `${API_BASE_URL}${res.audio_url}`;
      setGeneratedAudioUrl(audioUrl);
    } catch (err: any) {
      setVoiceError(err.message);
    } finally {
      setIsVoiceLoading(false);
    }
  };

  // Handle Reel Generation
  const handleGenerateReel = async () => {
    if (!reelPrompt.trim() || isReelLoading) return;
    setIsReelLoading(true);
    setReelError(null);
    try {
      const res = await generateReel(reelPrompt, selectedVoice);
      setReelResult(res);
    } catch (err: any) {
      setReelError(err.message);
    } finally {
      setIsReelLoading(false);
    }
  };

  // Generate dynamic snippet based on active tab
  const getDynamicSnippet = () => {
    if (activeTab === 'chat') {
      if (snippetLanguage === 'python') {
        return `import openai

client = openai.OpenAI(
    base_url="${API_BASE_URL}/v1",
    api_key="${getActiveApiKey() || 'shiv_sk_free_your_key'}"
)

response = client.chat.completions.create(
    model="SHIV-Core-Omni",
    messages=[
        {"role": "system", "content": "${systemPrompt.replace(/"/g, '\\"')}"},
        {"role": "user", "content": "${(chatMessages[chatMessages.length - 1]?.content || 'Hello').replace(/"/g, '\\"')}"}
    ],
    temperature=${temperature},
    stream=True
)

for chunk in response:
    print(chunk.choices[0].delta.content or "", end="")`;
      } else if (snippetLanguage === 'curl') {
        return `curl ${API_BASE_URL}/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${getActiveApiKey() || 'shiv_sk_free_your_key'}" \\
  -d '{
    "model": "SHIV-Core-Omni",
    "messages": [
      {"role": "system", "content": "${systemPrompt.replace(/"/g, '\\"')}"},
      {"role": "user", "content": "Hello"}
    ],
    "temperature": ${temperature}
  }'`;
      } else {
        return `const response = await fetch("${API_BASE_URL}/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer ${getActiveApiKey() || 'shiv_sk_free_your_key'}"
  },
  body: JSON.stringify({
    model: "SHIV-Core-Omni",
    messages: [
      { role: "system", content: "${systemPrompt.replace(/"/g, '\\"')}" },
      { role: "user", content: "Hello" }
    ],
    temperature: ${temperature}
  })
});`;
      }
    } else if (activeTab === 'image') {
      if (snippetLanguage === 'python') {
        return `import requests

resp = requests.post(
    "${API_BASE_URL}/media/generate/image",
    headers={"Authorization": "Bearer ${getActiveApiKey() || 'shiv_sk_free_your_key'}"},
    json={"prompt": "${imagePrompt.replace(/"/g, '\\"')}", "style": "${imageStyle}", "aspect_ratio": "${aspectRatio}"}
)
print(resp.json())`;
      } else {
        return `curl -X POST ${API_BASE_URL}/media/generate/image \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${getActiveApiKey() || 'shiv_sk_free_your_key'}" \\
  -d '{"prompt": "${imagePrompt.replace(/"/g, '\\"')}", "style": "${imageStyle}"}'`;
      }
    } else {
      return `curl -X POST ${API_BASE_URL}/media/synthesize/voice \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${getActiveApiKey() || 'shiv_sk_free_your_key'}" \\
  -d '{"text": "${voiceText.replace(/"/g, '\\"')}", "voice": "${selectedVoice}"}'`;
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(getDynamicSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '1.5rem 1.5rem 4rem' }}>
      {/* Studio Header Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)',
            }}
          >
            <Terminal size={20} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
              SHIV AI Studio
            </h1>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              Interactive Multimodal Playground & Code Generator
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.3rem',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <button
            onClick={() => setActiveTab('chat')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: activeTab === 'chat' ? '#ffffff' : '#94a3b8',
              background: activeTab === 'chat' ? 'linear-gradient(135deg, #0ea5e9, #3b82f6)' : 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <Terminal size={15} />
            <span>Chat Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('image')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: activeTab === 'image' ? '#ffffff' : '#94a3b8',
              background: activeTab === 'image' ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' : 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <ImageIcon size={15} />
            <span>Image Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('voice')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: activeTab === 'voice' ? '#ffffff' : '#94a3b8',
              background: activeTab === 'voice' ? 'linear-gradient(135deg, #10b981, #06b6d4)' : 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <Volume2 size={15} />
            <span>Voice Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('reel')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: activeTab === 'reel' ? '#ffffff' : '#94a3b8',
              background: activeTab === 'reel' ? 'linear-gradient(135deg, #f97316, #ef4444)' : 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <Play size={15} />
            <span>Reel Studio</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Left Main Area + Right Parameters & SDK Drawer */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: '1.5rem',
          alignItems: 'start',
        }}
      >
        {/* LEFT COLUMN: ACTIVE STUDIO VIEW */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* TAB 1: CHAT STUDIO */}
          {activeTab === 'chat' && (
            <div
              className="glass-panel"
              style={{
                height: '680px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Messages Scroll Area */}
              <div
                style={{
                  flex: 1,
                  padding: '1.5rem',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        marginBottom: '0.35rem',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: msg.role === 'user' ? '#94a3b8' : '#38bdf8',
                      }}
                    >
                      {msg.role === 'user' ? (
                        <span>You</span>
                      ) : (
                        <>
                          <Image src="/icon.svg" alt="SHIV AI" width={16} height={16} />
                          <span>SHIV AI (Core-Omni)</span>
                        </>
                      )}
                    </div>
                    <div
                      style={{
                        maxWidth: '85%',
                        padding: '1rem 1.25rem',
                        borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        background:
                          msg.role === 'user'
                            ? 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)'
                            : 'rgba(255, 255, 255, 0.04)',
                        border:
                          msg.role === 'user'
                            ? '1px solid rgba(56, 189, 248, 0.3)'
                            : '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#ffffff',
                        fontSize: '0.92rem',
                        lineHeight: 1.6,
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {msg.content || (isChatLoading && idx === chatMessages.length - 1 ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8' }}>
                          <Loader2 size={16} className="animate-spin" /> Thinking...
                        </span>
                      ) : '')}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Error Banner */}
              {chatError && (
                <div
                  style={{
                    margin: '0 1.5rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#f87171',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <AlertCircle size={16} />
                  <span>{chatError}</span>
                </div>
              )}

              {/* Chat Input Bar */}
              <form
                onSubmit={handleSendMessage}
                style={{
                  padding: '1rem 1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'rgba(7, 9, 14, 0.6)',
                }}
              >
                <input
                  type="text"
                  placeholder="Ask SHIV AI to architect code, solve math, or design APIs..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={isChatLoading}
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '9999px',
                    padding: '0.75rem 1.25rem',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !inputMessage.trim()}
                  className="btn-primary"
                  style={{ padding: '0.75rem 1.25rem', borderRadius: '9999px' }}
                >
                  {isChatLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: IMAGE STUDIO */}
          {activeTab === 'image' && (
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '0.5rem' }}>
                  Prompt for SHIV-Vision-FLUX
                </label>
                <textarea
                  rows={3}
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="Describe your desired scene in vivid detail..."
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '0.85rem 1rem',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Style Presets and Aspect Ratio */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.4rem' }}>
                    Visual Style Preset
                  </label>
                  <select
                    value={imageStyle}
                    onChange={(e) => setImageStyle(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#0e121b',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '0.6rem 0.85rem',
                      color: '#ffffff',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  >
                    <option value="photorealistic">Cinematic Photorealistic</option>
                    <option value="anime">Anime / Cyber Manga</option>
                    <option value="cyberpunk">Cyberpunk Neon</option>
                    <option value="3d_render">3D Pixar / Octane Render</option>
                    <option value="oil_painting">Fine Art Oil Painting</option>
                    <option value="minimalist">Minimalist Vector Art</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.4rem' }}>
                    Aspect Ratio
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['1:1', '16:9', '9:16'].map((ratio) => (
                      <button
                        key={ratio}
                        type="button"
                        onClick={() => setAspectRatio(ratio)}
                        style={{
                          flex: 1,
                          padding: '0.55rem',
                          borderRadius: '8px',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          background: aspectRatio === ratio ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                          border: aspectRatio === ratio ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                          color: aspectRatio === ratio ? '#38bdf8' : '#94a3b8',
                        }}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {imageError && (
                <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  {imageError}
                </div>
              )}

              <button
                type="button"
                onClick={handleGenerateImage}
                disabled={isImageLoading}
                className="btn-primary"
                style={{ width: '100%', padding: '0.85rem', marginBottom: '2rem' }}
              >
                {isImageLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Synthesizing Vision via SHIV-Vision-FLUX...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>Generate Vision Asset</span>
                  </>
                )}
              </button>

              {/* Image Preview Box */}
              <div
                style={{
                  minHeight: '360px',
                  borderRadius: '16px',
                  background: '#040609',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {generatedImageUrl ? (
                  <div style={{ position: 'relative', width: '100%', height: '450px' }}>
                    <img
                      src={generatedImageUrl}
                      alt="Generated Vision"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                    <a
                      href={generatedImageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download="shiv_ai_generated.png"
                      className="btn-secondary"
                      style={{
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        fontSize: '0.82rem',
                        padding: '0.5rem 1rem',
                      }}
                    >
                      <Download size={15} />
                      <span>Download HD</span>
                    </a>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: '#64748b' }}>
                    <ImageIcon size={48} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
                    <p style={{ fontSize: '0.88rem' }}>Generated visual art will render here in real-time</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: VOICE STUDIO */}
          {activeTab === 'voice' && (
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '0.5rem' }}>
                  Speech Script for SHIV-Voice-Neural
                </label>
                <textarea
                  rows={4}
                  value={voiceText}
                  onChange={(e) => setVoiceText(e.target.value)}
                  placeholder="Enter the speech script to synthesize..."
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '0.85rem 1rem',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Voice and Speed Controls */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.4rem' }}>
                    Neural Voice Persona
                  </label>
                  <select
                    value={selectedVoice}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#0e121b',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '0.6rem 0.85rem',
                      color: '#ffffff',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  >
                    <option value="en-US-ChristopherNeural">Christopher (US Deep / Authoritative Male)</option>
                    <option value="en-US-JennyNeural">Jenny (US Natural / Expressive Female)</option>
                    <option value="hi-IN-MadhurNeural">Madhur (Hindi Natural Male)</option>
                    <option value="hi-IN-SwaraNeural">Swara (Hindi Expressive Female)</option>
                  </select>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.4rem' }}>
                    <span>Playback Speed</span>
                    <span style={{ color: '#38bdf8' }}>{voiceSpeed}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={voiceSpeed}
                    onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: '#38bdf8' }}
                  />
                </div>
              </div>

              {voiceError && (
                <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  {voiceError}
                </div>
              )}

              <button
                type="button"
                onClick={handleSynthesizeVoice}
                disabled={isVoiceLoading}
                className="btn-primary"
                style={{ width: '100%', padding: '0.85rem', marginBottom: '2rem' }}
              >
                {isVoiceLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Synthesizing Audio Stream...</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={18} />
                    <span>Synthesize Voiceover</span>
                  </>
                )}
              </button>

              {/* Audio Player */}
              {generatedAudioUrl && (
                <div
                  style={{
                    padding: '1.5rem',
                    borderRadius: '12px',
                    background: '#040609',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#38bdf8' }}>
                      Audio Stream Ready
                    </span>
                    <a
                      href={generatedAudioUrl}
                      download="shiv_ai_voiceover.mp3"
                      style={{ fontSize: '0.78rem', color: '#94a3b8', textDecoration: 'underline' }}
                    >
                      Download MP3
                    </a>
                  </div>
                  <audio controls src={generatedAudioUrl} style={{ width: '100%' }} autoPlay />
                </div>
              )}
            </div>
          )}

          {/* TAB 4: REEL STUDIO */}
          {activeTab === 'reel' && (
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '0.5rem' }}>
                  Story Concept for SHIV-Reels-v1
                </label>
                <textarea
                  rows={3}
                  value={reelPrompt}
                  onChange={(e) => setReelPrompt(e.target.value)}
                  placeholder="Describe the story, marketing angle, or lesson for this reel..."
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '0.85rem 1rem',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              {reelError && (
                <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  {reelError}
                </div>
              )}

              <button
                type="button"
                onClick={handleGenerateReel}
                disabled={isReelLoading}
                className="btn-primary"
                style={{ width: '100%', padding: '0.85rem', marginBottom: '2rem' }}
              >
                {isReelLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Writing Script & Storyboard via SHIV-Reels-v1...</span>
                  </>
                ) : (
                  <>
                    <Play size={18} />
                    <span>Generate Reel Storyboard</span>
                  </>
                )}
              </button>

              {reelResult && (
                <div style={{ padding: '1.5rem', borderRadius: '12px', background: '#040609', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f97316', marginBottom: '0.75rem' }}>
                    Reel Storyboard Generated (ID: {reelResult.reel_id})
                  </h4>
                  <pre style={{ color: '#cbd5e1', fontSize: '0.85rem', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                    {reelResult.script || JSON.stringify(reelResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: PARAMETERS & DYNAMIC CODE GENERATOR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Studio Parameters Card */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Sliders size={18} color="#38bdf8" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                Studio Parameters
              </h3>
            </div>

            {/* Model Name */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.35rem' }}>
                Active Engine
              </label>
              <div
                style={{
                  padding: '0.55rem 0.85rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#ffffff',
                }}
              >
                {activeTab === 'chat' && 'SHIV-Core-Omni (128K)'}
                {activeTab === 'image' && 'SHIV-Vision-FLUX (1024px)'}
                {activeTab === 'voice' && 'SHIV-Voice-Neural'}
                {activeTab === 'reel' && 'SHIV-Reels-v1'}
              </div>
            </div>

            {/* System Prompt for Chat */}
            {activeTab === 'chat' && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.35rem' }}>
                  System Instructions
                </label>
                <textarea
                  rows={3}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '0.55rem 0.75rem',
                    color: '#ffffff',
                    fontSize: '0.8rem',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>
            )}

            {/* Temperature Slider */}
            {activeTab === 'chat' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.35rem' }}>
                  <span>Temperature</span>
                  <span style={{ color: '#38bdf8' }}>{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.5"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#38bdf8' }}
                />
              </div>
            )}
          </div>

          {/* Dynamic SDK Snippet Drawer */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Code2 size={16} color="#38bdf8" />
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
                  Live SDK Snippet
                </h4>
              </div>
              <button
                onClick={copyCode}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.72rem',
                  color: copiedCode ? '#34d399' : '#94a3b8',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                }}
              >
                {copiedCode ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Snippet Language Selector */}
            <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.75rem' }}>
              {(['python', 'curl', 'typescript'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSnippetLanguage(lang)}
                  style={{
                    flex: 1,
                    padding: '0.35rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    color: snippetLanguage === lang ? '#38bdf8' : '#64748b',
                    background: snippetLanguage === lang ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    border: snippetLanguage === lang ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Snippet Code Area */}
            <div
              style={{
                background: '#040609',
                borderRadius: '8px',
                padding: '0.85rem',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.72rem',
                lineHeight: 1.5,
                color: '#cbd5e1',
                maxHeight: '280px',
                overflowX: 'auto',
                overflowY: 'auto',
              }}
            >
              <pre>
                <code>{getDynamicSnippet()}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
