import { vi } from 'vitest';
import { fireEvent } from '@testing-library/react';
import {
  formProviderWrapper,
  renderWithDefaultProviders,
} from '@xpand/ui/_test';

import FormInputToggle from './form-input-toggle';

vi.mock('react-hook-form', async () => {
  const original = (await vi.importActual(
    'react-hook-form'
  )) as typeof import('react-hook-form');
  return {
    ...original,
    useFormContext: () => {
      return {
        ...original.useFormContext(),
        watch: () => 'value',
      };
    },
  };
});

describe('FormInputToggle', () => {
  test('renders as input', () => {
    const { getByLabelText, queryByLabelText } = renderWithDefaultProviders(
      <FormInputToggle
        id="test"
        name="test"
        label="Test label"
        display="input"
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Text = queryByLabelText('text');
    expect(Text).toBe(null);

    const Input = getByLabelText('form input');
    expect(Input).toBeInTheDocument();
  });

  test('renders as text', () => {
    const { getByLabelText, queryByLabelText } = renderWithDefaultProviders(
      <FormInputToggle
        id="test"
        name="test"
        label="Test label"
        display="text"
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Input = queryByLabelText('form input');
    expect(Input).toBe(null);

    const Text = getByLabelText('text view');
    expect(Text).toBeInTheDocument();
  });

  test('calls onChange callback', () => {
    const mockOnChangeCallback = vi.fn();
    const { getByLabelText } = renderWithDefaultProviders(
      <FormInputToggle
        id="test"
        name="test"
        label="Test label"
        display="input"
        onChangeCallback={mockOnChangeCallback}
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Input = getByLabelText('Test label');
    expect(Input).toBeInTheDocument();

    fireEvent.change(Input, { target: { value: 'a' } });
    expect(mockOnChangeCallback).toHaveBeenCalled();
  });

  test('renders with helper text', () => {
    const mockOnChangeCallback = vi.fn();
    const { getByText } = renderWithDefaultProviders(
      <FormInputToggle
        id="test"
        name="test"
        label="Test label"
        helperText="Helper text"
        display="input"
        onChangeCallback={mockOnChangeCallback}
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const HelperText = getByText('Helper text');
    expect(HelperText).toBeInTheDocument();
  });

  test('does not add text to input field beyond max length', () => {
    const { getByLabelText, getByDisplayValue, queryByDisplayValue } =
      renderWithDefaultProviders(
        <FormInputToggle
          id="test1"
          name="test1"
          label="Test 1"
          maxLength={1}
          display="input"
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

  test('renders without label in text view', () => {
    const { queryByText, getByText } = renderWithDefaultProviders(
      <FormInputToggle
        id="value"
        name="value"
        label="Test 1"
        display="text"
        disableLabel
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const LabelledText = queryByText('Test 1: value');
    const UnLabelledText = getByText('value');

    expect(LabelledText).toBe(null);
    expect(UnLabelledText).toBeInTheDocument();
  });

  test('Renders as a link', () => {
    const { getByText } = renderWithDefaultProviders(
      <FormInputToggle
        id="value"
        name="value"
        label="Test 1"
        display="text"
        disableLabel
        isLink
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Label = getByText('Test 1');
    expect(Label).toBeInTheDocument();
  });
});
