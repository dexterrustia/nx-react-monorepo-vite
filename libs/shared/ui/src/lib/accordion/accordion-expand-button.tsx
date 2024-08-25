import styled from '@emotion/styled';

type FormAccordionExpandIconWrapperProps = {
  expanded?: boolean;
  disabled?: boolean;
};

export const FormAccordionExpandIconWrapper = styled.div<FormAccordionExpandIconWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ theme }) => theme.spacing(15)};
  height: ${({ theme }) => theme.spacing(15)};
  background-color: ${({ theme }) => theme.palette.grey[50]};
  margin-bottom: ${({ theme, expanded }) => (expanded ? theme.spacing(2) : 0)};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const FormAccordionExpandSpacer = styled.div`
  margin-right: ${({ theme }) => theme.spacing(4)};
`;
