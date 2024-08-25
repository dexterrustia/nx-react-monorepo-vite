import { Translate } from 'next-translate';

enum PhoneType {
  MOBILE = 'mobile',
  OFFICE = 'office',
  PRIVATE = 'private',
}

export const phoneTypeOptions = (
  t: Translate
): {
  id: string;
  name: string;
}[] => {
  return Object.values(PhoneType).map((type) => ({
    id: type,
    name: `${t(`common:phone.type.${type}`)}`,
  }));
};
