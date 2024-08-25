// eslint-disable-next-line no-restricted-imports
import {
  LocalizationProvider,
  DateTimePicker as MuiDateTimePicker,
  DateTimePickerProps as MuiDateTimePickerProps,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { useDatePickerLocale } from '../date-picker/use-date-picker-locale';

export const DATE_PICKER_DEFAULT_FORMAT = 'dd.MM.yyyy HH:mm';

export type DateTimePickerProps<TDate> = MuiDateTimePickerProps<TDate>;

export const DateTimePicker = <TDate,>(props: DateTimePickerProps<TDate>) => {
  const locale = useDatePickerLocale();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
      <MuiDateTimePicker
        format={DATE_PICKER_DEFAULT_FORMAT}
        ampm={false}
        {...props}
      />
    </LocalizationProvider>
  );
};
