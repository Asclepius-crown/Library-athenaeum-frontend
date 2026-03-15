import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from '../context/AuthContext';

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

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const TestComponent = () => <div>Protected Content</div>;

describe('PrivateRoute', () => {
  it('should render children when authenticated', () => {
    // Mock authenticated state
    localStorageMock.getItem.mockReturnValue('fake-token');

    render(
      <MemoryRouter>
        <AuthProvider>
          <PrivateRoute>
            <TestComponent />
          </PrivateRoute>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should redirect when not authenticated', () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <MemoryRouter>
        <AuthProvider>
          <PrivateRoute>
            <TestComponent />
          </PrivateRoute>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});