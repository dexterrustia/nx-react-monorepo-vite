import styled from '@emotion/styled';
import { Box, FormHelperText, TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { FormControl } from '../form-control';
import { ReactNode } from 'react';
import useFormFieldHelpers from '../hooks/use-form-field-helpers';
import { FormToolTip, FormToolTipProps } from '../form-tool-tip';

/** The structure of each option populated in the autocomplete select list */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AutoCompleteOption<TObj = Record<string, any>> = {
  /** Unique id for option */
  id: string;
  /** Label which is displayed in the select-like dropdown list */
  label: string;
  /** The entire object if needed */
  obj?: TObj;
};

type FormAutoCompleteProps<TObj> = {
  /** Input element id and key */
  id: string;
  /** Input element name */
  name: string;
  /** Label displayed for the entire autocomplete field it self */
  label: string;
  /** Helper text to be displayed below field. Errors take precedence over this text */
  helperText?: string;
  /** Input element id and key */
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
  /** Boolean to toggle is read only or editable */
  readOnly?: boolean;
  /** Boolean to toggle visibility */
  visible?: boolean;
  /** Boolean to toggle if field should be disabled or not */
  disabled?: boolean;
  /** Array containing the options displayed in select. If `freeSolo` is `true` the options have to be of `string[]`.  */
  options: (AutoCompleteOption<TObj> | string)[] | [];
  /** Default value for field, usually used as part of useFieldArray */
  defaultValue?: Record<string, unknown>;
  /** Indicator for multiple inputs */
  multiple?: boolean;
  /** Sets to maximum width */
  fullWidth?: boolean;
  /** Function fired on focus */
  onFocus?: () => void;
  /** Function fired on blur */
  onBlur?: () => void;
  /** Component displayed to the right inside the field, usually a loading indicator*/
  endAdornment?: ReactNode;
  /** Automatically sets the focus on mount */
  autofocus?: boolean;
  /** Enables the user to input a random string. Remember to pass the `options` prop as `string[]` when this prop is passsed. */
  freeSolo?: boolean;
  /** When defined, renders a help icon and displayes the text on hover */
  tooltip?: FormToolTipProps['tooltip'];
  /** When defined the chip is read only */
  disableChip?: boolean;
};

const EndAdornmentWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(-50%, -50%);
`;

type GetTypeOptionParam<TObj> = AutoCompleteOption<TObj> | string;

export const FormAutoComplete = <TObj,>({
  id,
  name,
  rules,
  label,
  disabled,
  helperText,
  visible = true,
  defaultValue,
  readOnly,
  options,
  multiple = false,
  fullWidth = false,
  onFocus,
  onBlur,
  endAdornment,
  autofocus = false,
  freeSolo = false,
  tooltip,
  disableChip = false,
}: FormAutoCompleteProps<TObj>): JSX.Element => {
  const { control } = useFormContext();
  const { isRequired, isDisabled } = useFormFieldHelpers({
    disabled,
    rules,
  });

  /**
   * Compares input value and options depending on `freeSolo` props.
   * When `freeSolo` is true, the input value is compared as a string, else it is compared as an object based on the option id.
   */
  const isOptionEqualToValue = (
    option: GetTypeOptionParam<TObj>,
    value: GetTypeOptionParam<TObj>
  ) => {
    if (freeSolo && typeof option === 'string' && typeof value === 'string') {
      return option === value;
    }

    if (!freeSolo && typeof option === 'object' && typeof value === 'object') {
      return option.id === value.id;
    }

    return false;
  };

  return (
    <Controller
      name={name}
      key={id}
      control={control}
      rules={rules}
      defaultValue={defaultValue || (multiple ? [] : { id: '', label: '' })}
      render={({
        field: { onChange: fieldOnChange, ...fieldRest },
        fieldState: { invalid, error },
      }) => (
        <FormControl
          key={id}
          disabled={isDisabled()}
          required={isRequired()}
          variant="outlined"
          visible={visible}
          readOnly={readOnly}
          fullWidth={fullWidth}
        >
          <Autocomplete
            {...fieldRest}
            freeSolo={freeSolo}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ChipProps={!disableChip ? { onDelete: disableChip } : {}}
            defaultValue={multiple ? [] : { id: '', label: '' }}
            options={options}
            getOptionLabel={(option: AutoCompleteOption<TObj> | string) => {
              if (typeof option === 'string') {
                return option;
              }
              return option.label || '';
            }}
            style={{ width: 'auto' }}
            isOptionEqualToValue={(option, value) =>
              isOptionEqualToValue(option, value)
            }
            renderOption={(props, option) => {
              const isFreeSoloOption = typeof option === 'string';
              return (
                <Box
                  component="li"
                  {...props}
                  key={isFreeSoloOption ? option : option.id}
                >
                  {isFreeSoloOption ? option : option.label}
                </Box>
              );
            }}
            renderInput={(params) => (
              <div>
                <TextField
                  {...params}
                  required={isRequired()}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  disabled={isDisabled()}
                  label={label}
                  variant="outlined"
                  error={!!error}
                  autoFocus={autofocus}
                  onChange={(e) => {
                    if (freeSolo) fieldOnChange(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                    }
                  }}
                />
                {
                  <EndAdornmentWrapper>
                    {endAdornment && endAdornment}
                    {tooltip && !endAdornment && (
                      <FormToolTip tooltip={tooltip} mode="select" />
                    )}
                  </EndAdornmentWrapper>
                }
              </div>
            )}
            onChange={(_, data) => fieldOnChange(data)}
            multiple={multiple}
          />
          <FormHelperText error={invalid}>
            {invalid ? error?.message : helperText}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormAutoComplete;
