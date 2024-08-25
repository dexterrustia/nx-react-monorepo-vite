import { describe, test, expect, vi } from 'vitest';

import { render, renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import {
  UseAlertSnackbarProps,
  useAlertSnackbar,
  UseAlertSnackbarReturn,
  useAlertSnackbarContext,
  AlertSnackbarContextReturnValue,
  AlertSnackbarProvider,
} from './alert-snackbar-ctx';

describe('useAlertSnackbar', () => {
  test('initializes with minimal props and parameters', () => {
    const mockOnClose = vi.fn();

    const { result } = renderHook<UseAlertSnackbarReturn, unknown>(() =>
      useAlertSnackbar()
    );

    act(() =>
      result.current.addSnackbarAlert({
        message: 'Test',
        severity: 'error',
      })
    );

    act(() => result.current.handleCloseSnackbar());

    expect(mockOnClose).not.toHaveBeenCalled();
    expect(result.current.autoHideDuration).toBe(1500);
  });

  test('adds an alert and closes while calling onClose', () => {
    const mockOnClose = vi.fn();

    const { result } = renderHook<UseAlertSnackbarReturn, unknown>(() =>
      useAlertSnackbar({ autoHideDuration: 100 })
    );

    expect(result.current.autoHideDuration).toBe(100);
    expect(result.current.alerts.length).toBe(0);
    expect(result.current.isOpen).toBe(false);

    act(() =>
      result.current.addSnackbarAlert(
        {
          message: 'Test',
          severity: 'error',
        },
        { autoHideDuration: 1000, onClose: mockOnClose }
      )
    );

    expect(result.current.alerts.length).toBe(1);
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.handleCloseSnackbar());
    expect(result.current.alerts.length).toBe(0);
    expect(result.current.isOpen).toBe(false);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(result.current.autoHideDuration).toBe(1000);
  });

  test('adds alert with `disableAutoClose` option', () => {
    const { result } = renderHook<UseAlertSnackbarReturn, unknown>(() =>
      useAlertSnackbar()
    );

    act(() =>
      result.current.addSnackbarAlert(
        { message: 'message', severity: 'info' },
        { disableAutoClose: true }
      )
    );

    expect(result.current.disableAutoClose).toBe(true);
  });
});

describe('useAlertSnackbarContext', () => {
  test('renders correctly with children', () => {
    const { result } = renderHook<
      AlertSnackbarContextReturnValue,
      UseAlertSnackbarProps
    >(() => useAlertSnackbarContext());

    const { getByText } = render(
      <AlertSnackbarProvider {...result.current}>
        <div>children</div>
      </AlertSnackbarProvider>
    );

    expect(getByText('children')).toBeInTheDocument();
  });
});

describe('useCurrentAppContext', () => {
  test('handles default values when used outside provider', () => {
    const { result } = renderHook<
      AlertSnackbarContextReturnValue,
      UseAlertSnackbarProps
    >(() => useAlertSnackbarContext());

    expect(result.current.alerts.length).toBe(0);
    expect(result.current.isOpen).toBe(false);
    expect(result.current.autoHideDuration).toBe(undefined);
  });
});
