import { useRef, MutableRefObject, useState, useEffect } from 'react';

export type UseSizeProps = {
  /** Amount of milliseconds to wait before getting the size. Should be used when changes in the document are made after the initial load */
  initialTimeout?: number;
  /** Dependency array which triggers size calculation on change */
  deps?: unknown[];
};

export type UseSizeReturn<T extends HTMLElement> = {
  /** The ref to put on to the element that will be measured */
  ref: MutableRefObject<T | null>;
  /** Height of the element */
  height: number;
  /** Width of the element */
  width: number;
};

export const useSize = <T extends HTMLElement>({
  initialTimeout = 0,
  deps = [],
}: UseSizeProps = {}): UseSizeReturn<T> => {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [isInitial, setIsInitial] = useState(true);

  const setSize = () => {
    const newHeight = ref?.current?.clientHeight;
    if (newHeight) setHeight(newHeight);
    const newWidth = ref?.current?.clientWidth;
    if (newWidth) setWidth(newWidth);
  };

  useEffect(() => {
    if (isInitial) {
      setTimeout(() => {
        setSize();
        setIsInitial(false);
      }, initialTimeout);
    } else {
      setSize();
    }
  }, deps);

  return {
    ref,
    height,
    width,
  };
};

export default useSize;
