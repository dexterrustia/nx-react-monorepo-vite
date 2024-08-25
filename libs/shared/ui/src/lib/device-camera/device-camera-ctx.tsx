import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
  MutableRefObject,
  useEffect,
} from 'react';

export const DEVICE_CAMERA_LAUNCH_DELAY = 1000;
export const DEVICE_CAMERA_BLITZ_DURATION = 200;

type PreviewOptions = {
  maxHeight?: number | string;
  maxWidth?: number | string;
  minHeight: number | string;
  minWidth?: number | string;
};

export type UseDeviceCameraProps = {
  /** Triggered when opening the camera */
  onOpen?: () => void;
  /** Triggered on captering an image */
  onCaptureImage?: () => void;
  /** Triggered when closing the camera */
  onClose?: () => void;
  /** Options used to configure the preview view */
  previewOptions?: PreviewOptions;
};

export type DeviceCameraContext = {
  /** Opens tha camera by starting a video stream  */
  openCamera: (options?: PreviewOptions) => void;
  /** Captures an image from the video stream */
  captureImage: () => void;
  /** Closing the camera */
  closeCamera: () => void;
  /** Tells if the camera is open */
  cameraIsOpen: boolean;
  /** Ref injected into the video and canvas tags */
  innerRef: (node: unknown) => void;
  /** The currently selected image */
  currentImage: string | null;
  /** Tells if the a current image is existing */
  hasCurrentImage: boolean;
  /** Tells if currently capturing */
  isCapturing: boolean;
  /** The final image, set after current image is accepted */
  finalImage: string | null;
  /** Tells if a final image is set */
  hasFinalImage: boolean;
  /** Removes the current image and repoens the camera */
  declineImage: () => void;
  /** Accepts the current image by setting it as final and closes the camera */
  acceptImage: () => Promise<void>;
  /** Tells if the video stream is launching */
  isLaunching: boolean;
  /** Blob of the final image */
  blob: Blob | null;
  /** Used to show a blitz fade animation on capture */
  isBlitzing: boolean;
  /** Video tag ref */
  videoRef: MutableRefObject<null> | null;
  /** Canvas tag ref */
  canvasRef: MutableRefObject<null> | null;
  error: Error | null;
};

export type DeviceCameraContextReturnValue = DeviceCameraContext;

export type DeviceCameraProviderProps = DeviceCameraContext & {
  children: ReactNode;
};

const DeviceCameraContext = createContext<DeviceCameraContext>({
  openCamera: () => {},
  captureImage: () => {},
  closeCamera: () => {},
  cameraIsOpen: false,
  innerRef: () => {},
  currentImage: null,
  hasCurrentImage: false,
  isCapturing: false,
  finalImage: null,
  hasFinalImage: false,
  declineImage: () => {},
  acceptImage: async () => {},
  isLaunching: false,
  blob: null,
  isBlitzing: false,
  canvasRef: null,
  videoRef: null,
  error: null,
});

