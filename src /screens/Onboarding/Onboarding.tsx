import { View, Text, StyleSheet, Image,ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../../constant';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Swiper from 'react-native-swiper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import onBoardingList from '../../store/LocalOnboardingData';
 

export default function OnboardingScreen({navigation} : any) {
    
  const handleNext = () => {
    
      navigation.navigate('Authentication');
    
  };
  
    return (
      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
      {onBoardingList.map((item, index) => (
        <View key={index} style={{ width: SIZES.width, height: SIZES.height }}>
          <ImageBackground source={item.image} style={{ width: SIZES.width, height: SIZES.height }} resizeMode="cover" >
            <View style={styles.textContainer}>
              <Text style={styles.description}>{item.description}</Text>
              {index === onBoardingList.length - 1 && (
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                  <Text style={styles.textButton}>Next</Text>
                </TouchableOpacity>
              )}
            </View>
          </ImageBackground>
        </View>
      ))}
    </Swiper>
    );
  };




 


const styles = StyleSheet.create({
  wrapper: {},
  textContainer: {
    flex: 1,
    paddingHorizontal: wp('2%'),
    position: 'absolute',
    bottom: hp('7%'),
  },
  title: {
    fontSize: wp('8%'),
    fontWeight: '600',
    fontFamily: FONTS.montserratBold,
    color: COLORS.white,
    textAlign: 'left',
    marginBottom: hp('1%'),
  },
  description: {
    fontSize: wp('4%'),
    fontWeight: '200',
    fontFamily: FONTS.montserratMedium,
    color: COLORS.white,
    textAlign: 'left',
    marginBottom: hp('1%'),
  },
  backButton: {
    position: 'absolute',
    top: verticalScale(65),
    left: moderateScale(25),
    zIndex: 999,
  },
  textButton: {
    fontFamily: FONTS.montserratBold,
    color: COLORS.white,
    textAlign: 'right',
    fontWeight: '200',
    fontSize: moderateScale(15),
  },
  button: {
    alignItems: 'flex-end',
    left: moderateScale(190),
    top: verticalScale(25),
   
  },
});