import { Typography, TypographyProps } from '@mui/material';
import styled from '@emotion/styled';

const HeaderMainTitle = styled(Typography)`
  font-weight: 600;
`;

export const PdfHeaderMainTitle = (props: TypographyProps): JSX.Element => {
  return <HeaderMainTitle {...props} variant="h4" />;
};

const HeaderSubTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-weight: 500;
`;

export const PdfHeaderSubTitle = ({
  variant = 'h6',
  ...props
}: TypographyProps): JSX.Element => {
  return <HeaderSubTitle {...props} variant={variant} />;
};

const ParagraphMainTitle = styled(Typography)`
  font-weight: 600;
`;

export const PdfParagraphMainTitle = (props: TypographyProps): JSX.Element => {
  return <ParagraphMainTitle {...props} variant="h6" />;
};

const ParagraphSubTitle = styled(Typography)`
  font-weight: 800;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const PdfParagraphSubTitle = (props: TypographyProps): JSX.Element => {
  return <ParagraphSubTitle {...props} variant="body2" />;
};
