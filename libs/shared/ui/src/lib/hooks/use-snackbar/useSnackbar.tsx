import { useState } from 'react';

export type Alert = {
  severity: 'error' | 'success' | 'info' | 'warning';
  message: string;
};

export type Snackbar = {
  isOpen: boolean;
  alerts: Alert[];
};

export type UseSnackbarReturn = Snackbar & {
  addSnackbarAlert: (alert: Alert) => void;
  handleCloseSnackbar: () => void;
};

const DEFAULT_SNACKBAR: Snackbar = {
  isOpen: false,
  alerts: [],
};

/**
 * @deprecated should be replaced by context/snackbar
 */
export const useSnackbar = (): UseSnackbarReturn => {
  const [snackbar, setSnackbar] = useState<Snackbar>({
    isOpen: false,
    alerts: [],
  });

  const addSnackbarAlert = (alert: Alert) => {
    setSnackbar((prevSnackbar) => ({
      isOpen: true,
      alerts: [...prevSnackbar.alerts, alert],
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(DEFAULT_SNACKBAR);
  };

  return {
    ...snackbar,
    addSnackbarAlert,
    handleCloseSnackbar,
  };
};

export default useSnackbar;
