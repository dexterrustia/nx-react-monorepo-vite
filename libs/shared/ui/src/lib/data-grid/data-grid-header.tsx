import { IconButton, Menu, Typography, TypographyProps } from '@mui/material';
// eslint-disable-next-line no-restricted-imports
import {
  GridToolbarColumnsButton,
  GridToolbarContainer as MuiGridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { MoreVertRounded } from '@mui/icons-material';
import { useState } from 'react';
import styled from '@emotion/styled';

export type DataGridHeaderProps = {
  /** Title to be displayed to the left in next to toolbar */
  title: string;
  /** Disables toolbar */
  disableToolbar?: boolean;
  /** Custom controls placed to the right of the title */
  customControls?: JSX.Element;
  /** Adds a custom padding to the top of the data grid header */
  paddingTop?: number;
  /** Hides the filter button */
  disableFilter?: boolean;
  /** Disables padding on the title */
  disableTitlePadding?: boolean;
  /** custom csv export filename */
  csvFilename?: string;
};

const Wrapper = styled.div<{ paddingTop?: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme, paddingTop }) => `${theme.spacing(paddingTop || 6)} 0`};
`;

const Title = styled(
  ({
    disableTitlePadding,
    ...muiProps
  }: TypographyProps & Pick<DataGridHeaderProps, 'disableTitlePadding'>) => (
    <Typography variant="h5" {...muiProps} />
  )
)`
  padding-left: ${({ theme, disableTitlePadding }) =>
    theme.spacing(disableTitlePadding ? 0 : 2)};
`;

const GridToolbarContainer = styled(MuiGridToolbarContainer)`
  &&& {
    padding: 0;
    display: flex;
    align-items: center;
  }
`;

const TitleControlsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CustomControlsWrapper = styled.div`
  padding-left: ${({ theme }) => theme.spacing(6)};
`;

export const DataGridHeader = ({
  title,
  disableToolbar,
  customControls,
  paddingTop,
  disableFilter,
  disableTitlePadding,
  csvFilename,
}: DataGridHeaderProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const toolsOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Wrapper paddingTop={paddingTop}>
      <TitleControlsWrapper>
        <Title disableTitlePadding={disableTitlePadding}>{title}</Title>
        {customControls && (
          <CustomControlsWrapper>{customControls}</CustomControlsWrapper>
        )}
      </TitleControlsWrapper>
      {!disableToolbar && (
        <GridToolbarContainer aria-label="toolbar">
          {!disableFilter && <GridToolbarFilterButton aria-label="filter" />}
          <IconButton size="small" disableRipple onClick={handleClick}>
            <MoreVertRounded />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={toolsOpen}
            onClose={handleClose}
          >
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport
              csvOptions={{
                ...(csvFilename && { fileName: csvFilename }),
                delimiter: ',',
                utf8WithBom: true,
              }}
            />
          </Menu>
        </GridToolbarContainer>
      )}
    </Wrapper>
  );
};

export default DataGridHeader;
