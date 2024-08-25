import { PdfParagraphMainTitle } from '.';
import useTranslation from 'next-translate/useTranslation';
import { DateFormat, formatToDateString } from '@xpand/utils/date';
import { LabelledText } from '../labelled';

type PdfGeneralInfoSectionProps = {
  titlePrefix: string;
  name?: string;
  department?: string;
  date?: Date;
  description?: string;
  lastModified?: string;
  customFields?: { label: string; value: string }[];
};

export const PdfGeneralInfoSection = ({
  titlePrefix,
  name,
  department,
  date,
  description,
  lastModified,
  customFields,
}: PdfGeneralInfoSectionProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <PdfParagraphMainTitle>{`${titlePrefix} ${t(
        'common:generalInfo.title'
      )}`}</PdfParagraphMainTitle>
      <LabelledText
        value={name}
        label={t('common:generalInfo.name')}
        valueFlex={2}
        hideEmptyValue
      />
      <LabelledText
        value={department}
        label={t('common:generalInfo.department')}
        valueFlex={2}
        hideEmptyValue
      />
      {!!date && (
        <LabelledText
          value={formatToDateString(date, DateFormat.NORWEGIAN_DATE_STR_FORMAT)}
          label={t('common:generalInfo.date')}
          valueFlex={2}
        />
      )}
      {!!lastModified && (
        <LabelledText
          value={formatToDateString(
            new Date(lastModified),
            DateFormat.NORWEGIAN_DATE_STR_FORMAT
          )}
          label={t('common:generalInfo.lastModified')}
          valueFlex={2}
        />
      )}
      <LabelledText
        value={description}
        label={t('common:generalInfo.description')}
        valueFlex={2}
        hideEmptyValue
      />
      {!!customFields?.length &&
        customFields.map((field, index) => {
          return (
            <LabelledText
              key={index}
              value={field.value}
              label={field.label}
              valueFlex={2}
              hideEmptyValue
            />
          );
        })}
    </>
  );
};

export default PdfGeneralInfoSection;
