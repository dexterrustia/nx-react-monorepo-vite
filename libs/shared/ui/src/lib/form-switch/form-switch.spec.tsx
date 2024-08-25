import {
  formProviderWrapper,
  renderWithDefaultProviders,
} from '@xpand/ui/_test';
import FormSwitch from './form-switch';

describe('FormSwitch', () => {
  test('renders with label', () => {
    const { getByTestId, getByText } = renderWithDefaultProviders(
      <FormSwitch label="label" id="test1" name="test1" />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Input = getByTestId('test1');
    const Label = getByText('label');

    expect(Input).toBeInTheDocument();
    expect(Label).toBeInTheDocument();
  });

  test('renders with helper text', () => {
    const { getByText } = renderWithDefaultProviders(
      <FormSwitch id="test1" name="test1" helperText="Helper text" />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const HelperText = getByText('Helper text');
    expect(HelperText).toBeInTheDocument();
  });
});
