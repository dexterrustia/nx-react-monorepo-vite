import {
  formProviderWrapper,
  renderWithDefaultProviders,
} from '@xpand/ui/_test';

import FormAddressFields from './form-address-fields';

describe('FormAddressFields', () => {
  test('renders correctly with required props', () => {
    const { getByLabelText, getByText } = renderWithDefaultProviders(
      <FormAddressFields
        address={{
          name: 'address',
          label: 'address',
        }}
        country={{
          name: 'country',
          label: 'country',
        }}
        postalCode={{
          name: 'postalCode',
          label: 'postalCode',
        }}
        city={{
          name: 'city',
          label: 'city',
        }}
        countryAlphaCode={{
          name: 'countryAlphaCode',
        }}
        countryOptions={[
          {
            countryPhonePrefix: '+1',
            value: 'US',
            alpha2Code: 'US',
            countryDisplayName: 'United States of America',
            countryWithPhonePrefix: 'United States of America (+1)',
          },
        ]}
        loadingCity={false}
        loadingCountryOptions={false}
        onPostalCodeChange={() => {}}
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Address = getByLabelText('address');
    const PostalCode = getByLabelText('postalCode');
    const City = getByLabelText('city');
    const Country = getByText('country');

    expect(Address).toBeInTheDocument();
    expect(Country).toBeInTheDocument();
    expect(PostalCode).toBeInTheDocument();
    expect(City).toBeInTheDocument();
  });

  //TODO: Test
  test('render with default values', () => {
    const { getByDisplayValue, getByText } = renderWithDefaultProviders(
      <FormAddressFields
        address={{
          name: 'address',
          label: 'address',
        }}
        country={{
          name: 'country',
          label: 'country',
        }}
        postalCode={{
          name: 'postalCode',
          label: 'postalCode',
        }}
        city={{
          name: 'city',
          label: 'city',
        }}
        countryAlphaCode={{
          name: 'countryAlphaCode',
        }}
        countryOptions={[
          {
            countryPhonePrefix: '+1',
            value: 'US',
            alpha2Code: 'US',
            countryDisplayName: 'United States of America',
            countryWithPhonePrefix: 'United States of America (+1)',
          },
        ]}
        loadingCity={false}
        loadingCountryOptions={false}
        onPostalCodeChange={() => {}}
      />,
      {
        innerWrappers: [
          formProviderWrapper({
            options: {
              defaultValues: {
                address: 'test address',
                country: 'US',
                postalCode: '2100',
                city: 'Test City',
              },
            },
          }),
        ],
      }
    );

    const Address = getByDisplayValue('test address');
    const PostalCode = getByDisplayValue('2100');
    const City = getByDisplayValue('Test City');
    const Country = getByText('United States of America');

    expect(Address).toBeInTheDocument();
    expect(PostalCode).toBeInTheDocument();
    expect(City).toBeInTheDocument();
    expect(Country).toBeInTheDocument();
  });
});
