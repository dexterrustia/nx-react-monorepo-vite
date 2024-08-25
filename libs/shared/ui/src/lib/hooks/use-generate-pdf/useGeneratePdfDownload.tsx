import { useMutation, UseMutationResult } from '@tanstack/react-query';
import {
  FileExtensions,
  GeneratePdfBody,
  MimeTypes,
} from '@xpand/utils/_types';
import { handleDownload } from '@xpand/utils/file';

export type UseGeneratePdfDownloadProps = {
  /** Base url to the pdf generator api */
  baseURL: string;
  /** Axios function from the axios context to make the request */
  poster: <T, T2 = T>(
    url: string,
    data?: T | undefined,
    customBaseUrl?: string | undefined
  ) => Promise<T2>;
  options?: {
    /** Disables the download of the pdf on success */
    disableInstantDownload?: boolean;
  };
};

export type GeneratePdfDownloadReturn = { buffer: string };

type PdfBody<TClientData> = Pick<
  GeneratePdfBody<TClientData>,
  // Only need these fields for the download
  | 'name'
  | 'template'
  | 'clientData'
  | 'locale'
  | 'application'
  | 'layoutStyleOptions'
>;

export type UseGeneratePdfDownloadReturn<TClientData> = UseMutationResult<
  GeneratePdfDownloadReturn,
  Error,
  PdfBody<TClientData>,
  unknown
>;

/**
 * Hook to generate a pdf and download it. This is useful for generating a pdf on the fly and not storing it in the document center.
 */
export const useGeneratePdfDownload = <TClientData,>({
  baseURL,
  poster,
  options,
}: UseGeneratePdfDownloadProps): UseGeneratePdfDownloadReturn<TClientData> => {
  const mutation = useMutation<
    GeneratePdfDownloadReturn,
    Error,
    PdfBody<TClientData>,
    unknown
  >(
    (pdfData: PdfBody<TClientData>) =>
      poster<PdfBody<TClientData>, GeneratePdfDownloadReturn>(
        '/api/generate-pdf-download',
        pdfData,
        baseURL
      ),
    {
      onSuccess: async ({ buffer }, { name }) => {
        if (options?.disableInstantDownload) return;
        await handleDownload(name, buffer, MimeTypes.PDF, FileExtensions.PDF);
      },
    }
  );

  return mutation;
};

export default useGeneratePdfDownload;
