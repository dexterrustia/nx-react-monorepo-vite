import { LongMenu } from './long-menu';
import { ShortMenu } from './short-menu';

const DEFAULT_COLLAPSED_LENGTH = 3 as const;

export type IconMenuCollapseProps = {
  children: React.ReactNode[];
  /**
   * The length at which the menu should collapse
   * @default 3
   **/
  collapsedLength?: number;
};

export const IconMenuCollapse = ({
  children,
  collapsedLength = DEFAULT_COLLAPSED_LENGTH,
}: IconMenuCollapseProps) => {
  if (children.length > collapsedLength) {
    return <LongMenu>{children}</LongMenu>;
  }

  return <ShortMenu>{children}</ShortMenu>;
};

export default IconMenuCollapse;
