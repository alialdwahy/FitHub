import React from 'react'; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


import { screenMap } from './screenMap';
import {
  Authentication,
  Home,
  SplashScreen,
  Onboarding,
  ApprovalCenter,
  ClasseDetails,
  PaymentScreen
} from '../screens'; 
import { Image, StyleSheet, View } from 'react-native';
import SignUp from '../screens/Authenticaton/SignUp';
import TabBarButton from '../components/TabBarButton';
import { COLORS } from '../constant/theme';
import Profile from '../screens/Profile/Profile';
import Address from '../screens/Address/Address';
import Classes from '../screens/ClassesFit/Classes';
import Subscription from '../screens/Subscription/Subscription';
import ClassDetails from '../screens/ClassesFit/ClasseDetails';
import { RootStackParamList } from '../types/genericTypes';

// import ClassDetails from '../screens/ClassesFit/ClasseDitels';


const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator(); 


const AuthNavigation = () => {
    return (
      <AuthStack.Navigator
        initialRouteName={screenMap.SplashScreen}
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name="SpalashScreen" component={SplashScreen} />
        <AuthStack.Screen name="Onboarding" component={Onboarding} />
        <AuthStack.Screen name="Authentication" component={Authentication} />
        <AuthStack.Screen
          name={screenMap.SignUP}
          component={SignUp}
        />
      </AuthStack.Navigator>
    );
}

const MainNavigation = () => {
   
    return (
      <MainStack.Navigator >
        <MainStack.Screen name={screenMap.Home} component={Home} />
        <MainStack.Screen name={screenMap.Profile} component={Profile} />
        <MainStack.Screen name={screenMap.Address} component={Address} />
        <MainStack.Screen name={screenMap.Classes} component={Classes}  />
        <MainStack.Screen name={screenMap.Subscription} component={Subscription} />
        <MainStack.Screen name="ClassDetails" component={ClassDetails} />
        <MainStack.Screen name={screenMap.PaymentScreen} component={PaymentScreen} />
       
      </MainStack.Navigator>
    );
}

const TabBar = ({ state, descriptors, navigation } : any) => {



  return (
    <View style={styles.tabbar}>
      {state.routes.map((route :any, index :any ) => {
        const { options } = descriptors[route.key]; // Add a fallback
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
  
        if(['_sitemap', '+not-found'].includes(route.name)) return null;
  
        const isFocused = state.index === index;
  
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
  
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };
  
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
  
        return (
          <TabBarButton 
            key={route.name}
            style={styles.tabbarItem}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused? COLORS.white: COLORS.white}
          
          />
        )
        
        })}
      </View>
    );
  };
  
  
  const BottomNavigation = () => {
     
    return (
      <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}>
          <Tab.Screen
          name="ic_home"
          component={Home}
          options={{
            tabBarShowLabel: false,
            headerShown: false
          }}
        />

        <Tab.Screen
          name="ic_classs"
          component={Classes}
          options={{
            tabBarShowLabel: false,
            headerShown: false
          }}
        />
          
          <Tab.Screen
          name="ic_address"
          component={Address}
          options={{
            tabBarShowLabel: false,
            headerShown: false
          }}
        />


        <Tab.Screen
          name="ic_subscrip"
          component={Subscription}
          options={{
            tabBarShowLabel: false,
            headerShown: false
          }}
        />
        
       
        <Tab.Screen
          name="ic_account"
          component={Profile}
          options={{
            tabBarShowLabel: false,
            headerShown: false
          }}
        />


      </Tab.Navigator>
    );
  }
  
  const styles = StyleSheet.create({
    tabbar: {
      position: 'absolute', 
      bottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      marginHorizontal: 15,
      paddingVertical: 7,
      borderRadius: 50,
      borderCurve: 'continuous',
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 8},
      shadowRadius: 10,
      shadowOpacity: 0.1
  },
  tabbarItem: {
    flex:1,
    justifyContent: "center",
    alignItems: "center"
  }
  });
  
  export {AuthNavigation, MainNavigation, BottomNavigation};