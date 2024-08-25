import Icon, { IconOptions } from '../icon';
import svg from './user.svg';

export const UserIcon = (props: IconOptions): JSX.Element => (
  <Icon svg={svg} alt="Users" options={props} />
);

export default UserIcon;
