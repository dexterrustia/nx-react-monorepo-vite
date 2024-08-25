import { renderWithDefaultProviders } from '@xpand/ui/_test';

import FormToolTip from './form-tool-tip';

describe('FormToolTip', () => {
  test('render with title in input mode', () => {
    const TITLE = 'Sample title';

    const { getByTitle } = renderWithDefaultProviders(
      <FormToolTip tooltip={TITLE} mode="input" />
    );

    const Tooltip = getByTitle(TITLE);
    expect(Tooltip).toBeInTheDocument();
  });

  test('renders with title in select mode', () => {
    const TITLE = 'Sample title';

    const { getByTitle } = renderWithDefaultProviders(
      <FormToolTip tooltip={TITLE} mode="select" />
    );

    const Tooltip = getByTitle(TITLE);
    expect(Tooltip).toBeInTheDocument();
  });
});
