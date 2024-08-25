import styled from '@emotion/styled';

/** Component that wont break on new page, `break-inside: avoid;` */
export const PdfPrintWrapper = styled.div`
  @media print {
    break-inside: avoid;
  }
`;

/** Component that always starts at the top of a page, `page-break-before: always;` */
export const PdfPageBreakWrapper = styled.div`
  @media print {
    page-break-before: always;
  }
`;
