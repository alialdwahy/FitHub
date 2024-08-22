import { View, Text, Pressable, StyleSheet, Image,PressableProps, StyleProp, ViewStyle } from 'react-native'
import React, { useEffect } from 'react'
import  icons, { IconKeys }  from '../assets/icons/Icons';
import { SvgXml } from 'react-native-svg';

import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { COLORS } from '../constant/theme';

interface TabBarButtonProps extends PressableProps{
    isFocused: boolean;
   
    routeName: IconKeys; // Use IconKeys type here
    color: string;
    style?: StyleProp<ViewStyle>; 
  }

const TabBarButton = (props:TabBarButtonProps) => {
    const {isFocused,  routeName, color, ...rest} = props;

    const scale = useSharedValue(0);

    useEffect(()=>{
        scale.value = withSpring(
            typeof isFocused === 'boolean'? (isFocused? 0: 0): isFocused,
            {duration: 350}
        );
    },[scale, isFocused]);

    const animatedIconStyle = useAnimatedStyle(()=>{

        const scaleValue = interpolate(
            scale.value,
            [0, 1],
            [1, 1.4]
        );
        const top = interpolate(
            scale.value,
            [0, 1],
            [0, 8]
        );

        return {
            // styles
            transform: [{scale: scaleValue}],
            top
        }
    })
 

    const animatedBackgroundStyle = useAnimatedStyle(() => {
        const backgroundColor = isFocused ? COLORS.colorPrim : 'transparent';
        const borderRadius = isFocused ? 40 : 0;
    
        return {
          backgroundColor,
          borderRadius,
          padding: isFocused ? 1 : 0,
        };
      });
    
    


  
    const focusedIconXml = icons[`${routeName}` as IconKeys]; // Ensure TypeScript understands this is a valid key

    
 
  return (
    <Pressable {...rest} style={[styles.container, props.style]}>
        <Animated.View style={[animatedBackgroundStyle, styles.focusedContainer]}>
        <Animated.View style={[animatedIconStyle]}>
            <SvgXml xml={focusedIconXml} width="70" height="45" />
        </Animated.View>
        </Animated.View>
    </Pressable>
  )
  
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
    },
    focusedContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      }
})

export default TabBarButton