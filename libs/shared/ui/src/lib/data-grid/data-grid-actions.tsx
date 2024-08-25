import GetAppRounded from '@mui/icons-material/GetAppRounded';
import {
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Tooltip,
  TooltipProps,
  Typography,
} from '@mui/material';
import { handleDownload } from '@xpand/utils/file';
import { FileExtensions } from '@xpand/utils/_types';
import useQueryOnClick, {
  UseQueryRequiredOptions,
} from '../hooks/use-query-on-click';
import { useTheme } from '@mui/material/styles';

type QueryExtend = {
  __typename?: 'Query' | undefined;
  downloadDocument?: string | null;
};

export type DataGridDownloadButtonProps = {
  queryOptions: UseQueryRequiredOptions;
  id: string;
  fileName: string;
  fileType: string | FileExtensions;
  tooltipProps?: Omit<TooltipProps, 'children'>;
  menuItem?: boolean;
  menuItemLabel?: string;
  disabled?: boolean;
  rowItem?: boolean;
  icon?: JSX.Element;
};

export const DataGridDownloadButton = <TQuery extends QueryExtend>({
  queryOptions,
  id,
  fileName,
  fileType,
  tooltipProps,
  menuItem,
  menuItemLabel,
  disabled,
  rowItem,
  icon,
}: DataGridDownloadButtonProps): JSX.Element => {
  const {
    isInitialLoading: downloadDocumentIsLoading,
    isRefetching: downloadDocumentIsRefetching,
    fetchOnClick: fetchDocumentDownload,
  } = useQueryOnClick<TQuery, { id: string }, { fileName: string }>(
    queryOptions,
    {
      onSuccess: async (data) => {
        if (data?.downloadDocument) {
          await handleDownload(
            fileName,
            data?.downloadDocument,
            fileType,
            fileType
          );
        }
      },
    }
  );

  const theme = useTheme();

  const handleClick = () => {
    fetchDocumentDownload({ id }, { fileName });
  };

  const isDisabled =
    downloadDocumentIsLoading || downloadDocumentIsRefetching || disabled;

  return (
    <Tooltip
      {...tooltipProps}
      title={tooltipProps?.title || ''}
      hidden={!tooltipProps}
    >
      <>
        {!rowItem && (
          <>
            {menuItem ? (
              <MenuItem onClick={handleClick} disabled={isDisabled}>
                <ListItemIcon>{icon ? icon : <GetAppRounded />}</ListItemIcon>
                {menuItemLabel && <ListItemText>{menuItemLabel}</ListItemText>}
              </MenuItem>
            ) : (
              <IconButton onClick={handleClick} disabled={isDisabled}>
                <GetAppRounded />
              </IconButton>
            )}
          </>
        )}
        {rowItem && (
          <>
            {icon ? icon : <></>}
            {isDisabled ? (
              <Typography variant="overline">{fileName}</Typography>
            ) : (
              <Link
                color={theme.palette.link.main}
                component="button"
                underline="always"
                onClick={handleClick}
              >
                <Typography variant="overline">{fileName}</Typography>
              </Link>
            )}
          </>
        )}
      </>
    </Tooltip>
  );
};

export default DataGridDownloadButton;
