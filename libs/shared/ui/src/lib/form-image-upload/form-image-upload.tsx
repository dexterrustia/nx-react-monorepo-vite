import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  Typography,
} from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { MAX_IMAGE_SIZE } from '@xpand/utils/constants';
import ClearIcon from '@mui/icons-material/Clear';
import { GetAppRounded } from '@mui/icons-material';
import styled from '@emotion/styled';
import { Box } from '@mui/system';

const FileUploadBox = styled(Box)`
  padding: ${({ theme }) => theme.spacing(8)};
  text-align: center;
  color: ${({ theme }) => theme.palette.info[200]};
  border: ${({ theme }) => theme.spacing(0.5)} dashed
    ${({ theme }) => theme.palette.info[200]};
  border-radius: ${({ theme }) => theme.spacing(1)};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FileUploadBoxImage = styled.img`
  max-width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const FileButton = styled(Button)`
  color: ${({ theme }) => theme.palette.info[200]};
`;

const Span = styled(Typography)`
  display: block;
  margin-top: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.palette.info.main};
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

const CloseButton = styled(Button)`
  margin-left: auto;
  color: ${({ theme }) => theme.palette.info[200]};
`;

export type ImageFileUpload = {
  id?: string;
  file?: File | null;
  fileName: string;
  sharedAccessUri?: string;
};

const imageFileUpdateDefaults: ImageFileUpload = {
  id: '',
  file: null,
  fileName: '',
  sharedAccessUri: '',
};

export type FormImageUploadProps = {
  name: string;
  isRequired?: boolean;
  /** Callback function called when file is selected, usually used to store image in blobstore */
  upload: (file: File | null) => void;
  onImageClear?: () => void;
};

const getKeyValue =
  <T extends ImageFileUpload, U extends keyof T>(key: U) =>
  (obj: T) =>
    obj[key];

//TypeGuard should check if params is ImageFileUpload or null otherwise throw an error
const isTypeImageFileUpload = (
  obj: ImageFileUpload
): obj is ImageFileUpload => {
  if (obj === null) return true;
  let result = true;

  Object.keys(imageFileUpdateDefaults).map((prop) => {
    if (getKeyValue(prop as keyof ImageFileUpload) === undefined) {
      result = false;
    }
    return prop;
  });

  return result;
};

/**
 * @deprecated We got too many ways to handle file uploads. Refactor all instances of file/mage upload into a more simple and unified way.
 * See: https://lyonfuture.atlassian.net/browse/XP-3549.
 */
export const FormImageUpload = ({
  name,
  isRequired,
  upload,
  onImageClear = () => {},
}: FormImageUploadProps): JSX.Element => {
  const { t } = useTranslation();
  const { watch, setValue, register, getFieldState, clearErrors, setError } =
    useFormContext();

  if (!isTypeImageFileUpload(watch(name))) {
    throw new Error('Something went wrong');
  }

  const { onChange: imageOnChange } = register(name, {
    required: isRequired
      ? {
          value: !watch(name),
          message: t('common:validations.requiredField'),
        }
      : undefined,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const renderThumbnail = (): JSX.Element => {
    if (watch(name)?.sharedAccessUri) {
      return (
        <FileUploadBoxImage alt="" src={watch(name)?.sharedAccessUri || ''} />
      );
    }
    if (watch(name)?.file) {
      return (
        <FileUploadBoxImage
          alt=""
          src={URL.createObjectURL(watch(name)?.file as File)}
        />
      );
    }
    return <GetAppRounded fontSize="large" color="info" />;
  };

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      clearErrors(name);

      if (
        event.target.files[0] &&
        event.target.files[0]?.size > MAX_IMAGE_SIZE
      ) {
        setError(name, {
          message: t('common:validations.fileToBig'),
        });
        setValue(name, imageFileUpdateDefaults);
        return;
      }

      setValue(`${name}.file`, event.target.files[0]);
      setValue(`${name}.fileName`, event.target.files[0].name);
      upload(event.target.files[0]);
    }
    imageOnChange(event);
  };

  const handleClearImage = () => {
    onImageClear();
    setValue(name, imageFileUpdateDefaults);
  };

  return (
    <>
      <FormGroup>
        <FormControl fullWidth>
          <FileUploadBox>
            {renderThumbnail()}
            <FileButton
              type="button"
              onClick={() => fileInputRef?.current?.click()}
            >
              <Span>{t('common:buttons.browseUpload')} </Span>
            </FileButton>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/x-png,image/jpeg"
              hidden
              onChange={handleSelectFile}
            />
          </FileUploadBox>

          {getFieldState(name).invalid && (
            <FormHelperText error>
              {t('common:validations.requiredField')}
            </FormHelperText>
          )}
          <ListImages>
            <Filename>
              {!watch(name)?.sharedAccessUri && !watch(name)?.file
                ? t('common:validations.noFile')
                : watch(name)?.fileName || ''}
            </Filename>
            {(watch(name)?.sharedAccessUri || watch(name)?.file) && (
              <CloseButton onClick={handleClearImage}>
                <ClearIcon />
              </CloseButton>
            )}
          </ListImages>
        </FormControl>
      </FormGroup>
    </>
  );
};

export default FormImageUpload;
