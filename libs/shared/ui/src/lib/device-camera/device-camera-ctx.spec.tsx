import {
  test,
  describe,
  expect,
  vi,
  beforeEach,
  type Mock,
  afterEach,
} from 'vitest';

import { deepClone } from '@xpand/utils/object';
import { act, render, renderHook, waitFor } from '@testing-library/react';
import {
  useDeviceCamera,
  useDeviceCameraContext,
  DeviceCameraProvider,
  UseDeviceCameraProps,
  DeviceCameraContextReturnValue,
} from './device-camera-ctx';
import React from 'react';

global.console = {
  ...console,
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};

describe('DeviceCameraProvider', () => {
  test('renders correctly with children', () => {
    const { result } = renderHook<
      DeviceCameraContextReturnValue,
      UseDeviceCameraProps
    >(() => useDeviceCamera());

    const { getByText } = render(
      <DeviceCameraProvider {...result.current}>
        <p>children</p>
      </DeviceCameraProvider>
    );

    expect(getByText('children')).toBeInTheDocument();
  });
});

describe('DeviceCameraContext', () => {
  test('handles default values when outside of provider', () => {
    const { result } = renderHook<
      DeviceCameraContextReturnValue,
      UseDeviceCameraProps
    >(() => useDeviceCameraContext());

    expect(result.current.cameraIsOpen).toBe(false);
    expect(result.current.hasCurrentImage).toBe(false);
    expect(result.current.hasFinalImage).toBe(false);
    expect(result.current.isCapturing).toBe(false);
    expect(result.current.isLaunching).toBe(false);
    expect(result.current.isBlitzing).toBe(false);
    expect(result.current.blob).toBe(null);
  });
});

