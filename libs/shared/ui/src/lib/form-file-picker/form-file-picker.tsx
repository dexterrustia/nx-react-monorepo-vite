import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import {
  Control,
  ControllerProps,
  FieldValues,
  Path,
  Controller,
} from 'react-hook-form';
import { sanitizeChangeValue, sanitizeFileInput } from './helpers';
import useTranslation from 'next-translate/useTranslation';

export const DEFAULT_ACCEPT =
  '.png, .jpg, .jpeg, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt' as const;

export const IMAGE_ACCEPT = '.png, .jpg, .jpeg' as const;

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'type'
>;

export type FormFileUploadV2Props<TName extends FieldValues> = {
  /** Form controller. */
  control: Control<TName>;
  /** Form field name. */
  name: Path<TName>;
  /** Makes the field full width (100%) */
  fullWidth?: boolean;
  /** Form field validation rules. */
  rules?: ControllerProps<TName>['rules'];
  /** Additional input props. */
  inputProps?: InputProps;
};

const Container = styled.div<{ isError: boolean; fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(8)};
  border-radius: ${({ theme }) => theme.spacing(1)};

  border: solid 1px
    ${({ theme, isError }) =>
      isError ? theme.palette.error.main : theme.palette.grey[400]};

  width: ${({ fullWidth, theme }) => (fullWidth ? '100%' : theme.spacing(70))};
`;

const FileNamesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const FormFilePicker = <TName extends FieldValues>({
  control,
  name,
  fullWidth,
  rules,
  inputProps,
}: FormFileUploadV2Props<TName>) => {
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
        const files = sanitizeFileInput(field.value);
        return (
          <Container
            isError={!!fieldState.error?.message}
            fullWidth={fullWidth}
          >
            <NoFilesMessage files={files} />
            <FileNamesMessage files={files} />
            <Button component="label" variant="outlined">
              <Typography variant="button">
                {t('common:filePicker.chooseFile')}
              </Typography>
              <input
                accept={DEFAULT_ACCEPT}
                {...field}
                {...inputProps}
                type="file"
                value={field.value?.fileName}
                onChange={(event) => {
                  const value = sanitizeChangeValue(event);
                  field.onChange(value);
                }}
                hidden
              />
            </Button>
            {fieldState.error && (
              <Typography variant="body2" color="red">
                {fieldState.error.message}
              </Typography>
            )}
          </Container>
        );
      }}
    />
  );
};

export default FormFilePicker;

type MessageProps = {
  files: File[] | null;
};

const NoFilesMessage = ({ files }: MessageProps) => {
  const { t } = useTranslation();

  if (!!files) {
    return null;
  }

  return (
    <Typography variant="body2" color="gray">
      {t('common:filePicker.noFile')}
    </Typography>
  );
};

const FileNamesMessage = ({ files }: MessageProps) => {
  if (!files) {
    return null;
  }

  return (
    <FileNamesWrapper>
      {files.map((file, index) => {
        return (
          <Typography key={index} variant="body2">
            {file.name}
          </Typography>
        );
      })}
    </FileNamesWrapper>
  );
};
