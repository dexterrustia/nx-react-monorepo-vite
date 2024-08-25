import React from 'react';
import styled from '@emotion/styled';
import useFormFieldHelpers from '../hooks/use-form-field-helpers';
import {
  FormHelperText,
  FormLabel as MuiFormLabel,
  Switch,
  SwitchProps,
} from '@mui/material';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { FormControl } from '../form-control';

type FormSwitchProps = Omit<SwitchProps, 'defaultValue'> & {
  /** Input element name */
  name: string;
  /** Input element id and key */
  id: string;
  /** React-hook-form rules */
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
  /** Helper text to be displayed below field. Errors take precedence over this text */
  helperText?: string;
  /** Default value of field */
  defaultValue?: boolean;
  /** Boolean to toggle visibility */
  visible?: boolean;
  /** Form label */
  label?: string;
};

const FormLabel = styled(MuiFormLabel)`
  padding-left: ${({ theme }) => theme.spacing(3)};
`;

export const FormSwitch = ({
  id,
  name,
  rules,
  disabled,
  helperText,
  defaultValue = false,
  visible = true,
  label,
  ...props
}: FormSwitchProps): JSX.Element => {
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
        field: { ref, value, ...fieldRest },
        fieldState: { invalid, error },
      }) => (
        <FormControl
          key={id}
          disabled={isDisabled()}
          required={isRequired()}
          variant="outlined"
          visible={visible}
          error={invalid}
          data-testid={id}
        >
          {label && <FormLabel>{label}</FormLabel>}
          <Switch
            {...fieldRest}
            {...props}
            checked={value}
            disabled={isDisabled()}
          />

          <FormHelperText error={invalid}>
            {invalid ? error?.message : helperText}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormSwitch;
