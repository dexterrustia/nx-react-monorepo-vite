import { ReactNode } from 'react';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';

import {
  LabelledTextV2Props,
  LabelV2,
  LabelValueWrapperV2,
  ValueV2,
} from './labelled-textV2';

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.palette.info[50]};
  display: flex;
  padding-right: ${({ theme }) => theme.spacing(2)};
`;

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .MuiTypography-h5 {
    font-weight: ${(props) => props.theme.typography.fontWeightBold};
  }
`;

export type LabelledAttachmentProps = LabelledTextV2Props & {
  /** Actions for the attachment */
  actions?: ReactNode;
  /** Link to the page when the value is a regular link. This is ignored if `onClick` is present */
  href?: string;
  /** MimeType of attachment */
  mimeType?: string | null | undefined;
  /** Callback function to be called when the value is click, and not a regular link with a href. Takes precedence over `href` */
  onClick?: () => void;
};

export const LabelledAttachment = ({
  actions,
  center,
  compact,
  disableColon,
  flexDirection,
  hideEmptyValue,
  href,
  label,
  labelFlex,
  labelVariant = 'body1',
  mimeType,
  onClick,
  value,
  valueFlex,
  valueVariant = 'body1',
  ...typographyProps
}: LabelledAttachmentProps): JSX.Element => {
  if (
    hideEmptyValue &&
    (typeof value === 'undefined' ||
      value === null ||
      value === '' ||
      (value && !href && !onClick))
  ) {
    return <></>;
  }

  return (
    <LabelValueWrapperV2>
      <LabelV2
        id={label}
        variant={labelVariant}
        flex={labelFlex}
        compact={compact}
        disableColon={disableColon}
        center={center}
        fontSize={typographyProps.fontSize}
      >
        {label}
      </LabelV2>
      <ValueV2
        {...typographyProps}
        aria-labelledby={label}
        variant={valueVariant}
        flex={valueFlex}
        compact={compact}
        center={center}
      >
        <LinkWrapper>
          <Wrapper>
            <Typography>{value}</Typography>
            {!!actions && <ActionWrapper>{actions}</ActionWrapper>}
          </Wrapper>
        </LinkWrapper>
      </ValueV2>
    </LabelValueWrapperV2>
  );
};

export default LabelledAttachment;
