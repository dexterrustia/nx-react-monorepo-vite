import { render } from '@testing-library/react';

import Employees from './employees';

describe('Employees', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Employees />);
    expect(baseElement).toBeTruthy();
  });
});
