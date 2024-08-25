import { useTheme } from '@emotion/react';
import MuiImageIcon from '@mui/icons-material/Image';

export const ImageIcon = () => {
  const theme = useTheme();
  return <MuiImageIcon style={{ color: theme.palette.primary[700] }} />;
};
