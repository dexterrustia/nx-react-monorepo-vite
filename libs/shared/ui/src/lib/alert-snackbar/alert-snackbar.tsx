import { Alert, Snackbar, Typography } from '@mui/material';
import { SnackbarContent } from '../snackbar';

import { useAlertSnackbarContext } from './alert-snackbar-ctx';

/**
 * Common Alert Snackbar Component
 */
export const AlertSnackbar = (): JSX.Element => {
  const {
    isOpen,
    alerts,
    handleCloseSnackbar,
    autoHideDuration,
    disableAutoClose,
  } = useAlertSnackbarContext();

  return (
    <>
      <Snackbar
        aria-label="alert-snackbar"
        open={isOpen}
        autoHideDuration={autoHideDuration}
        onClose={!disableAutoClose ? handleCloseSnackbar : undefined}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <SnackbarContent>
          {alerts.length > 0 &&
            alerts.map((alert, index) => (
              <Alert
                aria-label="alert"
                key={index}
                onClose={handleCloseSnackbar}
                severity={alert.severity}
              >
                <Typography variant="body2">{alert.message}</Typography>
              </Alert>
            ))}
        </SnackbarContent>
      </Snackbar>
    </>
  );
};

export default AlertSnackbar;
