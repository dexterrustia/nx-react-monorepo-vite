import { Box } from '@mui/material';

type ShortMenuProps = {
  children: React.ReactNode[];
};

export const ShortMenu = ({ children }: ShortMenuProps) => {
  return (
    <Box display="flex" alignItems="center">
      {children}
    </Box>
  );
};
