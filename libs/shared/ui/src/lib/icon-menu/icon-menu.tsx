import styled from '@emotion/styled';
import { ReactNode, useState, MouseEvent, useEffect } from 'react';
import { MoreVertRounded, MenuRounded } from '@mui/icons-material';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';

export type IconMenuItem = {
  /** Text to display inside the menu item */
  text: string;
  /** Icon to display in the menu item */
  icon?: ReactNode;
  /** Sets the menu item to disabled */
  disabled?: boolean;
  /** A custom component to be displayed in the menu item */
  component?: ReactNode;
  /** A custom menu item component */
  menuItemComponent?: ReactNode;
  /** Menu not closing when menu items it clicked if set to `true` */
  disableCloseOnClick?: boolean;
  /** Triggered on menu item click */
  onClick?: () => void;
  /** Hides item if true */
  hidden?: boolean;
};

export type IconMenuProps = {
  /** The items to be displayed inside the menu */
  items: IconMenuItem[];
  /** Menu icon button variant, defaults to kebab */
  variant?: 'kebab' | 'meatballs' | 'hamburger';
  /** If state of any of the deps are truthy, closing the menu */
  closeDeps?: unknown[];
  /** Enables hover function if true */
  enableHover?: boolean;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconMenu = ({
  variant = 'kebab',
  items,
  closeDeps,
  enableHover = false,
}: IconMenuProps): JSX.Element => {
  const [actionsAnchorEl, setActionsAnchorEl] = useState<null | HTMLElement>(
    null
  );

  useEffect(() => {
    if (!closeDeps) return;

    const hasTruthyValues = closeDeps.some((d) => d);
    if (hasTruthyValues) {
      setActionsAnchorEl(null);
    }
  }, closeDeps);

  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    setActionsAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setActionsAnchorEl(null);
  };

  const handleItem =
    (
      onClick: IconMenuItem['onClick'] = () => {},
      isDisabled?: boolean,
      disableClose?: boolean
    ) =>
    () => {
      if (isDisabled) return;
      if (!disableClose) handleClose();
      onClick();
    };

  const mainIconMap = {
    kebab: <MoreVertRounded aria-label="kebab menu" />,
    meatballs: <MoreVertRounded aria-label="meatballs menu" rotate={90} />,
    hamburger: <MenuRounded aria-label="hamburger menu" />,
  };

  return (
    <Container>
      <IconButton
        aria-label="icon menu"
        size="small"
        disableRipple
        onClick={handleOpen}
        {...(enableHover && { onMouseEnter: handleOpen })}
      >
        {mainIconMap[variant]}
      </IconButton>
      <Menu
        anchorEl={actionsAnchorEl}
        open={!!actionsAnchorEl}
        onClose={handleClose}
        MenuListProps={{
          ...(enableHover && {
            onMouseLeave: handleClose,
            onBlur: handleClose,
          }),
        }}
      >
        {items.map((item, index) => {
          if (item?.hidden) return;

          return item?.menuItemComponent ? (
            item.menuItemComponent
          ) : (
            <MenuItem
              key={index}
              onClick={handleItem(
                item.onClick,
                item.disabled,
                item.disableCloseOnClick
              )}
              disabled={item.disabled}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText>{item.text}</ListItemText>
              {item.component || <></>}
            </MenuItem>
          );
        })}
      </Menu>
    </Container>
  );
};

export default IconMenu;
