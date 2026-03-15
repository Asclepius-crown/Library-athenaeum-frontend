import { describe, it, expect, vi } from 'vitest';
import api from '../api/axiosClient';

// Mock axios
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      defaults: {
        baseURL: '/api',
        headers: { "Content-Type": "application/json" },
      },
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
    })),
  },
}));

describe('axiosClient', () => {
  it('should be configured', () => {
    expect(api).toBeDefined();
    expect(api.defaults.baseURL).toBe('/api');
  });
});