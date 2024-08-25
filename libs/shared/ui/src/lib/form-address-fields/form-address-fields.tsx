import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormGroup, MenuItem } from '@mui/material';
import useEffectSkipInitial from '../hooks/use-effect-skipInitial';
import FormSelect from '../form-select';
import FormFieldLoader from '../form-field-loader';
import FormInput from '../form-input';
import styled from '@emotion/styled';

export type AddressFieldProps = {
  /** Input element name */
  name: string;
  /** Label text */
  label: string;
  /** Disables the field */
  disabled?: boolean;
};

export type FormAddressFieldCountryOption = {
  /** The actual value to use */
  countryPhonePrefix: string;
  /** Alpha code of the country opiton */
  alpha2Code?: string | null;
  /** Value to be displayed to the user */
  countryWithPhonePrefix?: string | null;
  /** Actual value of the option */
  value: string;
  /** Value to be displyed in the option */
  countryDisplayName?: string | null;
};

export type FormAddresFieldsProps = {
  /** List mapped in the country select. Also used for getting the country code */
  countryOptions: FormAddressFieldCountryOption[];
  /** Triggered ehn the postal code changes and is valid. This function should handle the fetching of a city/postal place */
  onPostalCodeChange: () => void;
  /** True when the options mapped in the country select is loading */
  loadingCountryOptions: boolean;
  /** True if a city name is being fetched by the users provided `postalCode` */
  loadingCity: boolean;
  /** Props for the field representing the address */
  address: AddressFieldProps;
  /** Props for the field representing the country */
  country: AddressFieldProps;
  /** Props for the field representing the postal code */
  postalCode: AddressFieldProps;
  /** Props for the field representing the postal place */
  city: AddressFieldProps;
  /** Props for holding the selected country alpha code. Not represenyed in an actual input, but is set in the background when country changes */
  countryAlphaCode: Pick<AddressFieldProps, 'name'>;
  /** Props for the address required parameter */
  requiredAddress?: boolean;
  /** Props for the postal code required parameter */
  requiredPostalCode?: boolean;
  /** Disables all fields */
  disableAll?: boolean;
};

const PostalWrapper = styled(FormGroup)`
  &&&& {
    flex-direction: row;
  }
`;

const PostalCode = styled(FormInput)`
  &&& {
    margin-right: ${({ theme }) => theme.spacing(1)};
  }
`;

export const FormAddressFields2 = ({
  countryOptions,
  onPostalCodeChange,
  loadingCountryOptions,
  loadingCity,
  address,
  country,
  postalCode,
  countryAlphaCode,
  city,
  requiredAddress,
  requiredPostalCode,
  disableAll,
}: FormAddresFieldsProps): JSX.Element => {
  const { t } = useTranslation();
  const { watch, setValue } = useFormContext();

  useEffectSkipInitial(() => {
    // Resetting postal fields when country changes
    setValue(countryAlphaCode.name, '');
    setValue(postalCode.name, '');
    setValue(city.name, '');
  }, [watch(country.name)]);

  useEffect(() => {
    // Finds the country code/alpa2Code based on the selected country
    const code =
      countryOptions.find(
        (option) =>
          option.value.toLowerCase() === watch(country.name)?.toLowerCase()
      )?.alpha2Code || 'NO';

    setValue(countryAlphaCode.name, code);
  }, [watch(country.name), watch(postalCode.name), countryOptions]);

  useEffect(() => {
    // Resetting the city name if no postal code is empty
    if (watch(postalCode.name)?.length === 0) {
      setValue(city.name, '');
    }

    // Checking if valid postal code length
    const isValidPostalCode = watch(postalCode.name)?.length > 3;
    if (!isValidPostalCode) return;

    const isNotNorway = watch(countryAlphaCode.name) !== 'NO';
    if (isNotNorway) return;

    // Calling the provided function that should to fetch the city name and set it in the form context
    onPostalCodeChange();
  }, [watch(postalCode.name)]);

  const isNorway = watch(countryAlphaCode.name) === 'NO';

  return (
    <FormGroup>
      <FormSelect
        id={country.name}
        name={country.name}
        label={country.label}
        disabled={disableAll || country?.disabled}
        readOnly={loadingCity}
        rules={{ required: t('common:validations.requiredField') }}
        endAdornment={<FormFieldLoader loading={loadingCountryOptions} />}
      >
        {countryOptions.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.countryDisplayName}
            </MenuItem>
          );
        })}
      </FormSelect>
      <FormInput
        id={address.name}
        name={address.name}
        label={address.label}
        disabled={disableAll || address?.disabled}
        rules={{
          ...(requiredAddress && {
            required: t('common:validations.requiredField'),
          }),
        }}
      />
      <PostalWrapper>
        <PostalCode
          id={postalCode.name}
          name={postalCode.name}
          label={postalCode.label}
          readOnly={loadingCity}
          disabled={disableAll || postalCode?.disabled}
          maxLength={isNorway ? 4 : 11}
          type="number"
          max="9999"
          min="0001"
          flex={1}
          rules={{
            minLength: {
              value: isNorway ? 4 : 1,
              message: t('common:validations.minLength', {
                length: isNorway ? 4 : 1,
              }),
            },
            maxLength: {
              value: isNorway ? 4 : 11,
              message: t('common:validations.maxLength', {
                length: isNorway ? 4 : 11,
              }),
            },
            ...(requiredPostalCode && {
              required: t('common:validations.requiredField'),
            }),
          }}
        />
        <FormInput
          id={city.name}
          name={city.name}
          label={city.label}
          flex={2}
          tabIndex={-1}
          inputProps={{
            tabIndex: -1,
          }}
          rules={{
            ...(requiredPostalCode && {
              required: t('common:validations.requiredField'),
            }),
          }}
          readOnly={isNorway}
          disabled={disableAll || city?.disabled || isNorway}
          endAdornment={<FormFieldLoader loading={loadingCity} />}
        />
      </PostalWrapper>
    </FormGroup>
  );
};

export default FormAddressFields2;
