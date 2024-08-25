import {
  FormHelperText,
  OutlinedTextFieldProps,
  TextField,
} from '@mui/material';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import useFormFieldHelpers from '../hooks/use-form-field-helpers';
import { FormControl } from '../form-control';

export type FormTextFieldProps = OutlinedTextFieldProps & {
  /** Input element name */
  name: string;
  /** Helper text to be displayed below field. Errors take precedence over this text */
  helperText?: string;
  /** Input element id and key */
  id: string;
  /** React-hook-form rules */
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
  /** Boolean to toggle visibility */
  visible?: boolean;
  /** Boolean to toggle is read only or editable */
  readOnly?: boolean;
  /** Max number of characters for field. OnChange is not fired if value goes above this number.  */
  maxLength?: number;
  /** Lowest possible number for type="number" fields */
  min?: number | string;
  /** Highest possible number for type="number" fields */
  max?: number | string;
  /** Flex value, needed to be applied to the outer FormControl */
  flex?: number;
  /** Boolean value if multiline or not*/
  multiline?: boolean | undefined;
  /** Number or rows if specified */
  rows?: number | string;
};

/**
 * @deprecated should be replaced by FormInput
 */
export const FormTextField = ({
  id,
  name,
  label,
  rules,
  disabled,
  helperText = '',
  defaultValue,
  visible = true,
  readOnly = false,
  maxLength,
  min,
  max,
  flex,
  multiline,
  rows,
  ...props
}: FormTextFieldProps): JSX.Element => {
  const { control } = useFormContext();
  const { isRequired, isDisabled } = useFormFieldHelpers({
    disabled,
    rules,
  });

  return (
    <Controller
      name={name}
      key={id}
      control={control}
      rules={rules}
      defaultValue={defaultValue || ''}
      render={({
        field: { ref, onChange, onBlur, ...fieldRest },
        fieldState: { invalid, error },
      }) => (
        <FormControl
          key={id}
          disabled={isDisabled()}
          required={isRequired()}
          variant="outlined"
          visible={visible}
          readOnly={readOnly}
          flex={flex}
        >
          <TextField
            label={`${label}${isRequired() ? ' *' : ''}`}
            {...fieldRest}
            {...props}
            onChange={(e) => {
              if (
                typeof maxLength !== 'undefined' &&
                e.target.value.length > maxLength
              )
                return;
              onChange(e);
            }}
            onBlur={(e) => {
              props.onBlur && props.onBlur(e);
              onBlur();
            }}
            key={id}
            id={id}
            inputRef={ref}
            error={invalid}
            disabled={isDisabled()}
            inputProps={{
              ...(readOnly && { readOnly }),
              ...(maxLength && { maxLength }),
              ...(min && { min }),
              ...(max && { max }),
            }}
            multiline={multiline || false}
            rows={rows}
          />
          <FormHelperText error={invalid}>
            {invalid ? error?.message : helperText}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormTextField;
