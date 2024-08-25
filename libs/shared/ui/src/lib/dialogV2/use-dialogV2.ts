import { useState } from 'react';

export type DialogCallbackParams<TValue> = {
  value: TValue | null;
};

export type OpenDialogOptions<TValue> = {
  onOpen?: () => void;
  value?: TValue;
};

export type CloseDialogOptions<TValue> = {
  onClose?: (params: DialogCallbackParams<TValue>) => void;
  skipOnClose?: boolean;
};

export type DialogOptions<TValue> = OpenDialogOptions<TValue> &
  CloseDialogOptions<TValue>;

export type UseDialogV2Props<TValue> = DialogOptions<TValue> & {
  defaultOpen?: boolean;
  cleanup?: () => void;
};

export type UseDialogV2Return<TValue> = {
  isOpen: boolean;
  open: (options?: OpenDialogOptions<TValue>) => void;
  close: (options?: CloseDialogOptions<TValue>) => void;
  value: TValue | null;
};

export const useDialogV2 = <TValue>({
  defaultOpen,
  onOpen,
  onClose,
  cleanup,
}: UseDialogV2Props<TValue> = {}) => {
  const [isOpen, setIsOpen] = useState(!!defaultOpen);
  const [value, setValue] = useState<TValue | null>(null);

  const open = (options?: OpenDialogOptions<TValue>) => {
    const { value } = options || {};

    if (value) {
      setValue(value);
    }

    onOpen?.();
    options?.onOpen?.();

    setIsOpen(true);
  };

  const close = (options?: CloseDialogOptions<TValue>) => {
    if (!options?.skipOnClose) {
      onClose?.({ value });
      options?.onClose?.({ value });
    }

    setIsOpen(false);

    const timeout = setTimeout(() => {
      setValue(null);

      cleanup?.();
      clearTimeout(timeout);
    }, 200);
  };

  return {
    isOpen,
    open,
    close,
    value,
  };
};
