import { Box, Typography, TypographyProps, BoxProps } from '@mui/material';
import styled from '@emotion/styled';

export type LabelledTextProps = Omit<TypographyProps, 'variant'> & {
  /** Label text */
  label: string;
  /** Value to be displayed next to label */
  value?: string | number | null;
  /** Whether or not to show label when value is empty */
  hideEmptyValue?: boolean;
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
  /** Insert loading component */
};

type LabelValueProps = TypographyProps &
  Pick<LabelledTextProps, 'disableColon' | 'center'> & {
    flex?: number;
    compact?: boolean;
  };

type LabelValueWrapperProps = BoxProps & {
  flexDirection?: LabelledTextProps['flexDirection'];
};

export const LabelValueWrapper = styled(
  ({ flexDirection, ...props }: LabelValueWrapperProps) => <Box {...props} />
)`
  && {
    display: flex;
    flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
    margin: ${(props) => `${props.theme.spacing(1)} 0`};
  }
`;

export const Label = styled(
  ({ flex, compact, disableColon, center, ...props }: LabelValueProps) => (
    <Typography {...props} />
  )
)`
  && {
    display: inline-block;
    white-space: nowrap;
    margin-right: ${(props) => props.theme.spacing(4)};
    color: ${(props) => props.theme.palette.text.secondary};
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

export const Value = styled(
  ({ flex, compact, center, ...props }: LabelValueProps) => (
    <Typography {...props} />
  )
)`
  && {
    display: inline-block;
    color: ${(props) => props.theme.palette.grey[700]};

    margin: ${({ center }) => center && 'auto'};
    ${({ flex, compact }) =>
      !compact ? (flex ? `flex: ${flex}` : 'flex: 2') : 'flex: 100'};

    p {
      font-family: 'Roboto' cursive;
      font-weight: 400;
    }
  }
`;

export const LabelledText = ({
  label,
  value,
  hideEmptyValue,
  labelFlex,
  valueFlex,
  compact,
  isEditing,
  editComponent,
  flexDirection,
  labelVariant = 'body1',
  valueVariant = 'body1',
  disableColon,
  center,
  ...typographyProps
}: LabelledTextProps): JSX.Element => {
  if (
    hideEmptyValue &&
    (typeof value === 'undefined' || value === null || value === '')
  ) {
    return <></>;
  }

  return (
    <LabelValueWrapper flexDirection={flexDirection}>
      <Label
        id={label}
        variant={labelVariant}
        flex={labelFlex}
        compact={compact}
        disableColon={disableColon}
        center={center}
        fontSize={typographyProps.fontSize}
      >
        {label}
      </Label>
      {isEditing ? (
        editComponent
      ) : (
        <Value
          {...typographyProps}
          aria-labelledby={label}
          variant={valueVariant}
          flex={valueFlex}
          compact={compact}
          center={center}
        >
          {value}
        </Value>
      )}
    </LabelValueWrapper>
  );
};

export default LabelledText;
