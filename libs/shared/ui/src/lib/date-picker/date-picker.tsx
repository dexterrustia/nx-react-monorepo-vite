// eslint-disable-next-line no-restricted-imports
import {
  LocalizationProvider,
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { useDatePickerLocale } from './use-date-picker-locale';

export const DATE_PICKER_DEFAULT_FORMAT = 'dd.MM.yyyy';

export type DatePickerProps<TDate> = MuiDatePickerProps<TDate>;

export const DatePicker = <TDate,>(props: DatePickerProps<TDate>) => {
  const locale = useDatePickerLocale();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
      <MuiDatePicker format={DATE_PICKER_DEFAULT_FORMAT} {...props} />
    </LocalizationProvider>
  );
};
