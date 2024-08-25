import Icon, { type IconOptions } from '../icon';
import svg from './flag-great-britain.svg';

export const FlagGreatBritainIcon = (props: IconOptions) => (
  <Icon svg={svg} alt="Great britain flag" options={props} />
);

export default FlagGreatBritainIcon;
