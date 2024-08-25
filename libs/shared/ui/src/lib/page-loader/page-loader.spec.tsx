import { renderWithDefaultProviders } from '@xpand/ui/_test';
import React from 'react';

import { PageLoader } from './index';

describe('PageLoader', () => {
  test('renders linear progress', () => {
    const { getByLabelText } = renderWithDefaultProviders(<PageLoader />);

    const Backdrop = getByLabelText('Waiting for page to load');
    const LinearProgress = getByLabelText('Linear loading bar');

    expect(Backdrop).toBeInTheDocument();
    expect(LinearProgress).toBeInTheDocument();
  });

  test('renders without linear progress', () => {
    const { queryByLabelText } = renderWithDefaultProviders(
      <PageLoader disableLinearProgress />
    );

    const LinearProgress = queryByLabelText('Linear loading bar');

    expect(LinearProgress).not.toBeInTheDocument();
  });
});
