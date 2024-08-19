import React, {useEffect} from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {COLORS, SIZES, theme} from '../../constant'; 
import { Images } from '../../assets';
import LottieView from "lottie-react-native";
import { checkLaunchAndToken } from '../../utils/tokenStore';


const SplashScreen = ({ navigation }: any) => {
  
  useEffect(() => {
    const checkAndNavigate = async () => {
      const destination = await checkLaunchAndToken();
      navigation.navigate(destination); // Navigate based on the result
    };

    // Add a delay for splash screen or loading effect
    const timer = setTimeout(checkAndNavigate, 3000);
    
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigation]);
    return (
      <View style={styles.container}>
      <LottieView
  source={Images.splashscreen}
  style={styles.splashstyle}
  autoPlay
   resizeMode="cover"
/>
    </View>
   
    );
}
const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: COLORS.backgroundPrim, 
  },
  splashstyle:{
    width: SIZES.width,
    height: SIZES.height,

  }
});

export default SplashScreen;