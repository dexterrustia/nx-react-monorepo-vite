import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
} from 'react-hook-form';

import { FormControl } from '../form-control';
import { DateTimePicker, DateTimePickerProps } from '../date-time-picker';
import { useFormDateTimePickerValidation } from './use-form-date-time-picker-validation';

type PickerProps = DateTimePickerProps<Date | null>;

type FormDateTimePickerProps<TName extends FieldValues> = {
  /** Form controller. */
  control: Control<TName>;
  /** Form field name. */
  name: Path<TName>;
  /** Form field label. */
  label: string;
  /** Makes the field full width (100%) */
  fullwidth?: boolean;
  /** Form field validation rules. */
  rules?: ControllerProps['rules'];
  /**
   * Mui Date time picker props. Any props triggering validation errors will be forwaded to react-hook-form.
   * @see https://mui.com/x/react-date-pickers/date-time-picker/
   */
  dateTimePickerProps?: PickerProps;
};

export const FormDateTimePicker = <TName extends FieldValues>({
  control,
  name,
  label,
  fullwidth,
  rules,
  dateTimePickerProps,
}: FormDateTimePickerProps<TName>) => {
  const { errorDisplayMessage, onError } = useFormDateTimePickerValidation({
    maxDate: dateTimePickerProps?.maxDate,
    minDate: dateTimePickerProps?.minDate,
  });

  return (
    <div>
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
          <FormControl visible fullWidth={fullwidth}>
            <DateTimePicker
              label={label}
              value={field.value ?? null}
              inputRef={field.ref}
              onChange={field.onChange}
              onError={onError}
              slotProps={{
                textField: {
                  label: `${label} ${!!rules?.required ? '*' : ''}`,
                  error: !!fieldState.error,
                  helperText: fieldState.error?.message,
                  ...dateTimePickerProps?.slotProps?.textField,
                },
                ...dateTimePickerProps?.slotProps,
              }}
              {...dateTimePickerProps}
            />
          </FormControl>
        )}
      />
    </div>
  );
};

export default FormDateTimePicker;
