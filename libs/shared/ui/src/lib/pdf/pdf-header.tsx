import styled from '@emotion/styled';

export const PdfDefaultHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(8)};
`;

export const PdfDefaultHeaderTextWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-gap: ${({ theme }) => theme.spacing(2)};
  max-width: ${({ theme }) => theme.spacing(180)};
`;
