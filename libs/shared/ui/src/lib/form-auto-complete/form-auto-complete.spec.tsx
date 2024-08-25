import { fireEvent } from '@testing-library/react';
import {
  formProviderWrapper,
  renderWithDefaultProviders,
} from '@xpand/ui/_test';
import FormAutoComplete, { AutoCompleteOption } from './form-auto-complete';

const options: AutoCompleteOption[] = [
  {
    id: 'foo',
    label: 'foo',
  },
  {
    id: 'bar',
    label: 'bar',
  },
];

describe('FormAutoComplete', () => {
  test('renders with label', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <FormAutoComplete
        id="test1"
        name="test1"
        options={options}
        label="Test1"
        defaultValue={options[0]}
        fullWidth
        onFocus={() => {}}
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Input = getByLabelText('Test1');
    expect(Input).toBeInTheDocument();
  });

  test('renders with endadornment', () => {
    const { getByText } = renderWithDefaultProviders(
      <FormAutoComplete
        id="test1"
        name="test1"
        options={options}
        label="Test1"
        defaultValue={options[0]}
        fullWidth
        endAdornment={<span>Test</span>}
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const EndAdornment = getByText('Test');
    expect(EndAdornment).toBeInTheDocument();
  });

  test('renders with `freeSolo` options', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <FormAutoComplete
        id="test1"
        name="test1"
        options={['foo', 'bar']}
        label="Test1"
        fullWidth
        freeSolo
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Input = getByLabelText('Test1');

    fireEvent.change(Input, { target: { value: 'a' } });

    expect(Input).toHaveValue('a');
  });

  test('renders with tooltip', () => {
    const { getByTestId } = renderWithDefaultProviders(
      <FormAutoComplete
        id="test1"
        name="test1"
        options={['foo', 'bar']}
        label="Test1"
        fullWidth
        tooltip="Test"
      />,
      { innerWrappers: [formProviderWrapper()] }
    );

    const Tooltip = getByTestId('HelpIcon');
    expect(Tooltip).toBeInTheDocument();
  });
});
