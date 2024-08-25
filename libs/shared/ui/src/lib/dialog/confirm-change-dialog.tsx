import ConfirmDialog, { ConfirmDialogProps } from './confirm-dialog';

export type ConfirmChangeDialogProps<TValue> = ConfirmDialogProps<TValue>;

export const ConfirmChangeDialog = <TValue,>(
  props: ConfirmChangeDialogProps<TValue>
) => {
  return <ConfirmDialog {...props} />;
};

export default ConfirmChangeDialog;
