import { Platform } from "react-native";
import { responsiveSize } from "../utils/responsive";

const theme = {
  color: {
    primary: {
      100: "#FFD6D9",  
      200: "#FFA3A9", 
      300: "#FF7079",   
      400: "#E64552",  
      450: "#CC2A39BB", 
      500: "#BE1E2D",  
      600: "#9B1926", 
      700: "#7A141F", 
      alpha: {
        10: "rgba(190, 30, 45, 0.1)", 
        20: "rgba(190, 30, 45, 0.2)",
        40: "rgba(190, 30, 45, 0.4)",
        60: "rgba(190, 30, 45, 0.6)",
        80: "rgba(190, 30, 45, 0.8)",
      },
    },

    secondary: {
      100: "#74aafc",
      200: "#2e7ffa",
      300: "#055adb",
      400: "#043e96",
      500: "#022150",
      alpha: {
        10: "#022150",
      },
    },
    neutral: {
      100: "#ffffff",
      200: "#e3e3e3",
      300: "#c6c6c6",
      400: "#aaaaaa",
      500: "#8e8e8e",
      600: "#717171",
      700: "#555555",
      800: "#393939",
      900: "#1c1c1c",
      1000: "#000000",
      alpha: {
        10: "#000000",
        90: "#ffffff",
      },
    },
    tertiary: {
      100: "#f1f5f9",
      200: "#d8dadc",
      300: "#85a8cb",
      400: "#4e81b3",
      500: "#365a7e",
      600: "#79869f",
      700: "#576379",
    },
    accent: {
      100: "#cbf0ff",
      200: "#83dbff",
      300: "#3bc6ff",
      400: "#00acf2",
      500: "#0079aa",
      alpha: {
        10: "#cbf0ff",
        20: "#cbf0ff",
      },
    },
    red: {
      100: "#ff5a5a",
      200: "#ef0000",
      alpha: {
        10: "#ff5a5a",
      },
    },
    yellow: {
      50:"#FFF9C4",
      100: "#ffdb43",
      200: "#dfb400",
      alpha: {
        10: "#ffdb43",
      },
    },
    green: {
      100: "#88de7c",
      200: "#42bf30",
      alpha: {
        10: "#88de7c",
      },
    },
  },
  spacing: {
    xs: responsiveSize(4),
    sm: responsiveSize(8),
    md: responsiveSize(16),
    lg: responsiveSize(24),
    xl: responsiveSize(32),
    xxl: responsiveSize(48),
  },
  typography: {
    regular: "regular",
    medium: "medium",
    bold: "bold",
    semibold: "semibold",
    fontFamily: {
      regular: Platform.OS === "ios" ? "System" : "Roboto",
      medium: Platform.OS === "ios" ? "System" : "Roboto",
      light: Platform.OS === "ios" ? "System" : "Roboto",
      thin: Platform.OS === "ios" ? "System" : "Roboto",
    },
    fontSize: {
      xs: responsiveSize(12),
      sm: responsiveSize(14),
      md: responsiveSize(16),
      lg: responsiveSize(18),
      xl: responsiveSize(20),
      xxl: responsiveSize(24),
      xxxl: responsiveSize(30),
    },
    fontWeight: {
      thin: "300" as const,
      regular: "400" as const,
      medium: "500" as const,
      semiBold: "600" as const,
      bold: "700" as const,
      extraBold: "800" as const,
    },
  },
  borderRadius: {
    sm: responsiveSize(4),
    md: responsiveSize(8),
    lg: responsiveSize(12),
    xl: responsiveSize(16),
  },
  shadow: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
} as const;

export type Theme = typeof theme;

export default theme;

theme.color;
