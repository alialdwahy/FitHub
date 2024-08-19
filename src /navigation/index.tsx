import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {NavigationContainer} from '@react-navigation/native';
import {AuthNavigation, MainNavigation, BottomNavigation} from './navigators';
import {Text, View} from 'react-native';
import { screenMap } from './screenMap';
import { Authentication } from '../screens';

const AppContainer = () => {
    const isLogin: Boolean = false;
    const RootStack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        {/* {isLogin ? <MainNavigation /> : <AuthNavigation />} */}
        <RootStack.Navigator
         // initialRouteName={screenMap.SplashScreen}
          screenOptions={{
            headerShown: false,
          }}>
          <RootStack.Screen name={screenMap.SplashScreen} component={AuthNavigation}/>
          <RootStack.Screen name={screenMap.ApprovalCenter} component={MainNavigation} />
          <RootStack.Screen name={screenMap.Home} component={BottomNavigation} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
};

export default AppContainer;