describe('useDeviceCamera', () => {
  const originalNavigator = deepClone(window.navigator);

  beforeEach(() => {
    // Mocking fetch so it returns a fake blob as response
    global.fetch = vi.fn(() =>
      Promise.resolve({
        blob: () => Promise.resolve([1]),
      })
    ) as Mock;

    // Mocking the refs for video and canvas
    vi.spyOn(React, 'useRef').mockImplementation(() => ({
      current: {
        getContext: () => {
          return {
            drawImage: vi.fn(),
          };
        },
        toDataURL: () => 'fake-image-url',
        height: 200,
        width: 200,
        play: vi.fn(),
      },
    }));

    const navigator: Navigator = {
      ...global.navigator,
      mediaDevices: {
        ...global.navigator.mediaDevices,
        getUserMedia: vi.fn(),
      },
    };
    // Mocking the navigator to simulate that camera is available
    vi.spyOn(window, 'navigator', 'get').mockImplementation(() => {
      return navigator;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should open camera, capture image and accept it', async () => {
    const mockOnOpen = vi.fn();
    const mockOnCaptureImage = vi.fn();
    const mockOnClose = vi.fn();

    const { result } = renderHook<
      DeviceCameraContextReturnValue,
      UseDeviceCameraProps
    >(() =>
      useDeviceCamera({
        onOpen: mockOnOpen,
        onCaptureImage: mockOnCaptureImage,
        onClose: mockOnClose,
      })
    );

    expect(result.current.cameraIsOpen).toBeFalsy();
    act(() => {
      result.current.openCamera();
    });

    expect(mockOnOpen).toHaveBeenCalledTimes(1);
    expect(result.current.cameraIsOpen).toBeTruthy();

    expect(result.current.isCapturing).toBeFalsy();
    act(() => {
      result.current.captureImage();
    });

    expect(mockOnCaptureImage).toHaveBeenCalledTimes(1);
    expect(result.current.isCapturing).toBeTruthy();

    expect(result.current.hasCurrentImage).toBeTruthy();
    expect(result.current.hasFinalImage).toBeFalsy();
    act(() => {
      result.current.acceptImage();
    });

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    expect(result.current.cameraIsOpen).toBeFalsy();
    expect(result.current.isCapturing).toBeFalsy();
    expect(result.current.currentImage).toBe(null);
    expect(result.current.hasFinalImage).toBeTruthy();
    expect(result.current.finalImage).toBe('fake-image-url');
    expect(result.current.blob).toEqual([1]);
  });

  test('should open and close camera', async () => {
    const mockOnClose = vi.fn();

    const { result } = renderHook<
      DeviceCameraContextReturnValue,
      UseDeviceCameraProps
    >(() =>
      useDeviceCamera({
        onClose: mockOnClose,
      })
    );

    act(() => {
      result.current.openCamera();
    });
    expect(result.current.cameraIsOpen).toBeTruthy();

    act(() => {
      result.current.closeCamera();
    });

    await waitFor(() => {
      expect(result.current.cameraIsOpen).toBeFalsy();
      expect(result.current.isCapturing).toBeFalsy();
      expect(mockOnClose).toHaveBeenCalledTimes(1);
      expect(result.current.finalImage).toBe(null);
    });
  });

  test('should open camera, capture image, decline it and camera reopens', async () => {
    const { result } = renderHook<
      DeviceCameraContextReturnValue,
      UseDeviceCameraProps
    >(() => useDeviceCamera());

    act(() => {
      result.current.openCamera();
    });

    act(() => {
      result.current.captureImage();
    });
    expect(result.current.isCapturing).toBeTruthy();
    expect(result.current.hasCurrentImage).toBeTruthy();
    expect(result.current.currentImage).toBe('fake-image-url');

    act(() => {
      result.current.declineImage();
    });

    await waitFor(() => {
      expect(result.current.cameraIsOpen).toBeTruthy();
      expect(result.current.isCapturing).toBeFalsy();
      expect(result.current.hasCurrentImage).toBeFalsy();
      expect(result.current.currentImage).toBe(null);
    });
  });

  test('blitz should be true for a given duration after capturing', async () => {
    const { result } = renderHook<
      DeviceCameraContextReturnValue,
      UseDeviceCameraProps
    >(() => useDeviceCamera());

    act(() => {
      result.current.openCamera();
    });

    act(() => {
      result.current.captureImage();
    });

    expect(result.current.isBlitzing).toBeTruthy();

    await waitFor(() => {
      expect(result.current.isBlitzing).toBeFalsy();
    });
  });

  test('should start launching when opening camera', async () => {
    const { result } = renderHook<
      DeviceCameraContextReturnValue,
      UseDeviceCameraProps
    >(() => useDeviceCamera());

    act(() => {
      result.current.openCamera();
    });

    expect(result.current.isLaunching).toBeTruthy();
  });

  test('should throw error if videoRef.current is not defined', () => {
    // Mocking the refs for video and canvas
    vi.spyOn(React, 'useRef').mockImplementation(() => ({
      current: null,
    }));

    const { result } = renderHook<
      DeviceCameraContextReturnValue,
      UseDeviceCameraProps
    >(() => useDeviceCamera());

    act(() => {
      result.current.openCamera();
    });

    expect(result.current.cameraIsOpen).toBeFalsy();
  });

  test('should throw error if no camera support and clear error when opening camera again', async () => {
    // Mocking the navigator to simulate that camera is available
    vi.spyOn(window, 'navigator', 'get').mockImplementation(() => {
      return originalNavigator;
    });

    const mockOnOpen = vi.fn();

    const { result } = renderHook<
      DeviceCameraContextReturnValue,
      UseDeviceCameraProps
    >(() =>
      useDeviceCamera({
        onOpen: mockOnOpen,
      })
    );

    act(() => {
      result.current.openCamera();
    });

    await waitFor(() => {
      expect(result.current.cameraIsOpen).toBeFalsy();
      expect(mockOnOpen).toHaveBeenCalledTimes(0);
      expect(result.current.error?.message).toBe(
        'Device does not support camera'
      );
    });

    const navigator: Navigator = {
      ...global.navigator,
      mediaDevices: {
        ...global.navigator.mediaDevices,
        getUserMedia: vi.fn(),
      },
    };
    // Mocking the navigator to simulate that camera is available
    vi.spyOn(window, 'navigator', 'get').mockImplementation(() => {
      return navigator;
    });

    act(() => {
      result.current.openCamera();
    });

    await waitFor(() => {
      expect(result.current.error).toBe(null);
    });
  });

  test('should throw error when opening already open camera', async () => {
    const mockOnOpen = vi.fn();

    const { result } = renderHook<
      DeviceCameraContextReturnValue,
      UseDeviceCameraProps
    >(() =>
      useDeviceCamera({
        onOpen: mockOnOpen,
      })
    );
    act(() => {
      result.current.openCamera();
    });
    expect(mockOnOpen).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.openCamera();
    });

    await waitFor(() => {
      expect(mockOnOpen).toHaveBeenCalledTimes(1);
    });
  });

  test('should throw error when accpeting image if not current image is present', async () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch as Mock;

    const { result } = renderHook<
      DeviceCameraContextReturnValue,
      UseDeviceCameraProps
    >(() => useDeviceCamera());

    act(() => {
      result.current.openCamera();
    });

    act(() => {
      result.current.acceptImage();
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(0);
    });
  });

  test('should successfully call innerRef with video tag', async () => {
    const { result } = renderHook<
      DeviceCameraContextReturnValue,
      UseDeviceCameraProps
    >(() => useDeviceCamera());

    act(() => {
      result.current.innerRef('<video></video>');
    });

    await waitFor(() => {});
  });

  test('should successfully call innerRef with canvas tag', async () => {
    const { result } = renderHook<
      DeviceCameraContextReturnValue,
      UseDeviceCameraProps
    >(() => useDeviceCamera());

    act(() => {
      result.current.innerRef('<canvas></canvas>');
    });

    await waitFor(() => {});
  });

  test('should not close camera when already closed', async () => {
    const mockOnClose = vi.fn();

    const { result } = renderHook<
      DeviceCameraContextReturnValue,
      UseDeviceCameraProps
    >(() =>
      useDeviceCamera({
        onClose: mockOnClose,
      })
    );

    act(() => {
      result.current.closeCamera();
    });

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(0);
    });
  });
});
