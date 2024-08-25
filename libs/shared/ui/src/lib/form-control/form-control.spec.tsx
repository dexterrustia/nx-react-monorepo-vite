import { renderWithDefaultProviders } from '@xpand/ui/_test';

import FormControl from './form-control';

describe('FormControl', () => {
  test('renders correctly', () => {
    const { getByText } = renderWithDefaultProviders(
      <FormControl>FormField</FormControl>
    );
    const FormField = getByText('FormField');
    expect(FormField).toBeInTheDocument();
    expect(FormField).toHaveAttribute('aria-hidden', 'false');
  });

  test('renders correctly in DOM without being visible', () => {
    const { queryByText } = renderWithDefaultProviders(
      <FormControl visible={false}>FormField</FormControl>
    );

    const FormField = queryByText('FormField');
    expect(FormField).toBeInTheDocument();
    expect(FormField).toHaveAttribute('aria-hidden', 'true');
  });
});
