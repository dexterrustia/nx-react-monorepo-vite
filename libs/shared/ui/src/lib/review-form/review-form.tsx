import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { Form } from '../form';

export const ReviewFormWrapper = styled(Form)`
  max-width: unset;
`;
ReviewFormWrapper.defaultProps = {
  fullWidth: true,
};

export const ReviewFormHeadingToolbar = styled(Box)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const ReviewSection = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => `${theme.spacing(8)} 0`};
`;

export const ReviewSectionHeading = styled(Typography)`
  && {
    margin-bottom: ${({ theme }) => theme.spacing(4)};
    border-bottom: ${({ theme }) => theme.mixins.header.borderBottom};
  }
`;
ReviewSectionHeading.defaultProps = {
  variant: 'h6',
};
