import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../constant";

const stylesCSS = EStyleSheet.build({
    $backgroundColor: COLORS.backgroundColor,
    $white: COLORS.white,
    $lightgray: '#7C7C7C',
    $black: '#000000'
});

export default stylesCSS;