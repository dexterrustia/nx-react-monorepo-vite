import {
  DialogCallbackParams,
  useDialog,
  UseDialogProps,
  UseDialogReturn,
} from './use-dialog';

export type ConfirmOptions<TValue> = {
  onConfirm?: (
    params: DialogCallbackParams<TValue>
  ) => void | { skipOnClose?: boolean };
};

export type UseConfirmDialogProps<TValue> = UseDialogProps<TValue> &
  ConfirmOptions<TValue>;

export type UseConfirmDialogReturn<TValue> = UseDialogReturn<TValue> & {
  confirm: (options?: ConfirmOptions<TValue>) => void;
};

export const useConfirmDialog = <TValue>({
  onConfirm,
  ...dialogProps
}: UseConfirmDialogProps<TValue> = {}) => {
  const dialog = useDialog(dialogProps);

  const confirm = (options?: ConfirmOptions<TValue>) => {
    const { value } = dialog;

    let skipOnClose = false;

    const propsConfirm = onConfirm?.({ value });
    const paramConfirm = options?.onConfirm?.({ value });

    if (propsConfirm?.skipOnClose || paramConfirm?.skipOnClose) {
      skipOnClose = true;
    }

    dialog.close({ skipOnClose });
  };

  return {
    ...dialog,
    confirm,
  };
};
