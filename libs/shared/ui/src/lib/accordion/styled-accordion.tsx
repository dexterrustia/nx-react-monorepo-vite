import { Accordion } from '@mui/material';
import styled from '@emotion/styled';

export const StyledAccordion = styled(Accordion)`
  &&& {
    border: 1px solid #ddd;

    margin-bottom: ${({ theme }) => theme.spacing(2.5)};

    box-shadow: none;

    border-radius: ${({ theme }) => theme.spacing(1)};

    :before {
      display: none;
    }

    .MuiAccordionSummary-content {
      align-items: center;
    }

    .MuiAccordionSummary-root,
    .MuiAccordionDetails-root {
      padding-left: ${({ theme }) => theme.spacing(4)};

      padding-right: ${({ theme }) => theme.spacing(4)};
    }

    .MuiTypography-h6 {
      font-size: ${({ theme }) => theme.spacing(4)};
    }
  }
`;
