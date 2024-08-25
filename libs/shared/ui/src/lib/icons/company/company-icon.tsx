import Icon, { IconOptions } from '../icon';
import svg from './company.svg';

export const CompanyIcon = (props: IconOptions): JSX.Element => (
  <Icon svg={svg} alt="company" options={props} />
);

export default CompanyIcon;
