/// <reference types="vite/client" />

const API_BASE = import.meta.env.VITE_API_URL || 'https://apex-tax-api.onrender.com';

async function request(method: string, path: string, body?: unknown) {
  const opts: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${API_BASE}${path}`, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

// Auth
export const api = {
  auth: {
    login: (username: string, password: string) => request('POST', '/api/auth/login', { username, password }),
    logout: () => request('POST', '/api/auth/logout', {}),
    me: () => request('GET', '/api/auth/me'),
  },
  clients: {
    list: () => request('GET', '/api/clients'),
    get: (id: string) => request('GET', `/api/clients/${id}`),
    create: (data: Record<string, string>) => request('POST', '/api/clients', data),
    update: (id: string, data: Record<string, string>) => request('PATCH', `/api/clients/${id}`, data),
    delete: (id: string) => request('DELETE', `/api/clients/${id}`),
  },
  intake: {
    submit: (data: { full_name: string; email: string; phone?: string; tax_type?: string; message?: string }) =>
      request('POST', '/api/intake', data),
    list: () => request('GET', '/api/intake'),
    updateStatus: (id: string, status: string) => request('PATCH', `/api/intake/${id}`, { status }),
  },
  admin: {
    stats: () => request('GET', '/api/admin/stats'),
  },
};
