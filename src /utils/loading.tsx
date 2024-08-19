import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import Svg, { G, Path, SvgXml } from 'react-native-svg';
import {app_logo} from '../assets/icons/svg/app_logo'; // Adjust the path according to your file structure

const LoadingSpinner: React.FC = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotation();
  }, []);

  const startRotation = () => {
    rotateValue.setValue(0);

    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000, // 1 second
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const rotateData = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.spinner,
          { transform: [{ rotate: rotateData }] },
        ]}
      >
        <SvgXml xml={app_logo} width={100} height={100} viewBox="0 0 100 100"/>
         
      
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: 100,
    height: 100,
  },
});

export default LoadingSpinner;
