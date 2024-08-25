import Icon, { IconOptions } from '../icon';
import svg from './check.svg';

export const CheckIcon = (props: IconOptions): JSX.Element => (
  <Icon svg={svg} alt="Check" options={props} />
);

export default CheckIcon;
