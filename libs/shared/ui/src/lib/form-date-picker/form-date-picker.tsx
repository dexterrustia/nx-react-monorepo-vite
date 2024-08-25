import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
} from 'react-hook-form';
import { Box } from '@mui/material';

import { FormControl } from '../form-control';
import { DatePicker, DatePickerProps } from '../date-picker';

import { useFormDatepickerValidation } from './use-form-date-picker-validation';
import { useRef, useEffect } from 'react';

type PickerProps = DatePickerProps<Date | null>;

export type FormDatePickerProps<TName extends FieldValues> = {
  /** Form controller. */
  control: Control<TName>;
  /** Form field name. */
  name: Path<TName>;
  /** Form field label. */
  label: string;
  /** Makes the field full width (100%) */
  fullWidth?: boolean;
  /** Form field validation rules. */
  rules?: ControllerProps['rules'];
  /**
   * Mui Date picker props. Any props triggering validation errors will be forwaded to react-hook-form.
   * @see https://mui.com/x/react-date-pickers/date-picker/
   */
  datePickerProps?: PickerProps;
};

export const FormDatePicker = <TName extends FieldValues>({
  control,
  name,
  label,
  fullWidth,
  rules,
  datePickerProps,
}: FormDatePickerProps<TName>) => {
  const { errorDisplayMessage, onError } = useFormDatepickerValidation({
    maxDate: datePickerProps?.maxDate,
    minDate: datePickerProps?.minDate,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

  return (
    <Box width={fullWidth ? '100%' : 'auto'}>
      <Controller
        control={control}
        name={name}
        rules={{
          validate: {
            date: () => errorDisplayMessage ?? undefined,
            ...rules?.validate,
          },
          ...rules,
        }}
        render={({ field, fieldState }) => (
          <FormControl visible fullWidth={fullWidth}>
            <DatePicker
              label={label}
              value={field.value ?? null}
              // inputRef={field.ref}
              inputRef={inputRef}
              onChange={field.onChange}
              onError={onError}
              slotProps={{
                textField: {
                  label: `${label} ${!!rules?.required ? '*' : ''}`,
                  error: !!fieldState.error,
                  helperText: fieldState.error?.message,
                  ...datePickerProps?.slotProps?.textField,
                },
                ...datePickerProps?.slotProps,
              }}
              {...datePickerProps}
            />
          </FormControl>
        )}
      />
    </Box>
  );
};

export default FormDatePicker;
