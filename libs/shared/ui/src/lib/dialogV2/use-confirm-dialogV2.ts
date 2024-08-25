import {
  DialogCallbackParams,
  useDialogV2,
  UseDialogV2Props,
  UseDialogV2Return,
} from './use-dialogV2';

export type ConfirmOptions<TValue> = {
  onConfirm?: (
    params: DialogCallbackParams<TValue>
  ) => void | { skipOnClose?: boolean };
};

export type UseConfirmDialogV2Props<TValue> = UseDialogV2Props<TValue> &
  ConfirmOptions<TValue>;

export type UseConfirmDialogV2Return<TValue> = UseDialogV2Return<TValue> & {
  confirm: (options?: ConfirmOptions<TValue>) => void;
};

export const useConfirmDialogV2 = <TValue>({
  onConfirm,
  ...dialogProps
}: UseConfirmDialogV2Props<TValue> = {}) => {
  const dialog = useDialogV2(dialogProps);

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
