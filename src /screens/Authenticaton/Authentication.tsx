// Authentication.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  ActivityIndicator, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, FONTS, SIZES } from '../../constant';
import InputField from '../../components/LoginComponent/InputField';
import LoginButton from '../../components/LoginComponent/LoginButton';
import Title from '../../components/LoginComponent/Title';
import ServiceMaster from '../../api/networkApi/ServiceMaster';
import {app_logo} from '../../assets/icons/svg/app_logo';
import LottieView from 'lottie-react-native';
import { Images } from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';



interface Props {
}

const Authentication = ({ navigation}: any ) => {



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);



  const handleCreateAccountPress = () => {
    // Handle the action when the button is presse
     navigation.navigate('SignUp');
    console.log('Create Account button pressed');
    // You can navigate to the sign-up screen here
  };


  const handlingLogin = async () => {
    setLoading(true); 
          // navigation.navigate('Home');
          let dataSend = {
            "email": email,
            "password": password
          }
          console.log('data test-', dataSend)
          try {
            const response =  await ServiceMaster.getLogIn(dataSend)
            const data = response?.[1]; // Adjust if response structure is different
           const token = data?.data?.token;
           await AsyncStorage.setItem('token',token)
            console.log('logo test login ------> ', response)
            
            setLoading(false);
          Alert.alert('Login Successful', 'You have successfully logged in!', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home'),
            },
          ]);
          }catch(error) {
            setLoading(false);
            
          
          }
  };
  

  return (
    <View style={styles.maincontainer}>
   
      <View style={styles.container}>
      <SvgXml xml={app_logo} width="100" height="100" style={styles.logo} />
        <View style={styles.titleContainer}>
          <Title />
        </View>
        <InputField placeholder="Email" value={email} onChangeText={setEmail} keyboardType='email-address' />
        <InputField placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        {!loading &&<LoginButton onPress={handlingLogin} />}
        <TouchableOpacity onPress={handleCreateAccountPress}>
        <Text style={styles.text}>
          I don't have an account, <Text style={styles.createAccountText}>create account</Text>
        </Text>
      </TouchableOpacity>
        <Text style={styles.version}>Version: 1.0.0</Text>
        
      </View>
      {loading && (
        <View style={styles.overlay}>
          <LottieView source={Images.loading}
    style={styles.lottie} />
          </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(10),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  maincontainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundPrim,
  },
  version: {
    fontSize: 14,
    color: '#aaa',
    position: 'absolute',
    bottom: hp('4%'),
  },
  logo: {
    width: wp('20%'),
    height: wp('20%'),
    bottom: hp('10%'),
  },
  titleContainer: {
    width: wp('95%'),
    alignItems: 'flex-start', 
    marginBottom: hp('3%'), 
    left:moderateScale(12)
  },
  text: {
    fontSize: 16,
    color: COLORS.white,
  },
  createAccountText: {
    color: COLORS.colorPrim, // Customize the color for "create account"
    fontWeight: 'bold',
  },
  lottie: {
    width: 300,
    height: 300,
  },
});

export default Authentication;
