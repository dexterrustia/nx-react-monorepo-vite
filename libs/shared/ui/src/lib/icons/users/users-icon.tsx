import Icon, { IconOptions } from '../icon';
import svg from './users.svg';

export const UsersIcon = (props: IconOptions): JSX.Element => (
  <Icon svg={svg} alt="Users" options={props} />
);

export default UsersIcon;
