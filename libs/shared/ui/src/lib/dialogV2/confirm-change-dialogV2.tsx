import ConfirmDialog, { ConfirmDialogV2Props } from './confirm-dialogV2';

export type ConfirmChangeDialogProps<TValue> = ConfirmDialogV2Props<TValue>;

export const ConfirmChangeDialog = <TValue,>(
  props: ConfirmChangeDialogProps<TValue>
) => {
  return <ConfirmDialog {...props} />;
};

export default ConfirmChangeDialog;
