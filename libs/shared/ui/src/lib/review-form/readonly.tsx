import { Box, BoxProps, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import format from 'date-fns/format';
import { Translate } from 'next-translate';
import styled from '@emotion/styled';

export type RenderReadonlyReviewFormValuesProps = {
  /** The namespace to look for text key label */
  namespace: string;
  /** The step of the form to look for the text key label */
  step?: string;
  /** In case of dynamically added inputs we get arrays of new values with their own labels and values, a recursive call is made with the outer level label key */
  outer?: string;
  /** Injected translate function from i18n */
  t: Translate;
};

const LabelValueWrapper = styled(Box)`
  && {
    display: flex;
    margin: ${(props) => `${props.theme.spacing(1)} 0`};
  }
`;

const LabelText = styled(Typography)`
  && {
    display: inline;
    flex: 2;
  }
`;

const Value = styled(Typography)`
  && {
    ${(props) => props.theme.breakpoints.up('tablet')} {
      flex: 2;
    }
    flex: 1;
    & .MuiSvgIcon-root {
      font-size: 18px;
    }
  }
`;

const InnerGroupSection = styled(
  ({ gutters, ...props }: BoxProps & { gutters?: boolean }) => (
    <Box {...props} />
  )
)`
  && {
    margin-bottom: ${(props) => (props.gutters ? props.theme.spacing(8) : 0)};
  }
`;

const ArrayWrapper = styled.div`
  width: 100%;
`;

/**
 * Takes a namespace, step and optionally an outer string (used in recursion) as first set of params.
 * Second param is input from Object.entries calls. Made specifically to loop through form fields get
 * React-Hook-Form getValues().
 *
 * @example
 * Object.entries(getValues(Object.keys(adminFields))).map(
 *                renderReadonlyReviewFormValues({
 *                  namespace: 'company',
 *                  step: 'admin',
 *                })
 *              )
 *
 * @param props.namespace The namespace to look for text key label
 * @param props.step The step of the form to look for the text key label
 * @param props.outer In case of dynamically added inputs we get arrays of new values with their own labels and values, a recursive call is made with the outer level label key
 * @param props.t Injected translate function from i18n
 *
 * @returns The correct readonly form element to display the value (input for strings and numbers, checkbox for booleans)
 */
export const renderReadonlyReviewFormValues =
  ({ namespace, step, outer, t }: RenderReadonlyReviewFormValuesProps) =>
  (
    input: [
      string,
      (
        | string
        | number
        | Date
        | undefined
        | null
        | boolean
        | Array<Record<string, string | number | boolean | undefined>>
      )
    ],
    index: number
  ): JSX.Element | undefined => {
    const name = input[0];
    const value = input[1];

    if (value === '' || value === null || typeof value === 'undefined') {
      return <div key={index}></div>;
    }

    const label = t(
      `${namespace}:${step ? step + '.' : ''}${
        outer ? outer + '.' : ''
      }${name}.label`
    );

    if (value instanceof Date) {
      return (
        <LabelValueWrapper key={index}>
          <LabelText id={label} variant="body1">
            {label}
          </LabelText>
          {/* TODO: get locale from context/localstorage to get correct format once implemented */}
          <Value aria-labelledby={label} variant="body1">
            {format(value, 'dd.MM.yyyy')}
          </Value>
        </LabelValueWrapper>
      );
    }

    if (typeof value === 'string' || typeof value === 'number') {
      return (
        <LabelValueWrapper key={index}>
          <LabelText id={label} variant="body1">
            {label}
          </LabelText>
          <Value aria-labelledby={label} variant="body1">
            {value}
          </Value>
        </LabelValueWrapper>
      );
    }

    if (typeof value === 'boolean' && value) {
      return (
        <LabelValueWrapper key={index}>
          <LabelText id={label} variant="body1">
            {label}
          </LabelText>
          <Value>
            <CheckIcon aria-labelledby={label} width={18} />
          </Value>
        </LabelValueWrapper>
      );
    }

    if (Array.isArray(value)) {
      return (
        <ArrayWrapper key={index}>
          {value.map((innerInputs, index) => {
            return (
              <InnerGroupSection
                gutters={Object.keys(innerInputs).length > 1}
                key={index}
              >
                {Object.entries(innerInputs).map(
                  renderReadonlyReviewFormValues({
                    namespace,
                    step,
                    t,
                    outer: name,
                  })
                )}
              </InnerGroupSection>
            );
          })}
        </ArrayWrapper>
      );
    }

    return <div key={index}></div>;
  };
