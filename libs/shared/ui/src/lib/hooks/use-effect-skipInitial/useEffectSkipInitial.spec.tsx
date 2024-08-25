import { describe, test, expect, vi } from 'vitest';

import { act, renderHook } from '@testing-library/react';
import { useEffectSkipInitial } from './useEffectSkipInitial';

describe('useEffectSkipInitial', () => {
  test('initialized correctly', () => {
    const mockEffect = vi.fn();
    let dependency = 1;
    const { rerender } = renderHook(() =>
      useEffectSkipInitial(mockEffect, [dependency])
    );

    expect(mockEffect).not.toHaveBeenCalled();
    act(() => {
      dependency = 2;
      rerender();
    });
    expect(mockEffect).toHaveBeenCalledTimes(1);
  });
});
