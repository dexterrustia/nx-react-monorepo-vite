import useTranslation from 'next-translate/useTranslation';
import { Typography } from '@mui/material';

import Button from '../button';

import Dialog, { DialogProps } from './dialog';
import { UseConfirmDialogReturn } from './use-confirm-dialog';

export type OmittedDialogProps<TValue> = Omit<
  DialogProps<TValue>,
  'controls' | 'hideCloseButton'
>;

export type ConfirmDialogProps<TValue> = OmittedDialogProps<TValue> &
  UseConfirmDialogReturn<TValue>;

export const ConfirmDialog = <TValue,>({
  ...dialogProps
}: ConfirmDialogProps<TValue>): JSX.Element => {
  const { t } = useTranslation();

  const { close, confirm } = dialogProps;

  const handleClose = () => {
    close();
  };

  const handleConfirm = () => {
    confirm();
  };

  return (
    <Dialog
      {...dialogProps}
      hideCloseButton
      controls={[
        <Button
          key="1"
          onClick={handleConfirm}
          variant="contained"
          color="primary"
        >
          <Typography variant="button">{t('common:buttons.yes')}</Typography>
        </Button>,
        <Button
          key="2"
          onClick={handleClose}
          variant="contained"
          color="secondary"
        >
          <Typography variant="button">{t('common:buttons.no')}</Typography>
        </Button>,
      ]}
    />
  );
};

export default ConfirmDialog;
