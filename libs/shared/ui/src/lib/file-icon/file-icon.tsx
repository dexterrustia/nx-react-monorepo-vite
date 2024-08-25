import { FileExtensions, MimeTypes } from '@xpand/utils/_types';

import { ImageIcon } from './image-icon';
import { PdfIcon } from './pdf-icon';
import { DataIcon } from './data-icon';
import { DefaultIcon } from './default-icon';

type Type = FileExtensions | MimeTypes | string | null | undefined;

export type FileIconProps = {
  type: Type;
};

const findIcon = (type: Type) => {
  switch (type) {
    case FileExtensions.PNG:
    case FileExtensions.JPEG:
    case FileExtensions.JPG:
    case MimeTypes.JPEG:
    case MimeTypes.JPG:
    case MimeTypes.PNG:
      return ImageIcon;
    case FileExtensions.PDF:
    case MimeTypes.PDF:
      return PdfIcon;
    case FileExtensions.XLSX:
    case FileExtensions.XLS:
    case FileExtensions.CSV:
    case FileExtensions.XLSB:
    case MimeTypes.XLSX:
      return DataIcon;
    default:
      return DefaultIcon;
  }
};

/**
 * Component that renders an icon based on the file type.
 * Only some file types are supported. If the file type is not supported, a default document icon will be rendered.
 * @param type - The file type.
 */
export const FileIcon = ({ type }: FileIconProps) => {
  const Icon = findIcon(type);
  return <Icon />;
};

export default FileIcon;
