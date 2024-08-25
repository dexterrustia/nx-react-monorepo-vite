import { renderWithDefaultProviders } from '@xpand/ui/_test';

import SimpleLoader from './simple-loader';

describe('SimpleLoader', () => {
  test('renders correctly with default margin', () => {
    const { getByLabelText } = renderWithDefaultProviders(<SimpleLoader />);

    expect(getByLabelText('simple loader')).toBeInTheDocument();
  });

  test('renders correctly with margin', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <SimpleLoader margin="0" />
    );

    expect(getByLabelText('simple loader')).toBeInTheDocument();
  });

  test('renders correctly with flexWrapper', () => {
    const { getByLabelText, getByTestId } = renderWithDefaultProviders(
      <SimpleLoader flexWrapper />
    );

    expect(getByTestId('flex-wrapper')).toBeInTheDocument();
    expect(getByLabelText('simple loader')).toBeInTheDocument();
  });
});
