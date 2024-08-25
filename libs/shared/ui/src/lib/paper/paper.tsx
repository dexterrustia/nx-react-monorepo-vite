import styled from '@emotion/styled';
import {
  Paper as MuiPaper,
  type PaperProps as MuiPaperProps,
} from '@mui/material';

type PaperProps = {
  /**
   * The border-radius of the paper.
   * @default 4
   */
  borderRadius?: number;
  padding?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
} & MuiPaperProps;

/**
 * A Paper wrapper component.
 * Should be used to wrap content.
 */
export const Paper = styled(
  ({
    borderRadius,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    ...muiProps
  }: PaperProps) => <MuiPaper {...muiProps} />
)`
  border-radius: ${({ theme, borderRadius }) =>
    theme.spacing(borderRadius ?? 4)};

  padding: ${({ theme, padding }) => padding && theme.spacing(padding)};
  padding-left: ${({ theme, paddingLeft }) =>
    paddingLeft && theme.spacing(paddingLeft)};
  padding-right: ${({ theme, paddingRight }) =>
    paddingRight && theme.spacing(paddingRight)};
  padding-top: ${({ theme, paddingTop }) =>
    paddingTop && theme.spacing(paddingTop)};
  padding-bottom: ${({ theme, paddingBottom }) =>
    paddingBottom && theme.spacing(paddingBottom)};

  overflow: hidden;
`;

export default Paper;
