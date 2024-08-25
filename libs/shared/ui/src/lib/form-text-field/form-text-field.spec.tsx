import { fireEvent } from '@testing-library/react';
import {
  formProviderWrapper,
  renderWithDefaultProviders,
} from '@xpand/ui/_test';

import FormTextField from './form-text-field';

describe('FormTextField', () => {
  test('renders with label', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <FormTextField
        variant="outlined"
        id="test1"
        name="test1"
        label="Test 1"
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Input = getByLabelText('Test 1');
    expect(Input).toBeInTheDocument();
  });

  test('renders with helper text', () => {
    const { getByText } = renderWithDefaultProviders(
      <FormTextField
        variant="outlined"
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

  test('does not add text to input field beyond max length', () => {
    const { getByLabelText, getByDisplayValue, queryByDisplayValue } =
      renderWithDefaultProviders(
        <FormTextField
          variant="outlined"
          id="test1"
          name="test1"
          label="Test 1"
          maxLength={1}
        />,
        { innerWrappers: [formProviderWrapper()] }
      );

    const Input = getByLabelText('Test 1');
    expect(Input).toBeInTheDocument();

    fireEvent.change(Input, { target: { value: 'a' } });
    expect(getByDisplayValue('a')).toBeInTheDocument();

    fireEvent.change(Input, { target: { value: 'ab' } });
    expect(queryByDisplayValue('ab')).not.toBeInTheDocument();
    expect(getByDisplayValue('a')).toBeInTheDocument();
  });

  /*
  test('renders with tooltip', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <FormTextField
        variant="outlined"
        id="test1"
        name="test1"
        label="Test 1"
        helperText="Helper text"
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Tooltip = getByLabelText('tool-tip');
    expect(Tooltip).toBeInTheDocument();
  });
  */
});
