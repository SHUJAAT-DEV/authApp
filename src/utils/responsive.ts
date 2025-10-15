import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (design reference - usually iPhone 14/15 or similar)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

// Scale based on screen width with pixel density consideration
export const widthScale = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const responsiveWidth = (percent: number = 90): number => {
  const ratio = percent / 100;
  const newSize = SCREEN_WIDTH * ratio;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

//  Scale based on screen height
export const heightScale = (size: number): number => {
  const scale = SCREEN_HEIGHT / BASE_HEIGHT;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Moderate scale - less aggressive scaling for text
export const moderateScale = (size: number, factor: number = 0.5): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size + (scale - 1) * factor * size;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


export const responsiveSize = (size: number): number => {
  // Get device characteristics
  const pixelRatio = PixelRatio.get();
  const fontScale = PixelRatio.getFontScale();
  const screenArea = SCREEN_WIDTH * SCREEN_HEIGHT;
  const smallestDimension = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT);

  // Determine device category based on multiple factors
  const getDeviceCategory = () => {
    // Check if it's a tablet first
    if (smallestDimension >= 768 || screenArea >= 500000) {
      return 'tablet';
    }

    // For phones, use smallest dimension as primary factor
    if (smallestDimension >= 414) return 'large-phone';   // iPhone Pro Max, large Android
    if (smallestDimension >= 390) return 'standard-phone'; // iPhone 14, Pixel 7
    if (smallestDimension >= 360) return 'medium-phone';   // Common Android size
    if (smallestDimension >= 320) return 'small-phone';    // iPhone SE, compact Android
    return 'tiny-phone'; // Very small devices
  };

  const deviceCategory = getDeviceCategory();
  const getScaleFactor = () => {
    switch (deviceCategory) {
      case 'tablet':
        return 1.2; // Tablets get larger elements
      case 'large-phone':
        return 1.0; // Slightly larger for big phones
      case 'standard-phone':
        return 1.0; // Baseline
      case 'medium-phone':
        return 0.9; // Slightly smaller
      case 'small-phone':
        return 0.85; // Smaller for compact phones
      case 'tiny-phone':
        return 0.75; // Much smaller for very small devices
      default:
        return 1.0;
    }
  };

  let scaleFactor = getScaleFactor();

  if (pixelRatio >= 3.5) {
    scaleFactor *= 1.02; // Slightly larger for very high DPI screens
  } else if (pixelRatio <= 2) {
    scaleFactor *= 0.98; // Slightly smaller for low DPI screens
  }

  const scaledSize = size * scaleFactor;

  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};


export const fontScale = (size: number): number => {
  const scale = Math.min(SCREEN_WIDTH / BASE_WIDTH, 1.3); // Cap at 1.3x
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

export const spacing = {
  xs: responsiveSize(4),
  sm: responsiveSize(8),
  md: responsiveSize(16),
  lg: responsiveSize(24),
  xl: responsiveSize(32),
  xxl: responsiveSize(48),
};

export const getDeviceType = () => {
  const pixelDensity = PixelRatio.get();
  const deviceWidth = SCREEN_WIDTH * pixelDensity;
  const deviceHeight = SCREEN_HEIGHT * pixelDensity;
  const aspectRatio = deviceHeight / deviceWidth;

  if (Math.min(deviceWidth, deviceHeight) >= 1000) {
    return 'tablet';
  } else if (aspectRatio < 1.6) {
    return 'wide-phone'; // Like iPhone 14 Pro Max landscape-ish ratio
  } else {
    return 'phone';
  }
};

export const getSafeAreaInsets = () => {
  const deviceType = getDeviceType();

  return {
    top: deviceType === 'tablet' ? responsiveSize(20) : responsiveSize(44),
    bottom: deviceType === 'tablet' ? responsiveSize(20) : responsiveSize(34),
    left: responsiveSize(0),
    right: responsiveSize(0),
  };
};

export const commonIconConfig = {
  height: responsiveSize(24),
  width: responsiveSize(24),
};

export const adaptiveIconConfig = () => {
  const deviceType = getDeviceType();
  const baseSize = deviceType === 'tablet' ? 28 : 24;

  return {
    height: responsiveSize(baseSize),
    width: responsiveSize(baseSize),
  };
};

export default {
  widthScale,
  heightScale,
  moderateScale,
  responsiveSize,
  fontScale,
  spacing,
  getDeviceType,
  getSafeAreaInsets,
  commonIconConfig,
  adaptiveIconConfig,
};