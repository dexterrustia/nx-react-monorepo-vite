import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithDefaultProviders } from '@xpand/ui/_test';

import IconMenu, { IconMenuItem } from './icon-menu';

describe('IconMenu', () => {
  test('renders with only required props', () => {
    const simpleItems: IconMenuItem[] = [
      {
        text: 'item1',
      },
    ];

    const { getByLabelText, getByText } = renderWithDefaultProviders(
      <IconMenu items={simpleItems} />
    );

    const MenuIconButton = getByLabelText('icon menu');
    expect(MenuIconButton).toBeInTheDocument();

    fireEvent.click(MenuIconButton);

    const Item = getByText('item1');
    expect(Item).toBeInTheDocument();
  });

  test('renders with items, fires function on click and closes menu', async () => {
    const mockOnclick = vi.fn();

    const onClickItems: IconMenuItem[] = [
      {
        text: 'item1',
        onClick: mockOnclick,
      },
    ];

    const { getByLabelText, getByText, queryByText } =
      renderWithDefaultProviders(<IconMenu items={onClickItems} />);

    const MenuIconButton = getByLabelText('icon menu');
    fireEvent.click(MenuIconButton);

    const Item = getByText('item1');
    fireEvent.click(Item);
    expect(mockOnclick).toHaveBeenCalled();

    await waitFor(() => {
      const ClosedItem = queryByText('item1');
      expect(ClosedItem).not.toBeInTheDocument();
    });
  });

  test('renders with item icons', () => {
    const iconItems: IconMenuItem[] = [
      {
        text: 'item1',
        icon: <div>icon</div>,
      },
    ];

    const { getByLabelText, getByText } = renderWithDefaultProviders(
      <IconMenu items={iconItems} />
    );

    const MenuIconButton = getByLabelText('icon menu');
    fireEvent.click(MenuIconButton);

    const Icon = getByText('icon');
    expect(Icon).toBeInTheDocument();
  });

  test('renders with disabled menu item', () => {
    const mockOnclick = vi.fn();

    const disabledItems: IconMenuItem[] = [
      {
        text: 'item1',
        disabled: true,
        onClick: mockOnclick,
      },
    ];

    const { getByLabelText, getByText } = renderWithDefaultProviders(
      <IconMenu items={disabledItems} />
    );

    const MenuIconButton = getByLabelText('icon menu');
    fireEvent.click(MenuIconButton);

    const Item = getByText('item1');
    fireEvent.click(Item);

    expect(mockOnclick).not.toHaveBeenCalled();
  });

  test('renders with another menu item', () => {
    const { getByLabelText } = renderWithDefaultProviders(
      <IconMenu variant="hamburger" items={[]} />
    );

    const MenuItem = getByLabelText('hamburger menu');
    expect(MenuItem).toBeInTheDocument();
  });

  test('renders with a custom component in the menu item', () => {
    const customComponentItems: IconMenuItem[] = [
      {
        text: 'item1',
        component: <div>custom component</div>,
      },
    ];

    const { getByText, getByLabelText } = renderWithDefaultProviders(
      <IconMenu items={customComponentItems} />
    );

    const MenuIconButton = getByLabelText('icon menu');
    fireEvent.click(MenuIconButton);

    const MenuItem = getByText('custom component');
    expect(MenuItem).toBeInTheDocument();
  });

  test('should close menu when truthy `closeDeps` deps are provided as props at rerender', async () => {
    const simpleItems: IconMenuItem[] = [
      {
        text: 'item1',
      },
    ];

    const { getByText, getByLabelText, queryByText, rerender } =
      renderWithDefaultProviders(
        <IconMenu closeDeps={[false]} items={simpleItems} />
      );

    const MenuIconButton = getByLabelText('icon menu');
    fireEvent.click(MenuIconButton);

    const MenuItem = getByText('item1');
    expect(MenuItem).toBeInTheDocument();

    rerender(<IconMenu closeDeps={[true]} items={simpleItems} />);
    await waitFor(() => {
      const RerenderedMenuItem = queryByText('item1');
      expect(RerenderedMenuItem).not.toBeInTheDocument();
    });
  });

  test('should not close menu on item click when `disableCloseOnClick` is `true`', async () => {
    const disableCloseItem: IconMenuItem[] = [
      {
        text: 'item1',
        disableCloseOnClick: true,
      },
    ];

    const { getByText, getByLabelText } = renderWithDefaultProviders(
      <IconMenu items={disableCloseItem} />
    );

    const MenuIconButton = getByLabelText('icon menu');
    fireEvent.click(MenuIconButton);

    const MenuItem = getByText('item1');
    fireEvent.click(MenuItem);

    await waitFor(() => {
      const NotClosedItem = getByText('item1');
      expect(NotClosedItem).toBeInTheDocument();
    });
  });

  test('should open menu when icon button is hovered when enableHover prop is true', async () => {
    const iconMenuItems: IconMenuItem[] = [
      {
        text: 'item1',
      },
      {
        text: 'item2',
      },
    ];

    const { getByText, getByLabelText } = renderWithDefaultProviders(
      <IconMenu enableHover items={iconMenuItems} />
    );

    const MenuIconButton = getByLabelText('icon menu');
    fireEvent.mouseOver(MenuIconButton);

    await waitFor(() => {
      const MenuItem = getByText('item1');
      expect(MenuItem).toBeInTheDocument();
    });
  });

  test('should close menu when icon button is hovered out when enableHover prop is true', async () => {
    const iconMenuItems: IconMenuItem[] = [
      {
        text: 'item1',
      },
      {
        text: 'item2',
      },
    ];

    const { getByText, getByLabelText, queryByText } =
      renderWithDefaultProviders(
        <IconMenu enableHover items={iconMenuItems} />
      );

    const MenuIconButton = getByLabelText('icon menu');
    fireEvent.mouseOver(MenuIconButton);

    await waitFor(() => {
      const MenuItem = getByText('item1');
      expect(MenuItem).toBeInTheDocument();
    });

    const MenuItem = getByText('item1');
    fireEvent.mouseLeave(MenuItem);

    await waitFor(() => {
      const ClosedMenuItem = queryByText('item1');
      expect(ClosedMenuItem).not.toBeInTheDocument();
    });
  });

  test('should close menu when icon button is blurred out when enableHover prop is true', async () => {
    const iconMenuItems: IconMenuItem[] = [
      {
        text: 'item1',
      },
      {
        text: 'item2',
      },
    ];

    const { getByText, getByLabelText, queryByText } =
      renderWithDefaultProviders(
        <IconMenu enableHover items={iconMenuItems} />
      );

    const MenuIconButton = getByLabelText('icon menu');
    fireEvent.mouseOver(MenuIconButton);

    await waitFor(() => {
      const MenuItem = getByText('item1');
      expect(MenuItem).toBeInTheDocument();
    });

    const MenuItem = getByText('item1');
    fireEvent.blur(MenuItem);

    await waitFor(() => {
      const ClosedMenuItem = queryByText('item1');
      expect(ClosedMenuItem).not.toBeInTheDocument();
    });
  });

  test('menu should not show when hovered if enableHover prop is false', async () => {
    const iconMenuItems: IconMenuItem[] = [
      {
        text: 'item1',
      },
      {
        text: 'item2',
      },
    ];

    const { getByLabelText, queryByText } = renderWithDefaultProviders(
      <IconMenu items={iconMenuItems} />
    );

    const MenuIconButton = getByLabelText('icon menu');
    fireEvent.mouseOver(MenuIconButton);

    await waitFor(() => {
      const MenuItem = queryByText('item1');
      expect(MenuItem).not.toBeInTheDocument();
    });
  });
});
