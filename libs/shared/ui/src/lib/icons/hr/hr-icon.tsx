import Icon, { IconOptions } from '../icon';
import svg from './HR-home.svg';

export const HrIcon = (props: IconOptions): JSX.Element => (
  <Icon svg={svg} alt="Hr icon" options={props} />
);

export default HrIcon;
