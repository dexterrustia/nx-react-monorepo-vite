import { ReactNode, useState, createContext, useContext } from 'react';

export const DEFAULT_ALERT_SNACKBAR_AUTO_HIDE_DURATION = 1500;

export type Alert = {
  severity: 'error' | 'success' | 'info' | 'warning';
  message: string;
};

export type Snackbar = {
  isOpen: boolean;
  alerts: Alert[];
  onClose?: () => void;
};

export type UseAlertSnackbarProps = {
  /** Overrides the default hide duraction, defaults to `1500` */
  autoHideDuration?: number;
};

export type AddSnackbarOptions = {
  /** Called when snackbar closes */
  onClose?: Snackbar['onClose'];
  /** Overrides the default hide duraction, defaults to `1500` */
  autoHideDuration?: number;
  /** Disabled auto closing of the snackbar, this is when user clicks in the ui and after the given duration */
  disableAutoClose?: boolean;
};

export type UseAlertSnackbarReturn = Omit<Snackbar, 'onClose'> &
  UseAlertSnackbarProps &
  Pick<AddSnackbarOptions, 'disableAutoClose'> & {
    /** Adds an alert in the ui */
    addSnackbarAlert: (alert: Alert, options?: AddSnackbarOptions) => void;
    /** Handles the closing of the snackbar */
    handleCloseSnackbar: () => void;
  };

export type AlertSnackbarContext = UseAlertSnackbarReturn;

export type AlertSnackbarContextReturnValue = AlertSnackbarContext;

export type AlertSnackbarProviderProps = AlertSnackbarContext & {
  children: ReactNode;
};

const AlertSnackbarContext = createContext<AlertSnackbarContext>({
  isOpen: false,
  alerts: [],
  addSnackbarAlert: () => {},
  handleCloseSnackbar: () => {},
});

const DEFAULT_SNACKBAR: Snackbar = {
  isOpen: false,
  alerts: [],
  onClose: () => {},
};

export const useAlertSnackbar = ({
  autoHideDuration = DEFAULT_ALERT_SNACKBAR_AUTO_HIDE_DURATION,
}: UseAlertSnackbarProps = {}): UseAlertSnackbarReturn => {
  const [autoHideDurationState, setAutoHideDurationState] =
    useState(autoHideDuration);
  const [disableAutoCloseState, setDisableAutoCloseState] = useState(false);
  const [snackbar, setSnackbar] = useState<Snackbar>({
    ...DEFAULT_SNACKBAR,
  });

  const addSnackbarAlert = (alert: Alert, options?: AddSnackbarOptions) => {
    if (options?.autoHideDuration) {
      setAutoHideDurationState(options.autoHideDuration);
    }
    if (options?.disableAutoClose) {
      setDisableAutoCloseState(options.disableAutoClose);
    }
    setSnackbar((prevSnackbar) => ({
      isOpen: true,
      alerts: [...prevSnackbar.alerts, alert],
      onClose: options?.onClose,
    }));
  };

  const handleCloseSnackbar = () => {
    if (snackbar?.onClose) snackbar.onClose();
    setSnackbar(DEFAULT_SNACKBAR);
  };

  const { onClose, ...snackbarReturn } = snackbar;
  return {
    ...snackbarReturn,
    addSnackbarAlert,
    handleCloseSnackbar,
    autoHideDuration: autoHideDurationState,
    disableAutoClose: disableAutoCloseState,
  };
};

export const AlertSnackbarProvider = ({
  children,
  ...snackbarProps
}: AlertSnackbarProviderProps): JSX.Element => {
  return (
    <AlertSnackbarContext.Provider value={snackbarProps}>
      {children}
    </AlertSnackbarContext.Provider>
  );
};

export const useAlertSnackbarContext = (): AlertSnackbarContextReturnValue =>
  useContext(AlertSnackbarContext);
