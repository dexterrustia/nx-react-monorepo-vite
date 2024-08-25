import { ReactNode } from 'react';
import styled from '@emotion/styled';

type NotificationIconProps = {
  icon: ReactNode;
  hasNotification?: boolean;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dot = styled.div`
  position: absolute;
  border-radius: 50%;
  top: ${({ theme }) => theme.spacing(1)};
  right: ${({ theme }) => theme.spacing(2)};
  height: ${({ theme }) => theme.spacing(4)};
  width: ${({ theme }) => theme.spacing(4)};
  background-color: ${({ theme }) => theme.palette.error.main};
  border: solid ${({ theme }) => theme.palette.grey['50']} 2px;
`;

export const NotificationIcon = ({
  icon,
  hasNotification,
}: NotificationIconProps): JSX.Element => {
  return (
    <Container aria-label="Notification icon">
      {hasNotification && <Dot aria-label="Notification alert icon" />}
      {icon}
    </Container>
  );
};

export default NotificationIcon;
