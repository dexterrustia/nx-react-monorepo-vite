import { useTheme } from '@emotion/react';
import ArticleIcon from '@mui/icons-material/Article';

export const DefaultIcon = () => {
  const theme = useTheme();
  return <ArticleIcon style={{ color: theme.palette.info[500] }} />;
};
