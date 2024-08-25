import SearchIcon from '@mui/icons-material/Search';
import { renderWithDefaultProviders } from '@xpand/ui/_test';

import NotificationIcon from './notification-icon';

describe('NotificationIcon', () => {
  test('renders correctly with props and alert', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <NotificationIcon
        icon={<SearchIcon aria-label="Icontest" />}
        hasNotification
      />
    );

    const Component = getByLabelText('Notification icon');
    const Alert = getByLabelText('Notification alert icon');
    const Icon = getByLabelText('Icontest');

    expect(Component).toBeInTheDocument();
    expect(Alert).toBeInTheDocument();
    expect(Icon).toBeInTheDocument();
  });

  test('renders without alert', () => {
    const { getByLabelText, queryByLabelText } = renderWithDefaultProviders(
      <NotificationIcon icon={<SearchIcon aria-label="Icontest" />} />
    );
    const Component = getByLabelText('Notification icon');
    const Icon = getByLabelText('Icontest');
    const Alert = queryByLabelText('Notification alert icon');

    expect(Component).toBeInTheDocument();
    expect(Icon).toBeInTheDocument();
    expect(Alert).toBe(null);
  });
});
