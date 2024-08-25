import { useTheme } from '@emotion/react';
import ArticleIcon from '@mui/icons-material/Article';

export const DataIcon = () => {
  const theme = useTheme();
  return <ArticleIcon style={{ color: theme.palette.success.main }} />;
};
