import { useMemo } from 'react';
import styled from '@emotion/styled';
import { CircularProgress, Typography } from '@mui/material';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import useTranslation from 'next-translate/useTranslation';
import { dateToStringTime } from '@xpand/utils/date';
import { CancelRounded } from '@mui/icons-material';

export type SaveIndicatorProps = {
  /** Used to display when the last save was */
  lastSaved: Date;
  /** Shows loading animation when `true` */
  isSaving?: boolean;
  /** Displays an error icon and error text when `true` */
  isError?: boolean;
};

const Container = styled.div<{ isSaving?: boolean; isError?: boolean }>`
  display: flex;
  align-items: center;

  .MuiTypography-root {
    font-weight: bold;
    margin-right: ${({ theme }) => theme.spacing(1)};
    color: ${({ theme, isSaving }) =>
      isSaving ? theme.palette.info.main : theme.palette.success.main};

    color: ${({ theme, isError }) => isError && theme.palette.error['500']};
  }
`;

export const SaveIndicator = ({
  isSaving,
  lastSaved,
  isError,
}: SaveIndicatorProps): JSX.Element => {
  const { t } = useTranslation();

  const formattedTime: string = useMemo(() => {
    return dateToStringTime(lastSaved);
  }, [lastSaved]);

  return (
    <Container isSaving={isSaving} isError={isError && !isSaving}>
      {!isSaving && (
        <>
          {!isError && !isSaving && (
            <>
              <Typography>{`${t(
                'common:wizard.automaticallySaved'
              )}${formattedTime}`}</Typography>
              <CheckCircleRounded color="success" />
            </>
          )}
          {isError && !isSaving && (
            <>
              <Typography>{t('common:errors.generalSimple')}</Typography>
              <CancelRounded color="error" />
            </>
          )}
        </>
      )}
      {isSaving && (
        <>
          <Typography>{t('common:wizard.saving')}</Typography>
          <CircularProgress size={20} color="info" />
        </>
      )}
    </Container>
  );
};

export default SaveIndicator;
