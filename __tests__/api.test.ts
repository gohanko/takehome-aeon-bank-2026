import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchWithAuth } from '../utils/api'

describe('API Utility - fetchWithAuth', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn();
        
        const store: Record<string, string> = {};
        global.localStorage = {
            getItem: vi.fn((key: string) => store[key] || null),
            setItem: vi.fn((key: string, value: string) => { store[key] = value }),
            removeItem: vi.fn((key: string) => { delete store[key] }),
            clear: vi.fn(() => {}),
            length: 0,
            key: vi.fn()
        } as any;
        
        Object.defineProperty(window, 'location', {
            value: { href: '' },
            writable: true
        });
    })

    it('adds Authorization header if token exists in localStorage', async () => {
        global.localStorage.setItem('token', 'mock-token-123');
        (global.fetch as any).mockResolvedValueOnce({ status: 200 });

        await fetchWithAuth('/api/test');
        
        expect(global.fetch).toHaveBeenCalledWith('/api/test', expect.objectContaining({
            headers: expect.any(Headers)
        }));
        
        const callArgs = (global.fetch as any).mock.calls[0][1];
        expect(callArgs.headers.get('Authorization')).toBe('Bearer mock-token-123');
    })

    it('redirects to login and clears token on 401 Unauthorized', async () => {
        global.localStorage.setItem('token', 'mock-token-123');
        global.localStorage.setItem('role', 'maker');
        (global.fetch as any).mockResolvedValueOnce({ status: 401 });

        await fetchWithAuth('/api/test');

        expect(global.localStorage.getItem('token')).toBeNull();
        expect(global.localStorage.getItem('role')).toBeNull();
        expect(window.location.href).toBe('/authentication/login');
    })
})
