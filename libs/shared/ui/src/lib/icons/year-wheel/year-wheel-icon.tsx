import Icon, { IconOptions } from '../icon';
import svg from './yearWheel-icon.svg';

export const YearWheelIcon = (props: IconOptions): JSX.Element => (
  <Icon svg={svg} alt="year wheel icon" options={props} />
);

export default YearWheelIcon;
