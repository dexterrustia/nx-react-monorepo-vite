import { type MouseEvent, useState } from 'react';
import { Box, IconButton, Menu } from '@mui/material';
import MoreVertRounded from '@mui/icons-material/MoreVertRounded';

type LongMenuProps = {
  children: React.ReactNode[];
};

export const LongMenu = ({ children }: LongMenuProps) => {
  const [actionsAnchorEl, setActionsAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    setActionsAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setActionsAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVertRounded aria-label="kebab menu" />
      </IconButton>
      <Menu
        anchorEl={actionsAnchorEl}
        open={!!actionsAnchorEl}
        onClose={handleClose}
      >
        <Box
          display="flex"
          alignItems="center"
          paddingLeft={2}
          paddingRight={2}
        >
          {children}
        </Box>
      </Menu>
    </>
  );
};
