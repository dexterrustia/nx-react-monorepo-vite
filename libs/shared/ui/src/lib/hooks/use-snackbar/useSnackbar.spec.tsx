import { act, renderHook } from '@testing-library/react';
import { useSnackbar, UseSnackbarReturn } from './useSnackbar';

describe('useFormFieldHelpers', () => {
  test('initialized correctly', () => {
    const { result } = renderHook<UseSnackbarReturn, unknown>(() =>
      useSnackbar()
    );

    expect(result.current.alerts.length).toBe(0);
    expect(result.current.isOpen).toBe(false);
    act(() =>
      result.current.addSnackbarAlert({
        message: 'Test',
        severity: 'error',
      })
    );
    expect(result.current.alerts.length).toBe(1);
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.handleCloseSnackbar());
    expect(result.current.alerts.length).toBe(0);
    expect(result.current.isOpen).toBe(false);
  });
});
