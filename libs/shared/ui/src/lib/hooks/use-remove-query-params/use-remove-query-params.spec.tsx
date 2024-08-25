import { renderHook } from '@testing-library/react';
import { nextRouterProviderWrapper } from '@xpand/ui/_test';
import useRemoveQueryParams from './use-remove-query-params';

describe('useRemoveQueryParams', () => {
  test('should remove all query params', () => {
    const mockRouterReplace = vi.fn();

    renderHook(() => useRemoveQueryParams(), {
      wrapper: nextRouterProviderWrapper({
        options: {
          router: {
            asPath: '/test?foo=1&bar=2',
            replace: mockRouterReplace,
          },
        },
      }),
    });

    expect(mockRouterReplace).toHaveBeenCalledWith('/test', undefined, {
      shallow: true,
    });
  });

  test('should remove query params if queryKey is present', () => {
    const mockRouterReplace = vi.fn();

    renderHook(() => useRemoveQueryParams({ queryKey: 'foo' }), {
      wrapper: nextRouterProviderWrapper({
        options: {
          router: {
            asPath: '/test?foo=1&bar=2',
            replace: mockRouterReplace,
            query: {
              foo: '1',
              bar: '2',
            },
          },
        },
      }),
    });

    expect(mockRouterReplace).toHaveBeenCalledWith('/test', undefined, {
      shallow: true,
    });
  });

  test('should be called with shallow: false if shallow is false', () => {
    const mockRouterReplace = vi.fn();

    renderHook(() => useRemoveQueryParams({ shallow: false }), {
      wrapper: nextRouterProviderWrapper({
        options: {
          router: {
            asPath: '/test?foo=1&bar=2',
            replace: mockRouterReplace,
          },
        },
      }),
    });

    expect(mockRouterReplace).toHaveBeenCalledWith('/test', undefined, {
      shallow: false,
    });
  });

  test('should not remove query params if queryKey is not present', () => {
    const mockRouterReplace = vi.fn();

    renderHook(() => useRemoveQueryParams({ queryKey: 'foo' }), {
      wrapper: nextRouterProviderWrapper({
        options: {
          router: {
            asPath: '/test?foo=1&bar=2',
            replace: mockRouterReplace,
            query: {
              bar: '2',
            },
          },
        },
      }),
    });

    expect(mockRouterReplace).not.toHaveBeenCalled();
  });
});
