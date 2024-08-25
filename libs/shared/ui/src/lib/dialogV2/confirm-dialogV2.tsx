import useTranslation from 'next-translate/useTranslation';
import { Typography } from '@mui/material';

import Button from '../button';

import Dialog, { DialogProps } from './dialogV2';
import { UseConfirmDialogV2Return } from './use-confirm-dialogV2';

export type OmittedDialogProps<TValue> = Omit<
  DialogProps<TValue>,
  'controls' | 'hideCloseButton'
>;

export type ConfirmDialogV2Props<TValue> = OmittedDialogProps<TValue> &
  UseConfirmDialogV2Return<TValue>;

export const ConfirmDialogV2 = <TValue,>({
  ...dialogProps
}: ConfirmDialogV2Props<TValue>): JSX.Element => {
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

export default ConfirmDialogV2;
