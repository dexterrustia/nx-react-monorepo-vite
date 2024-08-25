import Icon, { type IconOptions } from '../icon';
import svg from './flag-norway.svg';

export const FlagNorwayIcon = (props: IconOptions) => (
  <Icon svg={svg} alt="Norwegian flag" options={props} />
);

export default FlagNorwayIcon;
