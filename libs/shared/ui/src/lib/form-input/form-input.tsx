import {
  FormHelperText,
  Input,
  InputLabel,
  InputProps,
  OutlinedInput,
  OutlinedInputProps,
} from '@mui/material';
import { ChangeEvent } from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import useFormFieldHelpers from '../hooks/use-form-field-helpers';

import FormToolTip, { FormToolTipProps } from '../form-tool-tip';
import { FormControl } from '../form-control';

export type FormInputProps = OutlinedInputProps & {
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
  /** When defined, renders a help icon and displayes the text on hover */
  tooltip?: FormToolTipProps['tooltip'];
  /** Function triggered on change */
  onChangeCallback?: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  variant?: 'primary' | 'secondary';
};

export const FormInput = ({
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
  tabIndex,
  tooltip,
  endAdornment,
  variant = 'primary',
  onChangeCallback = (
    e?: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e;
  },
  ...props
}: FormInputProps): JSX.Element => {
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
        field: { ref, onChange, onBlur, ...rhfFieldRestProps },
        fieldState: { invalid, error },
      }) => {
        /** The inline hardcoded props passed to the MUI input components */
        const inputProps: OutlinedInputProps | InputProps = {
          id: id,
          label: label,
          autoComplete: 'off',
          inputRef: ref,
          error: invalid,
          disabled: isDisabled(),
          onChange: (e) => {
            // custom check on maxLength to be able to limit character for type="number" inputs
            if (
              typeof maxLength !== 'undefined' &&
              e.target.value.length > maxLength
            )
              return;
            onChange(e);
            onChangeCallback(e);
          },
          onBlur: (e) => {
            props?.onBlur?.(e);
            onBlur();
          },
          inputProps: {
            ...(readOnly && { readOnly }),
            ...(maxLength && { maxLength }),
            ...(min && { min }),
            ...(max && { max }),
            ...(props.inputProps && props.inputProps),
          },
          endAdornment: (
            <>
              {endAdornment && endAdornment}
              {tooltip && !endAdornment && (
                <FormToolTip tooltip={tooltip} mode="input" />
              )}
            </>
          ),
        };

        return (
          <FormControl
            key={id}
            disabled={isDisabled()}
            required={isRequired()}
            variant="outlined"
            visible={visible}
            readOnly={readOnly}
            flex={flex}
            tabIndex={tabIndex}
            fullWidth={props.fullWidth}
          >
            {variant === 'primary' && (
              <>
                <InputLabel htmlFor={id} error={invalid} variant="outlined">
                  {label}
                </InputLabel>
                <OutlinedInput
                  key={id}
                  {...rhfFieldRestProps}
                  {...props}
                  {...inputProps}
                />
              </>
            )}
            {variant === 'secondary' && (
              <>
                <InputLabel htmlFor={id} error={invalid} variant="standard">
                  {label}
                </InputLabel>
                <Input
                  key={id}
                  {...rhfFieldRestProps}
                  {...props}
                  {...inputProps}
                />
              </>
            )}
            <FormHelperText error={invalid}>
              {invalid ? error?.message : helperText}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};

export default FormInput;
