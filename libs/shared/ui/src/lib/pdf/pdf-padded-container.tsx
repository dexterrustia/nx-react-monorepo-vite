import styled from '@emotion/styled';

/** Controls the size of the pdf
 *
 * Must be used with `layoutStyleOptions: { landscape: true } on useGeneratePdfDownload
 * @param landscape Default `false`. If `true`, sets the width of the page to a4 landscape mode (297mm). If `false`, width of the page to a4 portrait mode (210mm)
 *
 */
export const PdfPaddedContainer = styled.div<{ landscape?: boolean }>`
  width: ${({ landscape = false }) => (landscape ? '297mm' : '210mm')};
  padding-left: ${({ theme }) => theme.spacing(12)};
  padding-right: ${({ theme }) => theme.spacing(12)};
  padding-bottom: ${({ theme }) => theme.spacing(12)};

  .MuiTableContainer-root {
    overflow: hidden;
  }

  &&& th {
    font-weight: bold;
  }

  &&& td {
    word-break: break-word;
  }

  .MuiTableCell-root {
    padding: ${({ theme }) => theme.spacing(2)};
  }
`;
