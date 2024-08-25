import Icon, { IconOptions } from '../icon';
import svg from './continue.svg';

export const ContinueIcon = (props: IconOptions): JSX.Element => (
  <Icon svg={svg} alt="continue" options={props} />
);

export default ContinueIcon;
