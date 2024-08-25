// eslint-disable-next-line no-restricted-imports
import { DateTimeValidationError } from '@mui/x-date-pickers';
import { useCallback, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { DateFormat, formatToDateString } from '@xpand/utils/date';

type UseFormDateTimePickerValidationProps = {
  maxDate?: Date | null;
  minDate?: Date | null;
};

export const useFormDateTimePickerValidation = ({
  maxDate,
  minDate,
}: UseFormDateTimePickerValidationProps) => {
  const { t } = useTranslation();

  const [dateError, setDateError] = useState<DateTimeValidationError | null>(
    null
  );

  const base = 'common:validations.date';

  const genericMessage = t(`${base}.invalidDate`);

  const errorDisplayMessageLookup = {
    disableFuture: t(`${base}.disableFuture`),
    disablePast: t(`${base}.disablePast`),
    maxDate: t(`${base}.maxDate`, {
      date: formatToDateString(maxDate, DateFormat.NORWEGIAN_DATE_STR_FORMAT),
    }),
    minDate: t(`${base}.minDate`, {
      date: formatToDateString(minDate, DateFormat.NORWEGIAN_DATE_STR_FORMAT),
    }),
    shouldDisableDate: t(`${base}.shouldDisableDate`),
    shouldDisableMonth: t(`${base}.shouldDisableMonth`),
    shouldDisableYear: t(`${base}.shouldDisableYear`),

    // Consider the need for custom error messages for the following
    minutesStep: genericMessage,
    minTime: genericMessage,
    maxTime: genericMessage,
    'shouldDisableClock-hours': genericMessage,
    'shouldDisableClock-minutes': genericMessage,
    'shouldDisableClock-seconds': genericMessage,
    'shouldDisableTime-hours': genericMessage,
    'shouldDisableTime-minutes': genericMessage,
    'shouldDisableTime-seconds': genericMessage,

    invalidDate: genericMessage,
  } as const;

  const onError = useCallback((error: DateTimeValidationError | null) => {
    setDateError(error);
  }, []);

  const errorDisplayMessage = dateError
    ? errorDisplayMessageLookup[dateError]
    : null;

  return {
    errorDisplayMessage,
    onError,
  };
};
