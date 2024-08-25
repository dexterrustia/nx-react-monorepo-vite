import Icon, { IconOptions } from '../icon';
import svg from './briefcase.svg';

export const BriefcaseIcon = (props: IconOptions): JSX.Element => (
  <Icon svg={svg} alt="Briefcase" options={props} />
);

export default BriefcaseIcon;
