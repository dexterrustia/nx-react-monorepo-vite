import Icon, { IconOptions } from '../icon';
import svg from './engineering.svg';

export const EngineeringIcon = (props: IconOptions): JSX.Element => (
  <Icon svg={svg} alt="engineering person icon" options={props} />
);

export default EngineeringIcon;
