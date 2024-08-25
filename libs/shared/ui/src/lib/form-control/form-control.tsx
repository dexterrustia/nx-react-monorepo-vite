import {
  FormControl as MuiFormControl,
  FormControlProps as MuiFormControlProps,
} from '@mui/material';
import styled from '@emotion/styled';

export type FormControlProps = MuiFormControlProps & {
  /** Boolean to toggle visibility */
  visible?: boolean;
  /** Boolean to toggle if read only or editable */
  readOnly?: boolean;
  /** Flex value */
  flex?: number;
};

export const FormControl = styled(
  ({ visible = true, readOnly = false, flex, ...props }: FormControlProps) => (
    <MuiFormControl
      aria-hidden={!visible}
      aria-disabled={readOnly}
      {...props}
    />
  )
)`
  &&& {
    display: ${(props) => (props.visible ? 'inline-flex' : 'none')};
    margin: ${(props) => `${props.theme.spacing(2)} 0`};
    height: fit-content;
    ${(props) =>
      props.readOnly &&
      `opacity: 0.7;
      pointer-events: none;`}
    ${(props) => props.flex && `flex: ${props.flex};`}
  }
`;

export default FormControl;
