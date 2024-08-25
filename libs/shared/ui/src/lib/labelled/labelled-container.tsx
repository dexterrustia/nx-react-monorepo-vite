import { TypographyProps } from '@mui/material';
import { LabelV2, LabelValueWrapperV2, ValueV2 } from './labelled-textV2';

export type LabelledContainerProps = Omit<TypographyProps, 'variant'> & {
  /** Label text */
  label: string;
  /** Value to be displayed next to label */
  value?: string | number | null | JSX.Element;
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

export const LabelledContainer = ({
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
}: LabelledContainerProps): JSX.Element => {
  if (
    hideEmptyValue &&
    (typeof value === 'undefined' || value === null || value === '')
  ) {
    return <></>;
  }

  return (
    <LabelValueWrapperV2 flexDirection={flexDirection}>
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

export default LabelledContainer;
