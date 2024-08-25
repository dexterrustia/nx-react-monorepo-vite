import { FormHelperText, InputLabel } from '@mui/material';
import Select, { SelectProps } from '@mui/material/Select';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import useFormFieldHelpers from '../hooks/use-form-field-helpers';
import { FormControl } from '../form-control';
import FormToolTip, { FormToolTipProps } from '../form-tool-tip';

type FormSelectProps = SelectProps & {
  /** Input element name */
  name: string;
  /** Helper text to be displayed below field. Errors take precedence over this text */
  helperText?: string;
  /** Input element id and key */
  id: string;
  /** Input element id and key */
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
  /** Boolean to toggle visibility */
  visible?: boolean;
  /** Flex value, needed to be applied to the outer FormControl */
  flex?: number;
  /** When defined, renders a helpt icon and displayes the text on hover */
  tooltip?: FormToolTipProps['tooltip'];
};

export const FormSelect = ({
  id,
  name,
  rules,
  label,
  disabled,
  helperText,
  children,
  visible = true,
  flex,
  tooltip,
  defaultValue,
  endAdornment,
  ...props
}: FormSelectProps): JSX.Element => {
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
        field: { ref, ...fieldRest },
        fieldState: { invalid, error },
      }) => (
        <FormControl
          key={id}
          disabled={isDisabled()}
          required={isRequired()}
          variant="outlined"
          visible={visible}
          flex={flex}
          fullWidth={props.fullWidth}
        >
          <InputLabel error={invalid} htmlFor={id}>
            {label}
          </InputLabel>
          <Select
            {...fieldRest}
            {...props}
            label={`${label}${isRequired() ? 'x' : ''}`}
            inputProps={{ id, name }}
            error={invalid}
            disabled={isDisabled()}
            autoWidth
            endAdornment={
              <>
                {endAdornment && endAdornment}
                {tooltip && !endAdornment && (
                  <FormToolTip tooltip={tooltip} mode="select" />
                )}
              </>
            }
          >
            {children}
          </Select>
          <FormHelperText error={invalid}>
            {invalid ? error?.message : helperText}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormSelect;
