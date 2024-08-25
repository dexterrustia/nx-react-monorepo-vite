import { describe, test, expect, vi } from 'vitest';

import { ReactNode } from 'react';
import { fireEvent } from '@testing-library/react';
import { FormProvider, useForm, UseFormTrigger } from 'react-hook-form';
import {
  formProviderWrapper,
  renderWithDefaultProviders,
} from '@xpand/ui/_test';

import FormPhoneFields, {
  FormPhoneFieldCountryOption,
} from './form-phone-fields';

const options: FormPhoneFieldCountryOption[] = [
  {
    alpha2Code: 'NO',
    countryPhonePrefix: '+47',
    countryWithPhonePrefix: 'Norway (+47)',
  },
  {
    alpha2Code: 'SE',
    countryPhonePrefix: '+46',
    countryWithPhonePrefix: 'Sweden (+46)',
  },
];

const customFormProviderWrapper =
  (trigger: UseFormTrigger<{ countryCode: string }>) =>
  ({ children }: { children: ReactNode }): JSX.Element => {
    const methods = useForm({
      defaultValues: {
        countryCode: '+47',
      },
    });
    return (
      <FormProvider {...methods} trigger={trigger}>
        {children}
      </FormProvider>
    );
  };

describe('FormPhoneFields', () => {
  test('renders with label and default value', () => {
    const { getByText } = renderWithDefaultProviders(
      <FormPhoneFields
        phoneType={{
          name: 'phoneType',
          label: 'phoneType',
        }}
        countryCode={{
          name: 'countryCode',
          label: 'countryCode',
        }}
        number={{
          name: 'number',
          label: 'number',
        }}
        countryOptions={options}
        isLoading={false}
      />,
      {
        innerWrappers: [
          formProviderWrapper({
            options: {
              defaultValues: {
                countryCode: '+47',
              },
            },
          }),
        ],
      }
    );

    const Type = getByText('phoneType');
    const Code = getByText('countryCode');
    const Number = getByText('number');
    const Prefx = getByText('+47');

    expect(Type).toBeInTheDocument();
    expect(Code).toBeInTheDocument();
    expect(Number).toBeInTheDocument();
    expect(Prefx).toBeInTheDocument();
  });

  test('renders with country code options', () => {
    const { getByText, getByLabelText } = renderWithDefaultProviders(
      <FormPhoneFields
        phoneType={{
          name: 'phoneType',
          label: 'phoneType',
        }}
        countryCode={{
          name: 'countryCode',
          label: 'countryCode',
        }}
        number={{
          name: 'number',
          label: 'number',
        }}
        countryOptions={options}
        isLoading={false}
      />,
      {
        innerWrappers: [
          formProviderWrapper({
            options: {
              defaultValues: {
                countryCode: '+47',
              },
            },
          }),
        ],
      }
    );

    const Select = getByLabelText('country code select');
    fireEvent.click(Select);

    const Norway = getByText('Norway (+47)');
    expect(Norway).toBeInTheDocument();
  });

  test('triggers number validation on country code change', async () => {
    const mockTrigger = vi.fn();

    const { getByLabelText } = renderWithDefaultProviders(
      <FormPhoneFields
        data-testid="phoneFields"
        phoneType={{
          name: 'phoneType',
          label: 'phoneType',
        }}
        countryCode={{
          name: 'countryCode',
          label: 'countryCode',
        }}
        number={{
          name: 'number',
          label: 'number',
        }}
        countryOptions={options}
        isLoading={false}
      />,
      {
        innerWrappers: [customFormProviderWrapper(mockTrigger)],
      }
    );

    const Wrapper = getByLabelText('country code select');
    const Select = Wrapper.querySelector('input');

    if (!Select) {
      throw new Error('Select not found');
    }

    fireEvent.change(Select, { target: { value: '+46' } });

    expect(mockTrigger).toHaveBeenCalledTimes(1);
  });
});
