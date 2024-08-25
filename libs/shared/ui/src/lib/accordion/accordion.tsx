import styled from '@emotion/styled';
import {
  Accordion as MuiAccordion,
  AccordionProps as MuiAccordionProps,
} from '@mui/material';

type FormAccordionProps = MuiAccordionProps & {
  error?: boolean;
  hideError?: boolean;
};

export const FormAccordion = styled(
  ({ error, hideError, ...props }: FormAccordionProps) => (
    <MuiAccordion {...props} />
  )
)`
  padding: ${({ theme }) => theme.spacing(1)};

  &:before {
    display: none;
  }

  &&& .Mui-focusVisible {
    // Not optimal at all, but in this case it's the only way to set the background color
    background-color: transparent !important;
  }

  background-color: ${({ theme, expanded }) =>
    expanded && theme.palette.grey[50]};

  .MuiAccordionSummary-root {
    padding: 0;
    padding-right: ${({ theme }) => theme.spacing(2)};
    height: fit-content;
    background-color: transparent;

    border: ${({ error, theme, hideError }) =>
      error
        ? `solid ${!hideError ? theme.palette.error.main : 'transparent'} 2px`
        : 'none'};

    .Mui-expanded {
      margin: 0;
    }
  }

  .MuiAccordionSummary-content {
    margin: 0;
  }

  .MuiAccordionDetails-root {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: auto;

    padding: ${({ theme }) => theme.spacing(1)};
    padding-top: 0;
  }

  &&& .Mui-focusVisible {
    background-color: ${({ theme }) => theme.palette.common.white};
  }
`;

export default FormAccordion;
