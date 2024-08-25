import {
  formProviderWrapper,
  renderWithDefaultProviders,
} from '@xpand/ui/_test';

import FormRadioGroup from './form-radio-group';

describe('FormRadioGroup', () => {
  test('renders with group label and radio labels', () => {
    const { getByLabelText, getByText } = renderWithDefaultProviders(
      <FormRadioGroup
        id="test1"
        name="test1"
        label="Test 1"
        values={[
          {
            value: 'firstValue',
            label: 'firstLabel',
          },
          {
            value: 'secondValue',
            label: 'secondLabel',
          },
        ]}
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Input = getByText('Test 1');
    const First = getByLabelText('firstLabel');
    const Second = getByLabelText('secondLabel');
    expect(Input).toBeInTheDocument();
    expect(First).toBeInTheDocument();
    expect(Second).toBeInTheDocument();
  });

  test('renders with helper text', () => {
    const { getByText } = renderWithDefaultProviders(
      <FormRadioGroup
        id="test1"
        name="test1"
        label="Test 1"
        values={[
          {
            value: 'firstValue',
            label: 'firstLabel',
          },
          {
            value: 'secondValue',
            label: 'secondLabel',
          },
        ]}
        helperText="Helper text"
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const HelperText = getByText('Helper text');
    expect(HelperText).toBeInTheDocument();
  });

  test('renders with tooltip', () => {
    const { getByTestId } = renderWithDefaultProviders(
      <FormRadioGroup
        id="test1"
        name="test1"
        label="Test 1"
        values={[
          {
            value: 'firstValue',
            label: 'firstLabel',
          },
          {
            value: 'secondValue',
            label: 'secondLabel',
          },
        ]}
        tooltip="Tooltip text"
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Tooltip = getByTestId('HelpIcon');
    expect(Tooltip).toBeInTheDocument();
  });
});
