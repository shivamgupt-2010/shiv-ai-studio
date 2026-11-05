/**
 * SHIV AI Sovereign API Client.
 * Connects directly to SHIV AI Backend & Database with full support for
 * Native Auth (Argon2id + JWT), API Key rotation & rate limits, and Multimodal streaming.
 */

export const API_BASE_URL = typeof window !== 'undefined'
  ? (process.env.NEXT_PUBLIC_SHIV_API_URL || 'http://127.0.0.1:8000')
  : (process.env.NEXT_PUBLIC_SHIV_API_URL || 'http://127.0.0.1:8000');

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('shiv_access_token');
}

export function setAuthToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('shiv_access_token', token);
  }
}

export function removeAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('shiv_access_token');
    localStorage.removeItem('shiv_user_profile');
  }
}

export function getActiveApiKey(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('shiv_active_api_key');
}

export function setActiveApiKey(key: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('shiv_active_api_key', key);
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const apiKey = getActiveApiKey();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
    headers['x-api-key'] = apiKey;
  }

  const url = `${API_BASE_URL.replace(/\/+$/, '')}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data?.detail?.error?.message || data?.detail || data?.message || `HTTP ${response.status} Error`;
    throw new Error(errorMsg);
  }

  return data as T;
}

// --- Authentication ---
export async function login(identifier: string, password: string) {
  const res = await request<any>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ identifier, password, device_info: 'SHIV AI Web Studio' }),
  });
  if (res.access_token) {
    setAuthToken(res.access_token);
    if (typeof window !== 'undefined') {
      localStorage.setItem('shiv_user_profile', JSON.stringify(res.user));
    }
  }
  return res;
}

export async function register(email: string, username: string, password: string, display_name?: string) {
  const res = await request<any>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, username, password, display_name: display_name || username }),
  });
  if (res.access_token) {
    setAuthToken(res.access_token);
    if (typeof window !== 'undefined') {
      localStorage.setItem('shiv_user_profile', JSON.stringify(res.user));
    }
  }
  return res;
}

export async function getMe() {
  return await request<any>('/auth/me');
}

// --- API Keys Management ---
export async function listApiKeys() {
  return await request<{ success: boolean; count: number; data: any[] }>('/api-keys');
}

export async function createApiKey(key_name: string, tier: 'free' | 'pro' = 'free') {
  return await request<{ success: boolean; message: string; data: any }>('/api-keys', {
    method: 'POST',
    body: JSON.stringify({ key_name, tier }),
  });
}

export async function revokeApiKey(key_id: string) {
  return await request<{ success: boolean; message: string }>(`/api-keys/${key_id}`, {
    method: 'DELETE',
  });
}

// --- Multimodal Services ---
export async function generateImage(prompt: string, style?: string, aspect_ratio?: string) {
  return await request<{ success: boolean; media_url: string; base64?: string; prompt: string }>('/media/generate/image', {
    method: 'POST',
    body: JSON.stringify({ prompt, style, aspect_ratio }),
  });
}

export async function synthesizeVoice(text: string, voice?: string, speed_rate?: number) {
  return await request<{ success: boolean; audio_url: string; duration_estimate?: number }>('/media/synthesize/voice', {
    method: 'POST',
    body: JSON.stringify({ text, voice: voice || 'en-US-ChristopherNeural', speed: speed_rate || 1.0 }),
  });
}

export async function generateReel(prompt: string, voice?: string) {
  return await request<{ success: boolean; reel_id: string; video_url?: string; script?: string; status: string }>('/media/generate/video', {
    method: 'POST',
    body: JSON.stringify({ prompt, voice }),
  });
}

// --- Server-Sent Events Streaming Chat ---
export async function streamChat(
  messages: Array<{ role: string; content: string }>,
  model: string = 'SHIV-Core-Omni',
  temperature: number = 0.7,
  system_prompt?: string,
  onToken?: (token: string) => void,
  onDone?: (fullText: string) => void,
  onError?: (err: Error) => void,
) {
  const token = getAuthToken();
  const apiKey = getActiveApiKey();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
    headers['x-api-key'] = apiKey;
  }

  const payload = {
    messages: system_prompt ? [{ role: 'system', content: system_prompt }, ...messages] : messages,
    model: model === 'SHIV-Core-Omni' ? 'gemini-flash-lite-latest' : 'openai/gpt-oss-20b',
    temperature,
    stream: true,
  };

  try {
    const url = `${API_BASE_URL.replace(/\/+$/, '')}/v1/chat/completions`;
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      const msg = errJson?.detail?.error?.message || errJson?.detail || `HTTP ${response.status} Error`;
      throw new Error(msg);
    }

    if (!response.body) {
      throw new Error('No readable stream returned by server.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let fullResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed === 'data: [DONE]') continue;

        if (trimmed.startsWith('data: ')) {
          try {
            const data = JSON.parse(trimmed.slice(6));
            const delta = data.choices?.[0]?.delta?.content || '';
            if (delta) {
              fullResponse += delta;
              onToken?.(delta);
            }
          } catch {
            // Raw text fallback
            const content = trimmed.slice(6);
            if (content) {
              fullResponse += content;
              onToken?.(content);
            }
          }
        }
      }
    }

    onDone?.(fullResponse);
    return fullResponse;
  } catch (error: any) {
    onError?.(error);
    throw error;
  }
}
