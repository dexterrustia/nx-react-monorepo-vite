import type { ChangeEvent } from 'react';
import type { FieldValues, Path, PathValue } from 'react-hook-form';

export const sanitizeFileInput = <TName extends FieldValues>(
  valueInput: PathValue<TName, Path<TName>>
) => {
  const value = valueInput as FileList | null;

  const isFileList = value instanceof FileList;
  const isNull = value === null;

  if (!isFileList && !isNull) {
    throw new Error('Value should be a file list or null');
  }

  const files = !isNull ? Array.from(value) : null;

  return files;
};

export const sanitizeChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;

  if (files?.length === 0) {
    return null;
  }

  return files;
};
