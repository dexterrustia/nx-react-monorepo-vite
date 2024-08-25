import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  Typography,
} from '@mui/material';
import {
  AddAPhotoRounded,
  CachedRounded,
  GetAppRounded,
} from '@mui/icons-material';
import useTranslation from 'next-translate/useTranslation';
import { ChangeEvent, useEffect, useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import styled from '@emotion/styled';
import ClearIcon from '@mui/icons-material/Clear';
import { FormFieldLoader } from '../form-field-loader';
import { safeParseFileName } from '@xpand/utils/file';
import Button from '../button';

const OuterWrapper = styled(Button)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    border: ${({ theme }) => theme.spacing(0.5)} dashed
      ${({ theme }) => theme.palette.info[200]};
    border-radius: ${({ theme }) => theme.spacing(1)};
    height: ${({ theme }) => theme.spacing(45)};
    background-color: transparent;

    /** Disable prop - image */
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  }
`;

const Span = styled(Typography)`
  display: block;
  margin-top: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.palette.info.main};
`;

const InnerWrapper = styled(FormControl)`
  align-items: center;
  justify-content: center;
`;

const Filename = styled(Typography)`
  && {
    margin-left: ${(props) => props.theme.spacing(2)};
    width: fit-content;
    margin-top: auto;
    margin-bottom: auto;
  }
`;

const ListImages = styled('div')`
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-left: 0;
  padding: ${({ theme }) => theme.spacing(2.5)};
  background-color: ${({ theme }) => theme.palette.info[50]};
  display: flex;
  overflow-wrap: anywhere;
`;

export type FormFileUploadProps = {
  /** Comma separated string with file types accepted, e.g. `.jpg, .jpeg, .png` */
  accept?: string;
  /** Input element name */
  name: string;
  /** Callback function called when file is selected, usually used to store image in blobstore */
  upload: (file: File | null) => void;
  /** Initial file if already present */
  file?: File | null;
  /** React-hook-form rules */
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
  /** Text to be displayed if no file is selected */
  noFileText?: string;
  // Text for upload Button
  btnUploadName?: string;
  /** Tells if the file is loading */
  loading?: boolean;
  /** Tells if the upload failed */
  error?: boolean;
  /** Choose to display as Capture or Upload  */
  variation: 'camera' | 'file';
  /** Disable fields */
  disabled?: boolean;
  /** Shows clear button */
  showClearButton?: boolean;
  /** Handler for clear button -- if none, hide close button */
  onClear?: () => void;
  /** If device used is mobile or tablet, display camera icon instead of getApp icon  */
  isMobile?: boolean;
};

/**
 * @deprecated We got too many ways to handle file uploads. Refactor all instances of file/mage upload into a more simple and unified way.
 * See: https://lyonfuture.atlassian.net/browse/XP-3549.
 */
export const FormFileUpload = ({
  variation,
  accept,
  name,
  upload,
  file,
  rules,
  noFileText,
  btnUploadName,
  loading,
  disabled,
  showClearButton,
  onClear,
  isMobile,
}: FormFileUploadProps) => {
  const { t } = useTranslation();

  const { register, formState } = useFormContext();
  const { onChange, ...registerRest } = register(name, rules);

  const [selectedFile, setSelectedFile] = useState<File | undefined>(
    file || undefined
  );

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];

    if (file) {
      const parsedFile = safeParseFileName(file);
      setSelectedFile(parsedFile);
    }

    onChange(event);
  };

  useEffect(() => {
    if (!selectedFile) return;

    upload(selectedFile);
  }, [selectedFile]);

  return (
    <>
      {variation === 'file' && !selectedFile && (
        <OuterWrapper
          component="label"
          aria-label="File picker"
          isLoading={!!loading}
          disabled={disabled}
        >
          <InnerWrapper>
            <input
              {...registerRest}
              aria-label="Upload file"
              type="file"
              accept={accept}
              onChange={changeHandler}
              hidden
            ></input>
            {!loading &&
              (isMobile ? (
                <AddAPhotoRounded fontSize="large" color="info" />
              ) : (
                <GetAppRounded fontSize="large" color="info" />
              ))}
            {!isMobile && (
              <Span>
                {btnUploadName
                  ? btnUploadName
                  : t('common:buttons.browseUpload')}{' '}
              </Span>
            )}
          </InnerWrapper>
        </OuterWrapper>
      )}

      {variation === 'camera' && (
        <OuterWrapper
          aria-label="Camera picker"
          loading={!!loading}
          loadingIcon={<CachedRounded />}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onClick={disabled ? null : upload}
          disabled={disabled}
        >
          <InnerWrapper>
            {!loading && <AddAPhotoRounded fontSize="large" color="info" />}
          </InnerWrapper>
        </OuterWrapper>
      )}
      {variation === 'file' && (
        <ListImages>
          <Filename>
            {!selectedFile
              ? noFileText || t('common:validations.noFile')
              : selectedFile?.name || ''}
          </Filename>
          <Box marginLeft={'auto'}>
            {showClearButton &&
              selectedFile &&
              (loading ? (
                <FormFieldLoader loading={true} />
              ) : (
                <IconButton
                  onClick={() => {
                    setSelectedFile(undefined);
                    onClear?.();
                  }}
                >
                  <ClearIcon />
                </IconButton>
              ))}
          </Box>
        </ListImages>
      )}
      {formState?.errors?.[name]?.message && (
        <FormHelperText error>
          <> {formState?.errors?.[name]?.message}</>
        </FormHelperText>
      )}
    </>
  );
};

export default FormFileUpload;
