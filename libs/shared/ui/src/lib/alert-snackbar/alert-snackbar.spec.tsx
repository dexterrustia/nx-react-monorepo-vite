import { vi } from 'vitest';

import { renderWithDefaultProviders } from '@xpand/ui/_test';
import { fireEvent } from '@testing-library/react';

import { useAlertSnackbarContext } from './alert-snackbar-ctx';
import AlertSnackbar from './alert-snackbar';

vi.mock('./alert-snackbar-ctx');
const mockUseGlobalDrawerContext = vi.mocked(useAlertSnackbarContext);

describe('AlertSnackbar', () => {
  test('renders snackbar alert when is open', () => {
    const mockAddSnackbarAlert = vi.fn();
    const mockHandleCloseSnackbar = vi.fn();

    mockUseGlobalDrawerContext.mockImplementationOnce(() => ({
      isOpen: true,
      alerts: [{ message: 'message', severity: 'warning' }],
      addSnackbarAlert: mockAddSnackbarAlert,
      handleCloseSnackbar: mockHandleCloseSnackbar,
    }));

    const { getByLabelText, getByText } = renderWithDefaultProviders(
      <AlertSnackbar />
    );

    const Snackbar = getByLabelText('alert-snackbar');
    const Message = getByText('message');
    expect(Snackbar).toBeInTheDocument();
    expect(Message).toBeInTheDocument();
  });

  test('not closing snackbar on lost focus when `disableAutoClose` is `true`', () => {
    const mockAddSnackbarAlert = vi.fn();
    const mockHandleCloseSnackbar = vi.fn();

    mockUseGlobalDrawerContext.mockImplementationOnce(() => ({
      isOpen: true,
      alerts: [{ message: 'message', severity: 'warning' }],
      addSnackbarAlert: mockAddSnackbarAlert,
      handleCloseSnackbar: mockHandleCloseSnackbar,
      disableAutoClose: true,
    }));

    const { getByLabelText } = renderWithDefaultProviders(<AlertSnackbar />);

    const Snackbar = getByLabelText('alert-snackbar');
    fireEvent.click(Snackbar);

    expect(mockHandleCloseSnackbar).not.toHaveBeenCalled();
  });
});
