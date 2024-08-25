import Icon, { IconOptions } from '../icon';
import svg from './update.svg';

export const UpdateIcon = (props: IconOptions): JSX.Element => (
  <Icon svg={svg} alt="Update icon" options={props} />
);

export default UpdateIcon;
