import { render } from '@testing-library/react';

import Globals from './globals';

describe('Globals', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Globals />);
    expect(baseElement).toBeTruthy();
  });
});
