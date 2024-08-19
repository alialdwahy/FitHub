import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  // colors
  black: '#000',
  white: '#FFFFFF',
  lightGray: '#7c7c7c', 
  transparent: 'transparent',
  backgroundColor: '#F4F4F4',
  backgroundPrim: "#020A1E",
  colorPrim:"#d1212f",
  colortabbar:'#55d0ff'
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  title: 18,
  subtitle: 16,

  // app dimensions
  width,
  height,
  TabIconSize: 25,
};
export const FONTS = {
  montserratBold: "Montserrat-Bold",
  montserratLight: "Montserrat-Light",
  montserratSemiBold: "Montserrat-SemiBold",
  montserratMedium: "Montserrat-Medium",
  robotoRegular: "Roboto-Regular",
  montserratRegular: "Montserrat-Regular",
  robotoBold: "Roboto-Bold",
};


const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
