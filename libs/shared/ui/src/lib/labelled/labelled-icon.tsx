import styled from '@emotion/styled';

type LabelledIconProps = {
  icon: JSX.Element;
  label: string;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    margin-left: ${({ theme }) => theme.spacing(1)};
  }
`;

export const LabelledIcon = ({
  icon,
  label,
}: LabelledIconProps): JSX.Element => {
  return (
    <Container aria-label="labelled icon">
      {icon}
      <span>{label}</span>
    </Container>
  );
};

export default LabelledIcon;
