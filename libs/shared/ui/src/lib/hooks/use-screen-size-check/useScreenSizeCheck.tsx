import { useEffect, useState } from 'react';

const PHONE_SIZE = 500;
const TABLET_SIZE = 768;

/**
 * Custom hook to check if the user is using a mobile device
 * Eg. Tablet, phone, etc.
 */
export const useScreenSizeCheck = () => {
  const [isPhoneUser, setPhoneUser] = useState(window.innerWidth <= PHONE_SIZE);
  const [isMobileUser, setMobileUser] = useState(
    window.innerWidth <= TABLET_SIZE
  );

  const handleResize = () => {
    setPhoneUser(window.innerWidth <= PHONE_SIZE);
    setMobileUser(window.innerWidth <= TABLET_SIZE);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    /** If the user is using a phone */
    isPhoneUser,
    /** If the user is using a mobile device (Tablet device or smaller) */
    isMobileUser,
  };
};
