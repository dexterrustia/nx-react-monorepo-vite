import {
  DialogCallbackParams,
  useDialog,
  UseDialogProps,
  UseDialogReturn,
} from './use-dialog';

export type AcceptOptions<TValue> = {
  onAccept?: (params: DialogCallbackParams<TValue>) => void;
};

export type UseAcceptDialogProps<TValue> = UseDialogProps<TValue> &
  AcceptOptions<TValue>;

export type UseAcceptDialogReturn<TValue> = UseDialogReturn<TValue> & {
  accept: (options?: AcceptOptions<TValue>) => void;
};

export const useAcceptDialog = <TValue>({
  onAccept,
  ...dialogProps
}: UseAcceptDialogProps<TValue> = {}) => {
  const dialog = useDialog(dialogProps);

  const accept = (options?: AcceptOptions<TValue>) => {
    const { value } = dialog;

    onAccept?.({ value });
    options?.onAccept?.({ value });
    dialog.close();
  };

  return {
    ...dialog,
    accept,
  };
};
