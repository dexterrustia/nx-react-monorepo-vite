import { Box, Typography, TypographyProps, BoxProps } from '@mui/material';
import styled from '@emotion/styled';

export type LabelledTextV2Props = Omit<TypographyProps, 'variant'> & {
  /** Label text */
  label: string;
  /** Value to be displayed next to label */
  value?: string | number | null;
  /** Whether or not to show label when value is empty */
  hideEmptyValue?: boolean;
  /** Whether or not to show the label */
  hideLabel?: boolean;
  /** Property to set how much the label should flex, defaults to 1 */
  labelFlex?: number;
  /** Property to set how much the value should flex, defaults to 2 */
  valueFlex?: number;
  /** This overrides the flex values, setting them to none, so that the label and value are right next to eachother */
  compact?: boolean;
  /** Indicates editing mode */
  isEditing?: boolean;
  /** The component used in editing mode */
  editComponent?: JSX.Element;
  /** Changes the layout of the label and value, defaults to `row` */
  flexDirection?: 'row' | 'column';
  /** Changes the styling of the label, defaults to `body1` */
  labelVariant?: TypographyProps['variant'];
  /** Changes the styling of the value, defaults to `body1` */
  valueVariant?: TypographyProps['variant'];
  /** Removes `:` from the label */
  disableColon?: boolean;
  /** Sets the margin to `auto` on label and value */
  center?: boolean;
  /** Removes margin from the component */
  noMargin?: boolean;
  /** Insert loading component */
};

type LabelValueProps = TypographyProps &
  Pick<LabelledTextV2Props, 'disableColon' | 'center'> & {
    flex?: number;
    compact?: boolean;
  };

type LabelValueWrapperV2Props = BoxProps & {
  flexDirection?: LabelledTextV2Props['flexDirection'];
  noMargin?: boolean;
};

export const LabelValueWrapperV2 = styled(
  ({ flexDirection, noMargin, ...props }: LabelValueWrapperV2Props) => (
    <Box {...props} />
  )
)`
  && {
    display: flex;
    flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
    margin-bottom: ${(props) => props.theme.spacing(4)};
    ${({ noMargin }) => noMargin && `margin: 0;`};
  }
`;

export const LabelV2 = styled(
  ({ flex, compact, disableColon, center, ...props }: LabelValueProps) => (
    <Typography {...props} />
  )
)`
  && {
    display: inline-block;
    white-space: nowrap;
    margin-right: ${(props) => props.theme.spacing(4)};
    color: ${(props) => props.theme.palette.secondary[500]};
    font-weight: ${({ theme }) => theme.mixins.fontWeight.bold};
    ${({ flex, compact }) =>
      !compact ? (flex ? `flex: ${flex}` : 'flex: 1') : 'flex:none'};

    margin: ${({ center }) => center && 'auto'};
    &::after {
      content: ${({ disableColon }) => !disableColon && '":"'};
    }
    p {
      font-family: 'Roboto' cursive;
      font-weight: 500;
    }
  }
`;

export const ValueV2 = styled(
  ({ flex, compact, center, ...props }: LabelValueProps) => (
    <Typography {...props} />
  )
)`
  && {
    display: inline-block;
    color: ${(props) => props.theme.palette.text.primary};

    margin: ${({ center }) => center && 'auto'};
    ${({ flex, compact }) =>
      !compact ? (flex ? `flex: ${flex}` : 'flex: 2') : 'flex: 100'};

    p {
      font-family: 'Roboto' cursive;
      font-weight: 400;
    }
  }
`;

export const LabelledTextV2 = ({
  center,
  compact,
  disableColon,
  editComponent,
  flexDirection,
  hideEmptyValue,
  hideLabel,
  isEditing,
  label,
  labelFlex,
  labelVariant = 'body1',
  value,
  valueFlex,
  valueVariant = 'body1',
  noMargin,
  ...typographyProps
}: LabelledTextV2Props): JSX.Element => {
  if (
    hideEmptyValue &&
    (typeof value === 'undefined' || value === null || value === '')
  ) {
    return <></>;
  }

  return (
    <LabelValueWrapperV2 flexDirection={flexDirection} noMargin={noMargin}>
      {!hideLabel && (
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
      )}
      {isEditing ? (
        editComponent
      ) : (
        <ValueV2
          {...typographyProps}
          aria-labelledby={label}
          variant={valueVariant}
          flex={valueFlex}
          compact={compact}
          center={center}
        >
          {value}
        </ValueV2>
      )}
    </LabelValueWrapperV2>
  );
};

export default LabelledTextV2;
