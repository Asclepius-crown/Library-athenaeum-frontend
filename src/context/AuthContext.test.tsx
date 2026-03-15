import React from 'react';
import { describe, it, expect, vi, beforeEach, type MockedFunction } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthProvider, useAuth } from './AuthContext';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock api
vi.mock('../api/axiosClient', () => ({
  default: {
    defaults: { headers: { common: {} } },
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

const TestComponent = () => {
  const auth = useAuth();
  return (
    <div>
      <div data-testid="user">{auth.user ? auth.user.name : 'No User'}</div>
      <div data-testid="loading">{auth.loading ? 'Loading' : 'Not Loading'}</div>
      <button onClick={() => auth.login('test@example.com', 'password')}>Login</button>
      <button onClick={auth.logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('should render with no user initially', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByTestId('user')).toHaveTextContent('No User');
  });

  it('should handle login', async () => {
    const mockApi = await import('../api/axiosClient');
    (mockApi.default.post as MockedFunction<any>).mockResolvedValue({
      data: { token: 'fake-token', user: { name: 'Test User' } },
    });
    (mockApi.default.get as MockedFunction<any>).mockResolvedValue({
      data: { user: { name: 'Test User' } },
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      fireEvent.click(screen.getByText('Login'));
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith('token', 'fake-token');
    expect(screen.getByTestId('user')).toHaveTextContent('Test User');
  });

  it('should handle logout', () => {
    localStorageMock.getItem.mockReturnValue('fake-token');

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      fireEvent.click(screen.getByText('Logout'));
    });

    expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
    expect(screen.getByTestId('user')).toHaveTextContent('No User');
  });
});