import Icon, { IconOptions } from '../icon';
import svg from './Fagbank-home.svg';

export const FagbankIcon = (props: IconOptions): JSX.Element => (
  <Icon svg={svg} alt="Fagbank icon" options={props} />
);

export default FagbankIcon;
