import { Button, Typography } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';

import Dialog, { DialogProps } from './dialog';
import { UseAcceptDialogReturn } from './use-accept-dialog';

export type OmittedDialogProps<TValue> = Omit<DialogProps<TValue>, 'controls'>;

export type AcceptDialogProps<TValue> = OmittedDialogProps<TValue> &
  UseAcceptDialogReturn<TValue>;

export const AcceptDialog = <TValue,>({
  ...dialogProps
}: AcceptDialogProps<TValue>): JSX.Element => {
  const { t } = useTranslation();

  const { accept } = dialogProps;

  const handleAccept = () => {
    accept();
  };

  return (
    <Dialog
      {...dialogProps}
      controls={[
        <Button
          key="1"
          onClick={handleAccept}
          variant="contained"
          color="primary"
        >
          <Typography>{t('common:buttons.accept')}</Typography>
        </Button>,
      ]}
    />
  );
};

export default AcceptDialog;
