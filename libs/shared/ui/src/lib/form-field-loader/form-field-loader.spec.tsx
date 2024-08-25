import { renderWithDefaultProviders } from '@xpand/ui/_test';
import { FormFieldLoader } from '.';

describe('FormFieldLoader', () => {
  test('should render loader when loading', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <FormFieldLoader loading />
    );

    const Loader = getByLabelText('form field loader');
    expect(Loader).toBeInTheDocument();
  });

  test('should render without loader when not loading', () => {
    const { queryByLabelText } = renderWithDefaultProviders(
      <FormFieldLoader />
    );

    const Loader = queryByLabelText('form field loader');
    expect(Loader).not.toBeInTheDocument();
  });

  test('should render with custom size', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <FormFieldLoader size={20} loading />
    );

    const Loader = getByLabelText('form field loader');
    expect(Loader).toBeInTheDocument();
  });
});
