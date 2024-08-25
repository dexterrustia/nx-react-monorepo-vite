import {
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
  RadioGroupProps as MuiRadioGroupProps,
} from '@mui/material';
import React from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import useFormFieldHelpers from '../hooks/use-form-field-helpers';
import { FormControl } from '../form-control';
import { FormToolTip, FormToolTipProps } from '../form-tool-tip';

export type RadioValues = {
  /** Value of radio element */
  value: string;
  /** Text element for radio element */
  label: string;
  /** Disables the value */
  disabled?: boolean;
};

export type RadioGroupProps = MuiRadioGroupProps & {
  /** Input element name */
  name: string;
  /** Helper text to be displayed below field. Errors take precedence over this text */
  helperText?: string;
  /** Input element id and key */
  id: string;
  /** Label text */
  label?: string;
  /** Boolean to toggle if disabled or not */
  disabled?: boolean;
  /** Array of radio values */
  values: RadioValues[];
  /** React-hook-form rules */
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
  /** Boolean to toggle visibility */
  visible?: boolean;
  /** When defined, renders a help icon and displays the text on hover */
  tooltip?: FormToolTipProps['tooltip'];
};

export const FormRadioGroup = ({
  id,
  name,
  rules,
  label,
  disabled,
  helperText,
  children,
  values,
  visible = true,
  defaultValue,
  tooltip,
  ...props
}: RadioGroupProps): JSX.Element => {
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
      defaultValue={defaultValue}
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
        >
          {label && <FormLabel component="legend">{label}</FormLabel>}
          <MuiRadioGroup {...fieldRest} {...props} id={id}>
            {values.map((v) => (
              <FormControlLabel
                key={v.value}
                value={v.value}
                control={<Radio id={v.value} />}
                label={v.label}
                disabled={v.disabled}
              />
            ))}
            {!!tooltip && <FormToolTip tooltip={tooltip} mode="input" />}
          </MuiRadioGroup>
          <FormHelperText error={invalid}>
            {invalid ? error?.message : helperText}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormRadioGroup;
