import { renderHook } from '@testing-library/react';
import { useScrollToTop } from './useScrollToTop';

describe('useScrollToTop', () => {
  test('initialized correctly', () => {
    window.scrollTo = vi.fn();
    renderHook(() => useScrollToTop());

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
