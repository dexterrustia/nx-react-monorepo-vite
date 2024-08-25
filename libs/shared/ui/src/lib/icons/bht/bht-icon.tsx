import Icon, { IconOptions } from '../icon';
import svg from './BHT-startside.svg';

export const BhtIcon = (props: IconOptions): JSX.Element => (
  <Icon svg={svg} alt="BHT homepage icon" options={props} />
);

export default BhtIcon;
