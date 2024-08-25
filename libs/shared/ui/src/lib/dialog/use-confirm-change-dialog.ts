import { Primitive } from '@xpand/utils/_types';
import { usePrevious } from '../hooks/use-previous';
import { useConfirmDialog } from './use-confirm-dialog';
import { useEffectSkipInitial } from '../hooks/use-effect-skipInitial';

type Id = {
  /** Unique identifier used to compare current and previous value */
  id: Primitive;
};

export type UseConfirmChangeDialogProps<TValue extends Id> = {
  /** Object containing the actual state values. When the `id` changes and value.id !== previousValue.id the dialog will open.  */
  value: TValue;
  /** Callback function triggered when the change is confirmed. This closes the dialog but wont trigger the dialog.onClose(). */
  onConfirm: (value: TValue) => void;
  /** Callback function triggered when the change is aborted. Takes the previous value as parameter. */
  onAbort: (prevValue: TValue | undefined) => void;
  /** The dialog.open() wont be triggered when this is true even if the id changes. */
  disableChangeDetection?: boolean;
};

export const useConfirmChangeDialog = <TValue extends Id>({
  value,
  onConfirm,
  onAbort,
  disableChangeDetection,
}: UseConfirmChangeDialogProps<TValue>) => {
  const previousValue = usePrevious(value);

  const confirmDialog = useConfirmDialog<TValue>({
    onConfirm: () => {
      onConfirm(value);
      return { skipOnClose: true };
    },
    onClose: ({ value }) => {
      onAbort(value || undefined);
    },
  });

  useEffectSkipInitial(() => {
    const open =
      previousValue?.id !== value?.id &&
      !confirmDialog.value &&
      !disableChangeDetection;

    if (!open) return;

    confirmDialog.open({ value: previousValue });
  }, [value, previousValue]);

  return {
    ...confirmDialog,
    value,
    previousValue: confirmDialog.value,
  };
};

export default useConfirmChangeDialog;
