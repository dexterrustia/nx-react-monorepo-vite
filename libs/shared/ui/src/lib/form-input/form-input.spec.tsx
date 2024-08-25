import { describe, test, expect, vi } from 'vitest';

import { fireEvent } from '@testing-library/react';

import {
  formProviderWrapper,
  renderWithDefaultProviders,
} from '@xpand/ui/_test';

import FormInput from './form-input';

describe('FormInput', () => {
  test('renders with label', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <FormInput id="test" name="test" label="Test" />,
      {
        innerWrappers: [formProviderWrapper()],
      }
    );

    const Input = getByLabelText('Test');
    expect(Input).toBeInTheDocument();
  });

  test('renders with default value provided from context', () => {
    const { getByDisplayValue } = renderWithDefaultProviders(
      <FormInput id="test" name="test" label="Test" />,
      {
        innerWrappers: [
          formProviderWrapper({
            options: {
              defaultValues: {
                test: 'Default value',
              },
            },
          }),
        ],
      }
    );

    const DefaultValue = getByDisplayValue('Default value');
    expect(DefaultValue).toBeInTheDocument();
  });

  test('renders with helper text', () => {
    const { getByText } = renderWithDefaultProviders(
      <FormInput
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
        <FormInput id="test1" name="test1" label="Test 1" maxLength={1} />,
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

  test('calls onChange callback', () => {
    const mockOnChangeCallback = vi.fn();
    const { getByLabelText } = renderWithDefaultProviders(
      <FormInput
        id="test1"
        name="test1"
        label="Test 1"
        onChangeCallback={mockOnChangeCallback}
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Input = getByLabelText('Test 1');
    expect(Input).toBeInTheDocument();

    fireEvent.change(Input, { target: { value: 'a' } });
    expect(mockOnChangeCallback).toHaveBeenCalled();
  });

  test('renders with tooltip', () => {
    const { getByTestId } = renderWithDefaultProviders(
      <FormInput
        id="test1"
        name="test1"
        label="Test 1"
        tooltip="Tooltip text"
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Tooltip = getByTestId('HelpIcon');
    expect(Tooltip).toBeInTheDocument();
  });

  test('renders without tooltip when custom end adornment is provided', () => {
    const { queryByTestId } = renderWithDefaultProviders(
      <FormInput
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

  test('renders with end adornment', () => {
    const { getByText } = renderWithDefaultProviders(
      <FormInput
        id="test1"
        name="test1"
        label="Test 1"
        endAdornment={<div>Custom end adornment</div>}
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const EndAdornment = getByText('Custom end adornment');
    expect(EndAdornment).toBeInTheDocument();
  });

  test('renders with `primary` variant', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <FormInput id="test1" name="test1" label="Test 1" variant="primary" />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Input = getByLabelText('Test 1');
    // The outlined input from MUI is should be rendered when variant is `primary`
    expect(Input.className).toContain('MuiOutlinedInput-input');
  });

  test('renders with `secondary` variant', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <FormInput id="test1" name="test1" label="Test 1" variant="secondary" />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Input = getByLabelText('Test 1');
    // The standard input from MUI is should be rendered when variant is `secondary`
    expect(Input.className).toContain('MuiInput-input');
  });
});
