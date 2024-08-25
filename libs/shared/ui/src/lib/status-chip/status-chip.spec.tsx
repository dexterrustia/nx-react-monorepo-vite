import { renderWithDefaultProviders } from '@xpand/ui/_test';

import StatusChip from './status-chip';

describe('StatusChip', () => {
  test('renders correctly', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <StatusChip status="success" fullWidth />
    );
    const Status = getByLabelText('status indicator');
    expect(Status).toBeInTheDocument();
  });
});
