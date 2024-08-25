import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { FormControl } from '../form-control';
import useFormFieldHelpers from '../hooks/use-form-field-helpers';
import FormToolTip, { FormToolTipProps } from '../form-tool-tip';
import styled from '@emotion/styled';

const InputComponent = styled('div')`
  display: flex;
  justify-content: flex-start;
`;

type FormCheckboxProps = Omit<CheckboxProps, 'defaultValue'> & {
  /** Input element name */
  name: string;
  /** Input element id and key */
  id: string;
  /** Label text */
  label?: string;
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
  /** Disables the label */
  disableLabel?: boolean;
  /** When defined, renders a help icon and displayes the text on hover */
  tooltip?: FormToolTipProps['tooltip'];
};

export const FormCheckbox = ({
  id,
  name,
  rules,
  disabled,
  helperText,
  onChange,
  label = '',
  defaultValue = false,
  visible = true,
  disableLabel = false,
  tooltip,
  ...props
}: FormCheckboxProps): JSX.Element => {
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
        field: { ref, value, onChange: renderPropOnChange, ...fieldRest },
        fieldState: { invalid, error },
      }) => (
        <FormControl
          key={id}
          disabled={isDisabled()}
          required={isRequired()}
          variant="outlined"
          visible={visible}
          error={invalid}
        >
          {!disableLabel && (
            <>
              <InputComponent>
                <FormControlLabel
                  id={id}
                  label={label}
                  disabled={isDisabled()}
                  control={
                    <Checkbox
                      {...fieldRest}
                      {...props}
                      checked={value}
                      onChange={(e) => {
                        onChange?.(e, e.target.checked);
                        renderPropOnChange(e.target.checked);
                      }}
                      disabled={isDisabled()}
                    />
                  }
                />
                {tooltip && <FormToolTip tooltip={tooltip} mode="input" />}
              </InputComponent>
            </>
          )}
          {disableLabel && (
            <InputComponent>
              {tooltip && <FormToolTip tooltip={'tooltip'} mode="input" />}
              <Checkbox
                {...fieldRest}
                {...props}
                checked={value}
                onChange={(e) => {
                  onChange?.(e, e.target.checked);
                  renderPropOnChange(e.target.checked);
                }}
                disabled={isDisabled()}
              />
            </InputComponent>
          )}
          <FormHelperText error={invalid}>
            {invalid ? error?.message : helperText}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormCheckbox;
