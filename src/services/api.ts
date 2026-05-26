/// <reference types="vite/client" />

export const API_BASE = import.meta.env.VITE_API_URL || 'https://apex-tax-api.onrender.com';
const TOKEN_KEY = 'apex-tax-admin-token';

function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

async function request(method: string, path: string, body?: unknown) {
  const token = getToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const opts: RequestInit = {
    method,
    headers,
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${path}`, opts);
  if (!res.ok) {
    // 401 → clear token and reload
    if (res.status === 401) {
      clearToken();
      window.location.reload();
    }
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

// Auth
export const api = {
  auth: {
    login: async (username: string, password: string) => {
      const data = await request('POST', '/api/auth/login', { username, password }) as { token?: string };
      if (data?.token) setToken(data.token);
      return data;
    },
    logout: async () => {
      clearToken();
      await request('POST', '/api/auth/logout', {});
    },
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
    submit: (data: { full_name: string; email: string; phone?: string; tax_type?: string; message?: string; preferred_date?: string; preferred_time?: string }) =>
      request('POST', '/api/intake', data),
    list: (params?: { page?: number; limit?: number; status?: string }) => {
      const qs = new URLSearchParams();
      if (params?.page) qs.set('page', String(params.page));
      if (params?.limit) qs.set('limit', String(params.limit));
      if (params?.status) qs.set('status', params.status);
      const query = qs.toString() ? `?${qs.toString()}` : '';
      return request('GET', `/api/intake${query}`) as Promise<{ submissions: any[]; total: number; page: number; pages: number }>;
    },
    updateStatus: (id: string, status: string) => request('PATCH', `/api/intake/${id}`, { status }),
    convert: (id: string) => request('POST', `/api/intake/${id}/convert`) as Promise<{ ok: boolean; clientId: string; message: string }>,
  },
  appointments: {
    list: () => request('GET', '/api/appointments'),
    create: (data: { client_name: string; email: string; phone: string; date: string; time: string; notes?: string }) =>
      request('POST', '/api/appointments', data),
    updateStatus: (id: string, status: string) => request('PATCH', `/api/appointments/${id}`, { status }),
  },
  admin: {
    stats: () => request('GET', '/api/admin/stats'),
    activity: (params?: { page?: number; limit?: number }) => {
      const qs = new URLSearchParams();
      if (params?.page) qs.set('page', String(params.page));
      if (params?.limit) qs.set('limit', String(params.limit));
      const query = qs.toString() ? `?${qs.toString()}` : '';
      return request('GET', `/api/admin/activity${query}`) as Promise<{ logs: any[]; total: number; page: number; pages: number }>;
    },
  },
  documents: {
    list: (clientId?: string) =>
      request('GET', clientId ? `/api/documents?client_id=${clientId}` : '/api/documents'),
    upload: async (clientId: string, file: File) => {
      const token = getToken();
      const formData = new FormData();
      formData.append('client_id', clientId);
      formData.append('file', file);
      const res = await fetch(`${API_BASE}/api/documents/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err.error || `Upload failed: ${res.status}`);
      }
      return res.json();
    },
  },
};
