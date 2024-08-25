import styled from '@emotion/styled';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import { useAlertSnackbarContext } from '../alert-snackbar';
import { PageHeader } from '../page-header';
import { Document, Page, pdfjs } from 'react-pdf';

// Needed in major 7 version of react-pdf
//import 'react-pdf/dist/Page/AnnotationLayer.css';
//import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

export type PdfViewProps = {
  /** Path used to redirect when `back` is clicked */
  redirect: string;
  /** Url to display the pdf */
  previewUrl: string;
  /** Name to display in the success snackbar */
  name: string;
};

const DocumentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PageWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

/** Component used to display a rendered PDF in the apps/APP/pdf/finalize.tsx pages */
export const PdfView = ({ redirect, previewUrl, name }: PdfViewProps) => {
  const { t } = useTranslation();
  const { addSnackbarAlert } = useAlertSnackbarContext();
  const [totalPagesCount, setTotalPagesCount] = useState<number>(0);

  useEffect(() => {
    addSnackbarAlert(
      {
        severity: 'success',
        message: t('common:messages.pdfFinalizeSuccessX', {
          item: name || t('common:theElement'),
        }),
      },
      { autoHideDuration: 6000 }
    );
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setTotalPagesCount(numPages);
  };

  return (
    <>
      <PageHeader
        title="PDF"
        showBackArrow
        backPath={redirect}
        disableBreadcrumbs
      />
      <DocumentWrapper>
        <Document file={previewUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <div>
            {Array.from(Array(totalPagesCount), (pageNum, index) => (
              <PageWrapper key={index}>
                <Page pageIndex={index} scale={1} />
              </PageWrapper>
            ))}
          </div>
        </Document>
      </DocumentWrapper>
    </>
  );
};

export default PdfView;
