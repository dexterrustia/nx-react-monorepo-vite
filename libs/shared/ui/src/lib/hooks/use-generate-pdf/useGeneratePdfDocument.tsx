import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { GeneratePdfBody } from '@xpand/utils/_types';

export type UseGeneratePdfDocumentProps = {
  /** Base url to the pdf generator api */
  baseURL: string;
  /** Axios function from the axios context to make the request */
  poster: <T, T2 = T>(
    url: string,
    data?: T | undefined,
    customBaseUrl?: string | undefined
  ) => Promise<T2>;
};

export type GeneratePdfDocumentReturn = {
  /** Document id of the generated pdf stored in the document center */
  documentId: string;
};

export type UseGeneratePdfDocumentReturn<TClientData> = UseMutationResult<
  GeneratePdfDocumentReturn,
  Error,
  GeneratePdfBody<TClientData>,
  unknown
> & { documentId?: string };

/**
 * Hook to generate a pdf document, store it in the document center and return the document id.
 */
export const useGeneratePdfDocument = <TClientData,>({
  baseURL,
  poster,
}: UseGeneratePdfDocumentProps): UseGeneratePdfDocumentReturn<TClientData> => {
  const mutation = useMutation<
    GeneratePdfDocumentReturn,
    Error,
    GeneratePdfBody<TClientData>,
    unknown
  >((pdfData: GeneratePdfBody<TClientData>) =>
    poster<GeneratePdfBody<TClientData>, GeneratePdfDocumentReturn>(
      '/api/generate-pdf-document',
      pdfData,
      baseURL
    )
  );

  return mutation;
};

export default useGeneratePdfDocument;
