import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export type FormProps = {
  fullWidth?: boolean;
  grid?: boolean;
  gridColumns?: number;
  columnGap?: number;
  rowGap?: number;
};

export const Form = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  max-width: none;
  ${({ theme }) => theme.breakpoints.up('tablet')} {
    max-width: ${({ theme, fullWidth }) =>
      fullWidth ? 'initial' : theme.spacing(85)};
    width: 100%;

    display: ${({ grid, fullWidth }) => grid && fullWidth && 'grid'};
    grid-template-columns: ${({ gridColumns }) =>
      `repeat(${gridColumns || 2}, 1fr)`};
    column-gap: ${({ theme, columnGap }) => theme.spacing(columnGap || 4)};
    row-gap: ${({ theme, rowGap }) => theme.spacing(rowGap || 0)};
  }
`;

export const FormHeading = styled(Typography)`
  &&& {
    margin-bottom: ${(props) => props.theme.spacing(8)};
  }
`;
FormHeading.defaultProps = {
  variant: 'h5',
};

export default Form;
