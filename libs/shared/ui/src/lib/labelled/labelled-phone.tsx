import { BasePhone, getPhoneWithPrefix } from '@xpand/utils/phone';
import { Hidden } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { LabelledLink, LabelledText } from './index';

export type LabelledPhoneProps = BasePhone;

export const LabelledPhone = ({
  type,
  number,
  prefix,
}: LabelledPhoneProps): JSX.Element => {
  const { t } = useTranslation();

  const openPhoneTo = () => {
    window?.open(`tel:${number}`);
  };

  return (
    <>
      <Hidden implementation="css" smDown>
        <LabelledText
          label={
            type
              ? t(`common:phone.type.${type}`, {
                  fallback: 'Phone',
                })
              : t('common:phone.default')
          }
          value={getPhoneWithPrefix({ prefix, number })}
          hideEmptyValue
        />
      </Hidden>
      <Hidden implementation="css" smUp>
        <LabelledLink
          label={
            type
              ? t(`common:phone.type.${type}`, {
                  fallback: 'Phone',
                })
              : t('common:phone.default')
          }
          value={getPhoneWithPrefix({ prefix, number })}
          onClick={openPhoneTo}
          disableTooltip
          hideEmptyValue
        />
      </Hidden>
    </>
  );
};

export default LabelledPhone;
