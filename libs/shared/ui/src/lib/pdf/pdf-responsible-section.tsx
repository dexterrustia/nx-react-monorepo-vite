import useTranslation from 'next-translate/useTranslation';
import { PdfParagraphSubTitle } from '.';
import { LabelledText } from '../labelled';

type PdfResponsibleSectionProps = {
  titlePrefix: string;
  name: string;
  phoneNumbers: string;
  email: string;
};

export const PdfResponsibleSection = ({
  titlePrefix,
  name,
  phoneNumbers,
  email,
}: PdfResponsibleSectionProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <PdfParagraphSubTitle marginTop={5}>{`${titlePrefix} ${t(
        'common:participants.responsible.title'
      )}`}</PdfParagraphSubTitle>
      <LabelledText
        value={name}
        label={t('common:participants.responsible.name')}
        valueFlex={2}
      />
      <LabelledText
        value={phoneNumbers}
        label={t('common:participants.responsible.phone')}
        valueFlex={2}
        hideEmptyValue
      />
      <LabelledText
        value={email}
        label={t('common:participants.responsible.email')}
        valueFlex={2}
        hideEmptyValue
      />
    </>
  );
};

export default PdfResponsibleSection;
