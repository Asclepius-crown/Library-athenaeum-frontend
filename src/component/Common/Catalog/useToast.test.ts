import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useToast from './useToast';

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should add and remove toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.addToast('Test message', 'success');
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].message).toBe('Test message');
    expect(result.current.toasts[0].type).toBe('success');

    // Advance time to remove toast
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('should use default type', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.addToast('Test message');
    });

    expect(result.current.toasts[0].type).toBe('info');
  });
});