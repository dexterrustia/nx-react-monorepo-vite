import { FormHelperText, InputLabel, Typography } from '@mui/material';
import Select, { SelectProps } from '@mui/material/Select';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import useFormFieldHelpers from '../hooks/use-form-field-helpers';
import { FormControl } from '../form-control';
import styled from '@emotion/styled';

type Display = 'text' | 'input';

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
  /** Controls if text or input field is rendered */
  display: Display;
  /** Removes label even if `label` is provided */
  disableLabel?: boolean;
  /** Removes top padding in text view */
  disableTextPadding?: boolean;
  /** The value displayed in `text` mode, defaults to the raw value (watch('name')) */
  displayValue?: string;
};

const TextDisplayWrapper = styled.div<{ disablePadding?: boolean }>`
  padding-top: ${({ theme, disablePadding }) =>
    !disablePadding && theme.spacing(3)};
`;

export const FormSelectToggle = ({
  id,
  name,
  rules,
  label,
  display,
  disabled,
  helperText,
  children,
  visible = true,
  defaultValue,
  disableLabel,
  disableTextPadding,
  displayValue,
  ...props
}: FormSelectProps): JSX.Element => {
  const { control, watch } = useFormContext();
  const { isRequired, isDisabled } = useFormFieldHelpers({
    disabled,
    rules,
  });

  return (
    <div>
      {display === 'text' && watch(name) && (
        <TextDisplayWrapper
          aria-label="text view"
          disablePadding={disableTextPadding}
        >
          <Typography color="textSecondary">
            {label && !disableLabel
              ? `${label}: ${displayValue ? displayValue : watch(name)}`
              : `${displayValue ? displayValue : watch(name)}`}
          </Typography>
        </TextDisplayWrapper>
      )}
      {display === 'input' && (
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
              fullWidth={props.fullWidth}
            >
              <InputLabel error={invalid} htmlFor={id}>
                {label}
              </InputLabel>
              <Select
                {...fieldRest}
                {...props}
                // settting the label width
                label={`${label}${isRequired() ? 'x' : ''}`}
                inputProps={{ id, name }}
                error={invalid}
                disabled={isDisabled()}
                autoWidth
              >
                {children}
              </Select>
              <FormHelperText error={invalid}>
                {invalid ? error?.message : helperText}
              </FormHelperText>
            </FormControl>
          )}
        />
      )}
    </div>
  );
};

export default FormSelectToggle;
