import React, { ChangeEvent } from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import styled from '@emotion/styled';
import {
  FormHelperText,
  Link,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import useFormFieldHelpers from '../hooks/use-form-field-helpers';
import { FormControl } from '../form-control';

type Display = 'input' | 'text';

type FormInputToggleProps = TextFieldProps & {
  /** Input element name */
  name: string;
  /** Input element id and key */
  id: string;
  /** Controls if text or input field is rendered */
  display: Display;
  /** React-hook-form rules */
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
  /** Display input as a Link */
  isLink?: boolean;
  /** Helper text to be displayed below field. Errors take precedence over this text */
  helperText?: string;
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
  /** Removes label even if `label` is provided */
  disableLabel?: boolean;
  /** Removes top padding in text view */
  disableTextPadding?: boolean;
  /** Function triggered on change */
  onChangeCallback?: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};

const TextDisplayWrapper = styled.div<{ disablePadding?: boolean }>`
  padding-top: ${({ theme, disablePadding }) =>
    !disablePadding && theme.spacing(3)};
`;

export const FormInputToggle = ({
  id,
  name,
  label,
  isLink,
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
  display,
  disableLabel,
  disableTextPadding,
  onChangeCallback = (
    e?: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e;
  },
  ...props
}: FormInputToggleProps): JSX.Element => {
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
          {isLink && (
            <a href={`${watch(name)}`} target="_blank" rel="noreferrer">
              <Link component="span" rel="noopener">
                {`${label}`}
              </Link>
            </a>
          )}

          {!isLink && (
            <Typography color="textSecondary">
              {label && !disableLabel
                ? `${label}: ${watch(name)}`
                : watch(name)}
            </Typography>
          )}
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
            field: { ref, onChange, onBlur, ...fieldRest },
            fieldState: { invalid, error },
          }) => (
            <FormControl
              aria-label="form input"
              key={id}
              disabled={isDisabled()}
              required={isRequired()}
              variant="outlined"
              visible={visible}
              readOnly={readOnly}
              flex={flex}
              tabIndex={tabIndex}
              fullWidth={!!props?.fullWidth}
            >
              <TextField
                {...fieldRest}
                {...props}
                onChange={(e) => {
                  // custom check on maxLength to be able to limit character for type="number" inputs
                  if (
                    typeof maxLength !== 'undefined' &&
                    e.target.value.length > maxLength
                  )
                    return;
                  onChange(e);
                  onChangeCallback(e);
                }}
                onBlur={(e) => {
                  props.onBlur && props.onBlur(e);
                  onBlur();
                }}
                autoComplete="off"
                label={label}
                key={id}
                id={id}
                inputRef={ref}
                error={invalid}
                disabled={isDisabled()}
                required={isRequired()}
                inputProps={{
                  ...(readOnly && { readOnly }),
                  ...(maxLength && { maxLength }),
                  ...(min && { min }),
                  ...(max && { max }),
                  ...(props.inputProps && props.inputProps),
                }}
              />
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

export default FormInputToggle;
