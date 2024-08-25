import {
  formProviderWrapper,
  renderWithDefaultProviders,
} from '@xpand/ui/_test';

import FormSelect from './form-select';

describe('FormSelect', () => {
  test('renders with label', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <FormSelect id="test1" name="test1" label="Test 1" />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Input = getByLabelText('Test 1');
    expect(Input).toBeInTheDocument();
  });

  test('renders with error', () => {
    const { getByText } = renderWithDefaultProviders(
      <FormSelect
        id="test1"
        name="test1"
        label="Test 1"
        helperText="Helper text"
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const HelperText = getByText('Helper text');
    expect(HelperText).toBeInTheDocument();
  });

  test('render with tooltip', () => {
    const { queryByTestId } = renderWithDefaultProviders(
      <FormSelect
        id="test1"
        name="test1"
        label="Test 1"
        helperText="Helper text"
        tooltip="Sample tooltip"
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Tooltip = queryByTestId('HelpIcon');
    expect(Tooltip).toBeInTheDocument();
  });

  test('render without tooltip', () => {
    const { queryByLabelText } = renderWithDefaultProviders(
      <FormSelect id="test1" name="test1" label="Test 1" />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Tooltip = queryByLabelText('tool-tip');
    expect(Tooltip).toBe(null);
  });

  test('renders without tooltip when custom end adornament is provided', () => {
    const { queryByTestId } = renderWithDefaultProviders(
      <FormSelect
        id="test1"
        name="test1"
        label="Test 1"
        tooltip="Tooltip text"
        endAdornment={<div>Custom end adornment</div>}
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Tooltip = queryByTestId('HelpIcon');
    expect(Tooltip).not.toBeInTheDocument();
  });
});
