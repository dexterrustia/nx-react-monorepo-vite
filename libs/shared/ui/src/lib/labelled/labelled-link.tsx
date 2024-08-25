import styled from '@emotion/styled';
import { Link as MuiLink } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import useTranslation from 'next-translate/useTranslation';
import {
  Label,
  LabelledTextProps,
  LabelValueWrapper,
  Value,
} from './labelled-text';

export type LabelledLinkProps = LabelledTextProps & {
  /** Link to the page when the value is a regular link. This is ignored if `onClick` is present */
  href?: string;
  /** Target prop of the anchor when value is a regular link */
  target?: string;
  /** Callback function to be called when the value is click, and not a regular link with a href. Takes precedence over `href` */
  onClick?: () => void;
  /** As default, the href is placed in a tooltip */
  disableTooltip?: boolean;
  /** Custom tooltip message, default is "open in new" */
  tooltip?: string;
};

const Link = styled(MuiLink)`
  && {
    color: ${(props) => props.theme.palette.link.main};
    text-decoration: underline ${(props) => props.theme.palette.link.main};
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

const NewTabIcon = styled(OpenInNewIcon)`
  width: ${(props) => props.theme.spacing(4)};
  margin-left: ${(props) => props.theme.spacing(1)};
`;

export const LabelledLink = ({
  label,
  href,
  value,
  labelFlex,
  valueFlex,
  hideEmptyValue,
  compact,
  target = '_blank',
  disableTooltip,
  tooltip,
  onClick,
}: LabelledLinkProps): JSX.Element => {
  const { t } = useTranslation();
  if (
    hideEmptyValue &&
    (typeof value === 'undefined' ||
      value === null ||
      value === '' ||
      (value && !href && !onClick))
  ) {
    return <></>;
  }

  const isNewTab = () => {
    return !onClick && !!target?.includes('_blank');
  };

  return (
    <LabelValueWrapper>
      <Label id={label} variant="body1" flex={labelFlex} compact={compact}>
        {label}
      </Label>
      <Value
        aria-labelledby={label}
        variant="body1"
        flex={valueFlex}
        compact={compact}
      >
        <Link
          {...(onClick
            ? {
                onClick,
              }
            : {
                href,
                target,
                rel: 'noopener noreferrer',
              })}
          {...(!disableTooltip && {
            title: tooltip || t('common:tooltips.openNew'),
          })}
        >
          {value}
          {isNewTab() && <NewTabIcon aria-label="New tab icon" />}
        </Link>
      </Value>
    </LabelValueWrapper>
  );
};

export default LabelledLink;
