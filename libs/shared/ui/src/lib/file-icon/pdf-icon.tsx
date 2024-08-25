import { useTheme } from '@emotion/react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export const PdfIcon = () => {
  const theme = useTheme();
  return <PictureAsPdfIcon style={{ color: theme.palette.error[500] }} />;
};