export const useDeviceCamera = ({
  onOpen = () => {},
  onCaptureImage = () => {},
  onClose = () => {},
}: UseDeviceCameraProps = {}): DeviceCameraContextReturnValue => {
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [reopen, setReopen] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isBlitzing, setIsBlitzing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Sets the ref for the video and canvas elements
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setRef = useCallback((node: any) => {
    const currentElement = node?.outerHTML?.split('<')[1]?.split('>')?.[0];

    // Setting video element ref
    if (currentElement === 'video') {
      if (videoRef.current) {
        videoRef.current = null;
      }
      // Save a reference to the node
      videoRef.current = node;
    }

    // Setting canvas element ref
    if (currentElement === 'canvas') {
      if (canvasRef.current) {
        canvasRef.current = null;
      }
      // Save a reference to the node
      canvasRef.current = node;
    }
  }, []);

  /**
   * Util that pareses generic refs into a type safe ref object
   * @param ref The not typed ref object
   * @returns Typed ref object
   */
  const parseRef = <TRef,>(
    ref: MutableRefObject<null>
  ): MutableRefObject<TRef> => {
    return ref as unknown as MutableRefObject<TRef>;
  };

  useEffect(() => {
    if (!isCapturing) return;
    setIsBlitzing(true);
    const timeoutId = setTimeout(
      () => setIsBlitzing(false),
      DEVICE_CAMERA_BLITZ_DURATION
    );
    return function cleanup() {
      clearTimeout(timeoutId);
    };
  }, [isCapturing]);

  /**
   * Starting a video stream if state is open, if not closing the stream
   */
  useEffect(() => {
    // Staring video stream
    if (isOpen) {
      const run = async () => {
        try {
          if (!videoRef?.current) throw new Error('Ref is not defined');

          setIsLaunching(true);
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });

          setStream(stream);

          const parsedVideoRef = parseRef<HTMLVideoElement>(videoRef);
          parsedVideoRef.current.srcObject = stream;
          parsedVideoRef.current.play();
        } catch (error) {
          console.error(error);
          setIsOpen(false);
        } finally {
          setTimeout(() => {
            setIsLaunching(false);
          }, DEVICE_CAMERA_LAUNCH_DELAY);
        }
      };
      run();
    }

    // Closing video stream
    if (!isOpen && stream) {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
  }, [isOpen]);

  /**
   * Trying to capture image from video stream
   */
  useEffect(() => {
    if (!isCapturing) return;

    try {
      const parsedVideoRef = parseRef<HTMLVideoElement>(videoRef);
      const parsedCanvasRef = parseRef<HTMLCanvasElement>(canvasRef);

      const width = parsedVideoRef.current.videoWidth;
      const height = parsedVideoRef.current.videoHeight;

      const ctx = parsedCanvasRef.current.getContext('2d');

      parsedCanvasRef.current.width = width;
      parsedCanvasRef.current.height = height;

      ctx?.drawImage(parsedVideoRef.current, 0, 0, width, height);
      const imageUrl = parsedCanvasRef.current.toDataURL('image/png');
      setCurrentImage(imageUrl);

      onCaptureImage();
    } catch (error) {
      console.error(error);
    }
  }, [isCapturing]);

  /**
   * Opening the camera by checking device compatibility and setting is open state to true
   */
  const openCamera = async () => {
    if (error) setError(null);

    const deviceHasCameraSupport =
      'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;

    if (!deviceHasCameraSupport) {
      const msg = 'Device does not support camera';
      console.error(msg);
      setError(new Error(msg));
      return;
    }

    if (isOpen) {
      console.error('Cannot open camera, camera is already open');
      return;
    }

    setIsOpen(true);
    onOpen();
  };

  /**
   * If reopen is true, it will reopen the camera
   */
  useEffect(() => {
    if (reopen && !isOpen && !isCapturing) {
      openCamera();
      setReopen(false);
    }
  }, [reopen, isOpen, isCapturing]);

  /**
   * Setting the isCapturing state to true
   */
  const captureImage = () => {
    setIsCapturing(true);
  };

  /**
   * Closing the camera
   */
  const closeCamera = () => {
    if (!isOpen) {
      console.error('Cannot close camera, camera is already closed');
      return;
    }

    setIsOpen(false);
    setIsCapturing(false);
    setCurrentImage(null);

    onClose();
  };

  /**
   * Declining the image and repopen the camera
   */
  const declineImage = () => {
    setCurrentImage(null);
    setIsCapturing(false);
    setIsOpen(false);

    setReopen(true);
  };

  /**
   * Accepts the current image and sets the final image
   */
  const acceptImage = async (): Promise<void> => {
    try {
      if (!currentImage)
        throw new Error(
          'Cannot accept final image, current image is not defined'
        );

      const res = await fetch(currentImage);
      const blob = await res.blob();
      setBlob(blob);
      setFinalImage(currentImage);
    } catch (error) {
      console.error('Failed to accept image', error);
    } finally {
      closeCamera();
    }
  };

  return {
    openCamera,
    captureImage,
    closeCamera,
    cameraIsOpen: isOpen,
    innerRef: setRef,
    currentImage,
    hasCurrentImage: !!currentImage,
    isCapturing,
    finalImage,
    hasFinalImage: !!finalImage,
    declineImage,
    acceptImage,
    isLaunching,
    blob,
    isBlitzing,
    videoRef,
    canvasRef,
    error,
  };
};

export const DeviceCameraProvider = ({
  children,
  ...deviceCameraProps
}: DeviceCameraProviderProps): JSX.Element => {
  return (
    <DeviceCameraContext.Provider value={deviceCameraProps}>
      {children}
    </DeviceCameraContext.Provider>
  );
};

export const useDeviceCameraContext = (): DeviceCameraContextReturnValue =>
  useContext(DeviceCameraContext);
