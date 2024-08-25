import {
  DialogCallbackParams,
  useDialogV2,
  UseDialogV2Props,
  UseDialogV2Return,
} from './use-dialogV2';

export type AcceptOptions<TValue> = {
  onAccept?: (params: DialogCallbackParams<TValue>) => void;
};

export type UseAcceptDialogV2Props<TValue> = UseDialogV2Props<TValue> &
  AcceptOptions<TValue>;

export type UseAcceptDialogV2Return<TValue> = UseDialogV2Return<TValue> & {
  accept: (options?: AcceptOptions<TValue>) => void;
};

export const useAcceptDialogV2 = <TValue>({
  onAccept,
  ...dialogProps
}: UseAcceptDialogV2Props<TValue> = {}) => {
  const dialog = useDialogV2(dialogProps);

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
