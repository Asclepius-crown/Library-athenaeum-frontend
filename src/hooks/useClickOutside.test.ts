import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useClickOutside from './useClickOutside';

describe('useClickOutside', () => {
  it('should call callback when clicking outside', () => {
    const callback = vi.fn();
    const ref = { current: document.createElement('div') };

    renderHook(() => useClickOutside(ref, callback));

    // Simulate click outside
    act(() => {
      document.dispatchEvent(new MouseEvent('mousedown'));
    });

    expect(callback).toHaveBeenCalled();
  });

  it('should not call callback when clicking inside', () => {
    const callback = vi.fn();
    const element = document.createElement('div');
    const ref = { current: element };

    renderHook(() => useClickOutside(ref, callback));

    // Simulate click inside
    act(() => {
      element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    expect(callback).not.toHaveBeenCalled();
  });
});