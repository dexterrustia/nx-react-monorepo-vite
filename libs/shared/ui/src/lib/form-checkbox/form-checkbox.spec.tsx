import { describe, test, expect, vi } from 'vitest';

import { fireEvent } from '@testing-library/react';
import {
  formProviderWrapper,
  renderWithDefaultProviders,
} from '@xpand/ui/_test';

import { FormCheckbox } from './form-checkbox';

describe('FormCheckbox', () => {
  test('renders with label', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <FormCheckbox id="test1" name="test1" label="Test 1" />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Input = getByLabelText('Test 1');
    expect(Input).toBeInTheDocument();
  });

  test('renders with helper text', () => {
    const { getByText } = renderWithDefaultProviders(
      <FormCheckbox
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

  test('renders without label', () => {
    const { queryByLabelText } = renderWithDefaultProviders(
      <FormCheckbox id="test1" name="test1" label="Test 1" disableLabel />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Input = queryByLabelText('Test 1');
    expect(Input).not.toBeInTheDocument();
  });

  test('correctly calls custom fn onChange', () => {
    const mockOnChange = vi.fn();
    const { getByLabelText } = renderWithDefaultProviders(
      <FormCheckbox
        id="test1"
        name="test1"
        label="Test 1"
        onChange={mockOnChange}
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const HelperText = getByLabelText('Test 1');
    expect(HelperText).toBeInTheDocument();

    fireEvent.click(getByLabelText('Test 1'));
    expect(mockOnChange).toHaveBeenCalled();
  });
});
