import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, FONTS, SIZES } from '../../constant/theme';

const LoginButton = ({ onPress }: any) => {
  


  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Log in</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '75%',
    height: verticalScale(40),
    backgroundColor:COLORS.colorPrim,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:25,
    position: 'absolute',
    bottom: hp('12%'),
    // left:moderateScale(27),
    
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.font,
    fontFamily:  FONTS.montserratBold,
  },
});

export default LoginButton;
