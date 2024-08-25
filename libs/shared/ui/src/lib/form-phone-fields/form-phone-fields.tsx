import { phonePatternRegex } from '@xpand/utils/regex';
import { Box, FormGroup, MenuItem, Typography } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useFormContext, useWatch } from 'react-hook-form';
import styled from '@emotion/styled';
import { FormInputProps, FormInput } from '../form-input';
import { FormSelect } from '../form-select';
import { FormFieldLoader } from '../form-field-loader';
import useEffectSkipInitial from '../hooks/use-effect-skipInitial';
import { phoneTypeOptions } from './form-phone-fields-utils';

export type PhoneFieldsProps = {
  /** Input element name */
  name: string;
  /** Label text */
  label: string;
  /** Default value used when part of field array */
  defaultValue?: string | number;
  /** Tell if number is not required*/
  isNotRequired?: boolean;
};

export type FormPhoneFieldCountryOption = {
  /** The actual value to use */
  countryPhonePrefix: string;
  /** Alpha code of the country opiton */
  alpha2Code?: string | null;
  /** Value to be displayed to the user */
  countryWithPhonePrefix?: string | null;
};

export type FormPhoneFieldProps = Omit<FormInputProps, 'id' | 'name'> & {
  /** Props for the field representing the phone type */
  phoneType: PhoneFieldsProps;
  /** Props for the field representing the country code */
  countryCode: PhoneFieldsProps;
  /** Props for the field representing the phone number */
  number: PhoneFieldsProps;
  /** Tells if the country code opitons are loading */
  isLoading: boolean;
  /** Country code options, usually fetched from the basic api */
  countryOptions?: FormPhoneFieldCountryOption[];
  /** Disables all input fields */
  disableAll?: boolean;
  /** When true, vertical aligns the prefix and number fields and hides the phone type field for a more compact layout. */
  compact?: boolean;
};

const PhonePrefix = styled(Typography)`
  && {
    margin-right: ${(props) => props.theme.spacing(1)};
    color: ${(props) => props.theme.palette.text.secondary};
  }
`;

export const FormPhoneFields = ({
  phoneType,
  countryCode,
  number,
  readOnly,
  isLoading,
  countryOptions,
  disableAll,
  compact,
}: FormPhoneFieldProps): JSX.Element => {
  const { t } = useTranslation();

  const { trigger, control } = useFormContext();

  const countryCodeWatch = useWatch({ control, name: countryCode.name });

  useEffectSkipInitial(() => {
    trigger(number.name);
  }, [countryCodeWatch]);

  const isNorwegianCountryCode = countryCodeWatch === '+47';
  const phoneNumberMaxLength = isNorwegianCountryCode ? 8 : 12;
  const phoneNumberMinLength = isNorwegianCountryCode ? 8 : 6;

  return (
    <FormGroup>
      {!compact && (
        <FormSelect
          id={phoneType.name}
          name={phoneType.name}
          label={phoneType.label}
          defaultValue={phoneType.defaultValue}
          rules={{ required: t('common:validations.requiredField') }}
          readOnly={!!readOnly}
          disabled={disableAll}
        >
          {phoneTypeOptions(t)?.map?.((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </FormSelect>
      )}
      <Box
        display="flex"
        flexDirection={compact ? 'row' : 'column'}
        gap={compact ? 1 : 0}
      >
        <FormSelect
          fullWidth
          aria-label="country code select"
          id={countryCode.name}
          name={countryCode.name}
          label={countryCode.label}
          defaultValue={countryCode.defaultValue}
          rules={{
            ...(!number.isNotRequired
              ? {
                  required: {
                    value: !number.isNotRequired,
                    message: t('common:validations.requiredField'),
                  },
                }
              : {}),
          }}
          readOnly={!!readOnly}
          disabled={isLoading || disableAll}
          endAdornment={<FormFieldLoader loading={isLoading} />}
        >
          {countryOptions?.map?.((option, index) => (
            <MenuItem key={index} value={option.countryPhonePrefix}>
              {option.countryWithPhonePrefix}
            </MenuItem>
          ))}
        </FormSelect>
        <FormInput
          fullWidth
          id={number.name}
          name={number.name}
          label={number.label}
          defaultValue={number.defaultValue}
          type="number"
          readOnly={!!readOnly}
          disabled={disableAll}
          rules={{
            pattern: {
              value: phonePatternRegex,
              message: t('common:validations.phonePattern'),
            },
            minLength: {
              value: phoneNumberMinLength,
              message: t('common:validations.minLength', {
                length: phoneNumberMinLength,
              }),
            },
            maxLength: {
              value: phoneNumberMaxLength,
              message: t('common:validations.maxLength', {
                length: phoneNumberMaxLength,
              }),
            },
            ...(!number.isNotRequired
              ? {
                  required: {
                    value: !number.isNotRequired,
                    message: t('common:validations.requiredField'),
                  },
                }
              : {}),
          }}
          startAdornment={
            !!countryCodeWatch && !compact ? (
              <PhonePrefix variant="body2">{countryCodeWatch}</PhonePrefix>
            ) : null
          }
        />
      </Box>
    </FormGroup>
  );
};

export default FormPhoneFields;
