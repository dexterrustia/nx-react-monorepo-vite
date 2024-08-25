import { Button, Typography } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';

import Dialog, { DialogProps } from './dialogV2';
import { UseAcceptDialogV2Return } from './use-accept-dialogV2';

export type OmittedDialogProps<TValue> = Omit<DialogProps<TValue>, 'controls'>;

export type AcceptDialogV2Props<TValue> = OmittedDialogProps<TValue> &
  UseAcceptDialogV2Return<TValue>;

export const AcceptDialogV2 = <TValue,>({
  ...dialogProps
}: AcceptDialogV2Props<TValue>): JSX.Element => {
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

export default AcceptDialogV2;
