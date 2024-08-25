import { TextField } from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import { UseDataGridSearchReturn } from './use-data-grid-search';
import styled from '@emotion/styled';
import { memo } from 'react';

export type DataGridHeaderSearchProps = Pick<
  UseDataGridSearchReturn,
  'value' | 'handleSearchChange'
>;

// Workaround for not rendering the search field directly in the data grid header.
// A custom header component mounts while the field is typed in and causes weird flickering of mount animations.
const StyledTextField = styled(TextField)`
  margin-bottom: ${(props) => props.theme.spacing(-3)};
`;

const DataGridHeaderSearch = ({
  value,
  handleSearchChange,
}: DataGridHeaderSearchProps): JSX.Element => {
  return (
    <StyledTextField
      aria-label="Search field"
      value={value}
      className="search-field"
      type="text"
      variant="standard"
      onChange={handleSearchChange}
      autoFocus={value.length > 0}
      InputProps={{
        startAdornment: <SearchRounded aria-label="Search icon" />,
      }}
    />
  );
};

export default memo(DataGridHeaderSearch);
